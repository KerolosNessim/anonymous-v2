import { cn } from "@/lib/utils";

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export default function AuthCard({ title, description, children, className }: AuthCardProps) {
  return (
    <section className="container pt-32 pb-12 md:pb-20 lg:pt-40">
      <div
        className={cn(
          "relative mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-custom-primary/80 bg-[#061a32]/70 p-6 shadow-lg shadow-custom-primary/10 sm:p-8",
          className
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,224,0.12),transparent_55%)]" />
        <div className="relative space-y-6">
          <header className="space-y-3 text-center">
            <h1 className="text-3xl font-bold text-custom-primary md:text-4xl">{title}</h1>
            <p className="text-sm leading-relaxed text-gray-400 sm:text-base">{description}</p>
          </header>
          {children}
        </div>
      </div>
    </section>
  );
}
