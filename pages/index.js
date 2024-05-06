import Hero from '@/components/home-page/hero';
import FeaturedPosts from '@/components/home-page/featured-posts';

import { getFeaturedPosts } from '@/lib/posts-util';

export default function HomePage({ posts }) {
  return (
    <>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
    // revalidate: 60, // if our data changes AFTER deployment, refresh stale data for each request in 60 second time period
  };
}
