import PostContent from '@/components/posts/post-detail/post-content';

import { getPostData, getPostsFiles } from '@/lib/posts-util';

export default function PostDetailPage({ post }) {
  return <PostContent post={post} />;
}

// let nextjs know, which concrete slug values it should pre-generate
export function getStaticPaths() {
  const slugs = getPostsFiles().map((slug) => slug.replace(/\.md$/, ''));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const { slug } = params;

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600, // here, revalidate makes sense, updated markdown will be available in 10 minutes from the update
  };
}
