import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllBlogSlugs, getArticleBySlug, getRelatedPosts } from "@/features/blogs/services/get-blogs";
import ArticleHeader from "@/features/blogs/components/article-header";
import ArticleBody from "@/features/blogs/components/article-body";
import RelatedPosts from "@/features/blogs/components/related-posts";
import PageHeader from "@/features/shared/components/page-header";

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/blogs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} | Anonymous`,
    description: article.description,
    openGraph: { title: article.title, description: article.description, images: [article.image] },
  };
}

export default async function BlogArticlePage({ params }: PageProps<"/blogs/[slug]">) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const related = await getRelatedPosts(slug);

  return (
    <main className="overflow-hidden">
      <PageHeader breadcrumbs={[{ label: "Blogs", href: "/blogs" }, { label: article.title }]} />
      <ArticleHeader article={article} />
      <ArticleBody article={article} />
      <RelatedPosts posts={related} />
    </main>
  );
}
