import * as motion from "motion/react-client";
import OrbitBackground from "./orbit-background";

interface StatusHeroProps {
  /** Large animated text, e.g. "404" or "Oops!" */
  display: string;
  title: string;
  description: string;
  /** Buttons or links shown under the description */
  children?: React.ReactNode;
}

export default function StatusHero({ display, title, description, children }: StatusHeroProps) {
  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 pt-28 pb-16">
      <OrbitBackground />

      <div className="relative flex flex-col items-center text-center">
        <h1
          aria-label={display}
          className="flex gap-0.5 text-6xl font-bold italic leading-none text-gray-200 sm:text-9xl md:gap-2 lg:text-[10rem]"
        >
          {Array.from(display).map((char, index) => (
            <motion.span
              key={index}
              aria-hidden
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.2 + index * 0.12, ease: "easeOut" }}
              className="inline-block [text-shadow:4px_4px_0_rgba(0,255,224,0.55),0_0_32px_rgba(0,255,224,0.3)]"
            >
              <motion.span
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
                className="inline-block"
              >
                {char}
              </motion.span>
            </motion.span>
          ))}
        </h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-4 text-2xl font-bold text-gray-200 sm:mt-6 sm:text-3xl md:text-4xl"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-3 max-w-xs text-sm leading-relaxed text-gray-400 sm:mt-4 sm:max-w-md sm:text-base"
        >
          {description}
        </motion.p>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-6 flex flex-wrap items-center sm:mt-8 justify-center gap-4"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
