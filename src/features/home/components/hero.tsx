
import { TextAnimate } from "@/components/ui/text-animate";
import Image from "next/image";
import * as motion from "motion/react-client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function HeroSection() {
  return (
    <section
      className={
        "min-h-dvh  relative overflow-hidden  flex  flex-col items-center justify-center"
      }
    >
      {/* header */}
      <TextAnimate
        delay={1}
        duration={0.5}
        as="h1"
        animation="blurInUp"
        by="word"
        viewport={{ once: true }}
        className=" text-5xl lg:text-7xl   font-bold text-center leading-snug max-w-xl"
      >
        Malwares Hide, We shine
      </TextAnimate>
      {/* description */}
      <motion.p
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}
        className=" max-w-2xl text-center font-normal text-gray-400 mt-4"
      >
        Next-generation threat detection powered by artificial intelligence.
        Anonymous scans, analyzes, and neutralizes sophisticated malware that
        traditional security misses. Upload a file and get your free analysis in
        seconds.
      </motion.p>
      {/* link */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 2,
        }}
        className="flex items-center gap-4 mt-4"
      >
        <Button
          asChild
          className="custom-btn text-dark-blue py-6 px-8 text-base font-bold rounded-full border-none "
        >
          <Link href={"/analysis"}>Get Started</Link>
        </Button>
      </motion.div>
      {/* image */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
        }}
        className="absolute bottom-0 left-0 right-0 z-[-1]"
      >
        <Image
          src={"/images/hero.svg"}
          alt="hero"
          width={100}
          height={100}
          className="w-full h-60 opacity-30 object-cover object-top   "
        />
      </motion.div>
    </section>
  );
}
