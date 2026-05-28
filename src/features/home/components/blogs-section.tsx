import SectionHeader from '@/features/shared/components/section-header'
import Link from 'next/link';
import * as motion from "motion/react-client";
import BlogCard, { type BlogCardData } from './blog-card';

const blogPosts: BlogCardData[] = [
  {
    title: "The End of an Era: Why Traditional Antivirus Can't Keep Up",
    description:
      "For decades, cybersecurity relied on signatures to identify threats. That model no longer keeps pace with modern attacks. Today, every threat can look new, making digital fingerprints less effective.",
    image: "/images/blog-1.png",
    href: "/blogs",
  },
  {
    title: "The Next Frontier: Defending Our AI Defenders",
    description:
      "Artificial intelligence is revolutionizing cybersecurity, giving us powerful new tools to detect and respond faster.",
    image: "/images/blog-2.png",
    href: "/blogs",
  },
  {
    title: "The Linguistics of Malice: How AI Learns to Read Malware",
    description:
      "What if software could understand malicious intent the way language models understand text and context?",
    image: "/images/blog-3.png",
    href: "/blogs",
  },
  {
    title: "The Next Frontier: Defending Our AI Defenders",
    description:
      "Artificial intelligence is revolutionizing cybersecurity, giving us powerful new tools to detect and respond faster.",
    image: "/images/blog-4.png",
    href: "/blogs",
  },
];

export default function Blogs() {
  const featuredBlog = blogPosts[0];
  const compactBlogs = blogPosts.slice(1);

  return (
    <section className="container py-20 space-y-12">
      <div className="flex flex-col gap-8 lg:items-center justify-between lg:flex-row lg:gap-12 w-full lg:flex-1 ">
        <SectionHeader
          label="LATEST NEWS"
          title="Our News From Anonymous"
          description="Detect, analyze, and neutralize cyber threats instantly—protecting your data with smart, reliable, real-time defense"
          align="start"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <Link
            href="/about"
            className="w-fit custom-btn text-dark-blue py-3 px-8 text-base font-bold rounded-full border-none"
          >
            View All Blogs
          </Link>
        </motion.div>
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
