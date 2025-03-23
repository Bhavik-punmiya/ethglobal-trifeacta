"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const AnimatedGrid = () => (
  <motion.div
    className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,#FF8144)]"
    animate={{
      backgroundPosition: ["0% 0%", "100% 100%"],
    }}
    transition={{
      duration: 40,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
    }}
  >
    <div className="h-full w-full [background-image:repeating-linear-gradient(100deg,#FF8144_0%,#FF8144_1px,transparent_1px,transparent_4%)] opacity-20 dark:[background-image:repeating-linear-gradient(100deg,#64748B_0%,#64748B_1px,transparent_1px,transparent_4%)]" />
  </motion.div>
);

export function BackgroundCircles({}) {
  return (
    <div
      className={clsx(
        "relative flex h-screen w-full items-center justify-center overflow-hidden",
        "dark:bg-black/5"
      )}
    >
      <AnimatedGrid />

      <div className="flex items-center justify-center z-10">
        <Link href={"/contest"} className="relative flex items-center">
          <span className="text-7xl md:text-8xl font-bold text-black dark:text-white">
            Model Wars
          </span>
          <Image
            src="/06b110f2-2e49-4fb2-acb9-b3b9a362d60f.png"
            alt="Logo"
            className="animate-spin absolute -right-12 mt-4"
            width={42}
            height={42}
          />
        </Link>
      </div>

      {/* Enhanced glow effect with pink colors for light mode */}
      <div className="absolute inset-0 [mask-image:radial-gradient(90%_60%_at_50%_50%,#000_40%,transparent)]">
        {/* Light mode pink glows - much lighter for dark mode */}
        <div className="absolute inset-0 blur-[120px] bg-[radial-gradient(ellipse_at_center,rgba(255,129,239,0.1),rgba(255,192,203,0.07)_50%,transparent_70%)] " />
        <div className="absolute inset-0 blur-[80px] bg-[radial-gradient(ellipse_at_center,rgba(255,182,193,0.08),rgba(221,160,221,0.05)_60%,transparent)] " />
      </div>
    </div>
  );
}

export function CircleHero() {
  return (
    <>
      <BackgroundCircles />
    </>
  );
}
