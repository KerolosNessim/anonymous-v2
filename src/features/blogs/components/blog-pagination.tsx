import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogPaginationProps {
  page: number;
  totalPages: number;
  basePath?: string;
}

const hrefFor = (basePath: string, page: number) =>
  (page === 1 ? basePath : `${basePath}?page=${page}`) + "#more-blogs";

const itemClass =
  "flex size-10 items-center justify-center rounded-full border border-custom-primary/60 text-sm font-bold transition-colors duration-300 md:size-11";

export default function BlogPagination({ page, totalPages, basePath = "/blogs" }: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Blog pages" className="flex items-center justify-center gap-2">
      {page > 1 ? (
        <Link
          href={hrefFor(basePath, page - 1)}
          aria-label="Previous page"
          className={cn(itemClass, "text-custom-primary hover:bg-custom-primary/10")}
        >
          <ChevronLeft className="size-5" />
        </Link>
      ) : (
        <span aria-hidden className={cn(itemClass, "pointer-events-none text-gray-600 border-gray-700")}>
          <ChevronLeft className="size-5" />
        </span>
      )}

      {pages.map((p) => (
        <Link
          key={p}
          href={hrefFor(basePath, p)}
          aria-label={`Page ${p}`}
          aria-current={p === page ? "page" : undefined}
          className={cn(
            itemClass,
            p === page
              ? "custom-btn border-transparent text-dark-blue"
              : "text-custom-primary hover:bg-custom-primary/10"
          )}
        >
          {p}
        </Link>
      ))}

      {page < totalPages ? (
        <Link
          href={hrefFor(basePath, page + 1)}
          aria-label="Next page"
          className={cn(itemClass, "text-custom-primary hover:bg-custom-primary/10")}
        >
          <ChevronRight className="size-5" />
        </Link>
      ) : (
        <span aria-hidden className={cn(itemClass, "pointer-events-none text-gray-600 border-gray-700")}>
          <ChevronRight className="size-5" />
        </span>
      )}
    </nav>
  );
}
