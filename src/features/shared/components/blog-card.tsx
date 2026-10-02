import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { BlogCardData } from "@/features/shared/types";

interface BlogCardProps {
  blog: BlogCardData;
  variant?: "featured" | "compact" | "grid";
}

export default function BlogCard({ blog, variant = "compact" }: BlogCardProps) {
  if (variant === "featured") {
    return (
      <article className="group relative overflow-hidden rounded-2xl border border-custom-primary/85">
        <Image
          src={blog.image}
          alt={blog.title}
          width={900}
          height={620}
          className="h-full min-h-120 lg:min-h-112 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#041325]/95 via-[#041325]/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 space-y-4 p-4 sm:p-6 lg:p-8">
          <h3 className="max-w-2xl text-xl sm:text-2xl lg:text-3xl font-bold leading-tight text-white">
            {blog.title}
          </h3>
          <p className="max-w-2xl line-clamp-4 sm:line-clamp-none text-sm sm:text-base lg:text-lg leading-7 lg:leading-8 text-gray-300">{blog.description}</p>
          <Link
            href={blog.href}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-custom-primary px-5 py-2  font-semibold text-custom-primary transition-colors hover:bg-custom-primary hover:text-dark-blue"
          >
            Read More
            <span aria-hidden>{">>"}</span>
          </Link>
        </div>
      </article>
    );
  }

  if (variant === "grid") {
    return (
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-custom-primary/85 bg-[#061a32] transition-shadow duration-300 hover:shadow-lg hover:shadow-custom-primary/20">
        <div className="overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.title}
            width={600}
            height={380}
            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <h3 className="text-lg font-bold leading-snug text-white">{blog.title}</h3>
          <p className="line-clamp-3 text-sm leading-7 text-gray-300">{blog.description}</p>
          <Link
            href={blog.href}
            className="mt-auto inline-flex items-center gap-2 pt-2 font-semibold text-custom-primary transition-opacity hover:opacity-80"
          >
            Read More
            <span aria-hidden>{">>"}</span>
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="group overflow-hidden rounded-2xl border border-custom-primary/85 bg-[#061a32]">
      <div className="grid min-h-40 grid-cols-1 sm:grid-cols-[32%_1fr]">
        <div className="relative h-48 sm:h-full sm:min-h-52">
          <Image
            src={blog.image}
            alt={blog.title}
            width={300}
            height={220}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className={cn("space-y-2 p-4")}>
          <h3 className="text-base sm:text-lg font-bold leading-relaxed sm:leading-loose text-white">{blog.title}</h3>
          <p className="line-clamp-2 text-sm leading-7 text-gray-300">{blog.description}</p>
          <Link
            href={blog.href}
            className="inline-flex items-center gap-2  font-semibold text-custom-primary transition-opacity hover:opacity-80"
          >
            Read More
            <span aria-hidden>{">>"}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
