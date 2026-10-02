import CitationText from "./citation-text";
import ReferencesPanel from "./references-panel";
import type { BlogArticle } from "../types";

const sectionId = (index: number) => `section-${index + 1}`;

export default function ArticleBody({ article }: { article: BlogArticle }) {
  const { intro, sections, references } = article;

  return (
    <div className="container grid gap-10 py-12 md:py-16 lg:grid-cols-[1fr_16rem] lg:gap-16">
      <article className="min-w-0 max-w-3xl space-y-10">
        <div className="space-y-5">
          {intro.map((paragraph, index) => (
            <p key={index} className="text-lg leading-8 text-gray-100 md:text-xl md:leading-9">
              <CitationText text={paragraph} referenceCount={references.length} />
            </p>
          ))}
        </div>

        {sections.map((section, index) => (
          <section key={section.heading} id={sectionId(index)} className="scroll-mt-28 space-y-4">
            <h2 className="text-2xl font-bold text-white md:text-3xl">{section.heading}</h2>
            {section.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-base leading-8 text-gray-300 md:text-lg md:leading-9">
                <CitationText text={paragraph} referenceCount={references.length} />
              </p>
            ))}
          </section>
        ))}

        <ReferencesPanel references={references} />
      </article>

      <aside className="hidden lg:block">
        <nav aria-label="On this page" className="sticky top-32 space-y-3">
          <p className="text-sm font-bold text-custom-primary">On this page</p>
          <ul className="space-y-1 border-l border-custom-primary/30">
            {sections.map((section, index) => (
              <li key={section.heading}>
                <a
                  href={`#${sectionId(index)}`}
                  className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-gray-300 transition-colors hover:border-custom-primary hover:text-custom-primary"
                >
                  {section.heading}
                </a>
              </li>
            ))}
            {references.length > 0 && (
              <li>
                <a
                  href="#references"
                  className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-gray-300 transition-colors hover:border-custom-primary hover:text-custom-primary"
                >
                  References
                </a>
              </li>
            )}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
