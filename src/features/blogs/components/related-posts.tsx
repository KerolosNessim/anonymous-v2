import * as motion from "motion/react-client";
import SectionHeader from "@/features/shared/components/section-header";
import BlogCard from "@/features/shared/components/blog-card";
import type { BlogCardData } from "@/features/shared/types";

export default function RelatedPosts({ posts }: { posts: BlogCardData[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="container space-y-12 py-12 md:py-20">
      <SectionHeader
        label="KEEP READING"
        title="More from the blog"
        description="Other guides and deep dives from the Anonymous team."
        align="start"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.1 }}
          >
            <BlogCard blog={post} variant="grid" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
