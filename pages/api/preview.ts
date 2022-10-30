import { NextApiRequest, NextApiResponse } from "next";
import { getPreviewPost } from "../../service/getPost";
import { WORDPRESS_PREVIEW_SECRET } from "../../utils/environment";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { secret, slug } = req.query;

  // Check the secret and next parameters
  // This secret should only be known by this API route
  if (
    !WORDPRESS_PREVIEW_SECRET ||
    secret !== WORDPRESS_PREVIEW_SECRET ||
    !slug
  ) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // Fetch WordPress to check if the provided `id` or `slug` exists
  const post = await getPreviewPost(slug as string, "SLUG");

  // If the post doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).json({ message: "Post not found" });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData(
    {
      post: {
        slug: post.slug,
        status: post.status,
      },
    },
    { maxAge: 60 * 60 } // The preview mode cookies expire in 1 hour
  );

  // Redirect to the path from the fetched post
  // We don't redirect to `req.query.slug` as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: `/posts/${post.slug}` });
  res.end();
};
