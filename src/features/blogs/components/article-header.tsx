import Image from "next/image";
import * as motion from "motion/react-client";
import type { BlogArticle } from "../types";

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

export default function ArticleHeader({ article }: { article: BlogArticle }) {
  return (
    <header className="container space-y-8 pt-6 lg:pt-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl space-y-5"
      >
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-bold text-custom-primary">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden className="text-gray-600">/</span>
          <span>{article.readTimeMinutes} min read</span>
        </p>
        <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">{article.title}</h1>
        <p className="text-base leading-relaxed text-gray-300 md:text-lg md:leading-loose">
          {article.description}
        </p>
        <p className="text-sm text-gray-400">
          By <span className="font-semibold text-gray-200">{article.author}</span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="relative overflow-hidden rounded-2xl border border-custom-primary/85"
      >
        <Image
          src={article.image}
          alt=""
          width={1400}
          height={700}
          priority
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-120"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#041325]/70 via-transparent to-transparent" />
      </motion.div>
    </header>
  );
}
