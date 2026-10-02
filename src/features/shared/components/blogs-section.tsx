import SectionHeader from '@/features/shared/components/section-header'
import Link from 'next/link';
import * as motion from "motion/react-client";
import BlogCard from './blog-card';
import { blogPosts } from "@/features/shared/constants/blogs";


export default function Blogs({ showViewAll = true }: { showViewAll?: boolean }) {
  const featuredBlog = blogPosts[0];
  const compactBlogs = blogPosts.slice(1);

  return (
    <section className="container py-12 md:py-20 space-y-12">
      <div className="flex flex-col gap-8 lg:items-center justify-between lg:flex-row lg:gap-12 w-full lg:flex-1 ">
        <SectionHeader
          label="LATEST NEWS"
          title="Our News From Anonymous"
          description="Detect, analyze, and neutralize cyber threats instantly—protecting your data with smart, reliable, real-time defense"
          align="start"
        />

        {showViewAll && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Link
              href="/blogs"
              className="block w-fit custom-btn text-dark-blue py-3 px-8 text-base font-bold rounded-full border-none text-nowrap"
            >
              View All Blogs
            </Link>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
        <BlogCard blog={featuredBlog} variant="featured" />

        <div className="flex flex-col gap-4">
          {compactBlogs.map((blog, index) => (
            <BlogCard key={`${blog.title}-${index}`} blog={blog} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}
