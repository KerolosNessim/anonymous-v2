import type { BlogCardData } from "@/features/shared/types";

export interface BlogsPage {
  posts: BlogCardData[];
  page: number;
  totalPages: number;
  totalPosts: number;
}

export interface BlogReference {
  title: string;
  source: string;
  url: string;
}

export interface BlogSection {
  heading: string;
  paragraphs: string[];
}

/** Paragraphs may contain citation markers like [1] that link to references[0]. */
export interface BlogArticleDetail {
  slug: string;
  author: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  intro: string[];
  sections: BlogSection[];
  references: BlogReference[];
}

export type BlogArticle = BlogCardData & BlogArticleDetail & { readTimeMinutes: number };
