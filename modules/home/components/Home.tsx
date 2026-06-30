"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { AnimateEaseOut } from "@/common/components/elements/AnimateEaseOut";
import { WelcomeCard } from "./WelcomeCard";
import { AboutMeCard } from "./AboutMeCard";
import { SkillsToolsCard } from "./SkillsToolsCard";
import { AchievementsCard } from "./AchievementsCard";
import { ProjectsShowcaseCard } from "./ProjectsShowcaseCard";
import { FooterContent } from "@/common/components/layouts/FooterContent";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 25,
    },
  },
};

export default function Home() {
  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
        <AnimateEaseOut>
          <div className="mb-8 lg:mb-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-2 md:grid-cols-4"
            >
              <motion.div variants={itemVariants} className="md:col-span-2 flex flex-col">
                <WelcomeCard />
              </motion.div>
              <motion.div variants={itemVariants} className="md:col-span-1 flex flex-col">
                <AboutMeCard />
              </motion.div>
              <motion.div variants={itemVariants} className="md:col-span-1 flex flex-col">
                <SkillsToolsCard />
              </motion.div>
              <motion.div variants={itemVariants} className="md:col-span-1 flex flex-col">
                <AchievementsCard />
              </motion.div>
              <motion.div variants={itemVariants} className="md:col-span-3 flex flex-col">
                <ProjectsShowcaseCard />
              </motion.div>
            </motion.div>
          </div>
          <FooterContent />
        </AnimateEaseOut>
      </div>
    </div>
  );
}
