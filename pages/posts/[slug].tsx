import { GetStaticPaths, GetStaticProps } from "next";
import { Post } from "../../@types/wordpress";
import { getPost } from "../../service/getPost";

type Props = {
  post: Post;
};

type PathParams = {
  slug: string;
};

type GetStaticPropsNotFoundResult = {
  notFound: true;
};
export const NOT_FOUND_ISR_RESPONSE: GetStaticPropsNotFoundResult = {
  notFound: true,
  // https://github.com/vercel/next.js/discussions/35218#discussioncomment-2334980
  // revalidate: DEFAULT_404_REVALIDATE_SECONDS,
};

export const getStaticProps: GetStaticProps<Props, PathParams> = async (
  context
) => {
  const { preview } = context;

  const slug = context.params?.slug as string;

  let post: Post;
  try {
    post = await getPost(slug, preview);
    console.log(post);
  } catch (e) {
    console.log(e);

    return NOT_FOUND_ISR_RESPONSE;
  }

  if (!post) {
    return NOT_FOUND_ISR_RESPONSE;
  }

  return {
    props: { post },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

const Post: React.FC<Props> = ({ post }) => {
  return (
    <div>
      <p>{post.title}</p>
      <p>{post.slug}</p>
    </div>
  );
};

export default Post;
