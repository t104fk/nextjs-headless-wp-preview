import request, { gql } from "graphql-request";
import { Post } from "../@types/wordpress";
import { GRAPHQL_ENDPOINT, WP_AUTH_REFRESH_TOKEN } from "../utils/environment";

const singlePostQuery = (slug: string) => gql`
  query Single {
    post(id: "${slug}", idType: SLUG) {
      id
      title
      slug
      blocks {
        name
        order
      }
      tags {
        nodes {
          slug
        }
      }
    }
  }
`;
export const getPost = async (
  slug: string,
  preview?: boolean
): Promise<Post> => {
  return requestGQL<{ post: Post }>(preview, singlePostQuery(slug)).then(
    (res) => res.post
  );
};

export const getPreviewPost = async (id: string, idType = "SLUG") => {
  const data = await requestGQL<{ post: Post }>(
    true,
    `
            query PreviewPost($id: ID!, $idType: PostIdType!) {
              post(id: $id, idType: $idType) {
                databaseId
                slug
                status
              }
            }
          `,
    { id, idType }
  );
  return data.post;
};

const requestGQL = async <T>(
  preview: boolean,
  query: string,
  variables?: any
) => {
  let res: T;
  // preview modeの場合だけ認証付きリクエスト
  if (preview && WP_AUTH_REFRESH_TOKEN) {
    const r = await fetch(`${GRAPHQL_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${WP_AUTH_REFRESH_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
    res = (await r.json()).data;
  } else {
    res = await request<T>(`${GRAPHQL_ENDPOINT}`, query, variables).catch(
      (err) => {
        console.error(`Failed to request. query: ${query}`, err);
        return null;
      }
    );
  }

  if (!res) {
    throw new Error("Failed to fetch API");
  }
  return res;
};
