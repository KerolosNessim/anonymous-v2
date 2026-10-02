import type { Metadata } from "next";
import BlogsSection from "@/features/shared/components/blogs-section";
import PageHeader from "@/features/shared/components/page-header";
import MoreBlogsSection from "@/features/blogs/components/more-blogs-section";
import { getArchivePage } from "@/features/blogs/services/get-blogs";

export const metadata: Metadata = {
  title: "Blogs | Anonymous",
  description:
    "News, guides and deep dives on malware analysis, AI detection and threat intelligence.",
};

export default async function BlogsPage({ searchParams }: PageProps<"/blogs">) {
  const { page } = await searchParams;
  const requested = Number(Array.isArray(page) ? page[0] : page);
  const archive = await getArchivePage(requested);

  return (
    <main className="overflow-hidden">
      <PageHeader
        breadcrumbs={[{ label: "Blogs" }]}
        title="Blogs"
        description="News, guides and deep dives on malware analysis, AI detection and threat intelligence."
      />
      <BlogsSection showViewAll={false} />
      <MoreBlogsSection {...archive} />
    </main>
  );
}
