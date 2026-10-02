import { blogPosts } from "@/features/shared/constants/blogs";
import type { BlogCardData } from "@/features/shared/types";
import { archivePosts } from "../constants/archive";
import { articleDetails } from "../constants/articles";
import type { BlogArticle, BlogsPage } from "../types";

export const POSTS_PER_PAGE = 6;

// Mock data access. Swap the body for a fetch when an API exists.
export async function getArchivePage(requestedPage: number): Promise<BlogsPage> {
  const totalPosts = archivePosts.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));
  const page = Math.min(Math.max(1, Math.trunc(requestedPage) || 1), totalPages);
  const start = (page - 1) * POSTS_PER_PAGE;

  return {
    posts: archivePosts.slice(start, start + POSTS_PER_PAGE),
    page,
    totalPages,
    totalPosts,
  };
}

const WORDS_PER_MINUTE = 200;

function toArticle(card: BlogCardData): BlogArticle | undefined {
  const detail = articleDetails.find((d) => d.slug === card.slug);
  if (!detail) return undefined;
  const text = [...detail.intro, ...detail.sections.flatMap((s) => [s.heading, ...s.paragraphs])].join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return { ...card, ...detail, readTimeMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)) };
}

// newest first: the latest posts shown on the home page, then the archive
const allPosts = (): BlogCardData[] => [...blogPosts, ...archivePosts];

export async function getAllBlogSlugs(): Promise<string[]> {
  return allPosts().map((post) => post.slug);
}

export async function getArticleBySlug(slug: string): Promise<BlogArticle | undefined> {
  const card = allPosts().find((post) => post.slug === slug);
  return card ? toArticle(card) : undefined;
}

export async function getRelatedPosts(slug: string, count = 3): Promise<BlogCardData[]> {
  const posts = allPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  // the posts that follow this one, wrapping around, so every article links somewhere different
  const ordered = [...posts.slice(index + 1), ...posts.slice(0, Math.max(index, 0))];
  return ordered.slice(0, count);
}
