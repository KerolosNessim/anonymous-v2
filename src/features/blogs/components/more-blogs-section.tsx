import * as motion from "motion/react-client";
import SectionHeader from "@/features/shared/components/section-header";
import BlogCard from "@/features/shared/components/blog-card";
import BlogPagination from "./blog-pagination";
import type { BlogsPage } from "../types";

export default function MoreBlogsSection({ posts, page, totalPages }: BlogsPage) {
  return (
    <section id="more-blogs" className="container scroll-mt-28 space-y-12 py-12 md:py-20">
      <SectionHeader
        label="MORE FROM THE BLOG"
        title="Keep reading"
        description="Guides and deep dives on malware analysis, AI detection and threat intelligence."
        align="start"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((blog, index) => (
          <motion.div
            key={`${page}-${blog.title}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: (index % 3) * 0.1 }}
          >
            <BlogCard blog={blog} variant="grid" />
          </motion.div>
        ))}
      </div>

      <BlogPagination page={page} totalPages={totalPages} />
    </section>
  );
}
