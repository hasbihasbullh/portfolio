"use client";

import { useEffect, useState } from "react";
import { BorderBeam } from "@/components/ui/magicui/border-beam";
import { Card } from "@/components/ui/card";
import { TextReveal } from "./TextReveal";
import Experiences from "./Experiences";
import { Skills } from "./Skills";
import GitHubCalendar from "react-github-calendar";
import { Briefcase, CheckCircle, Book } from "lucide-react";
import { projects } from "@/lib/projects";

export default function About() {
  const [repoCount, setRepoCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch("https://api.github.com/users/hasbihasbullh");
        const data = await response.json();
        setRepoCount(data.public_repos);
      } catch (error) {
        console.error("Error fetching GitHub repositories:", error);
      }
    };

    fetchRepos();
  }, []);

  const stats = [
    { value: "2", label: "Years of Experience", icon: Briefcase },
    { value: projects.length, label: "Projects", icon: CheckCircle },
    { value: repoCount !== null ? repoCount : "Loading...", label: "Repositories", icon: Book },
  ];

  return (
    <section id="about" className="px-4 sm:px-8 py-10 sm:py-20 max-w-7xl mx-auto">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 text-zinc-50">About Me</h2>
          <div className="mb-6">
            <TextReveal text="I am M Hasbi Hasbullah, currently living in Sukabumi, Indonesia. With experience across various fields of technology and development, I specialize in creating, developing, and managing interactive and informative websites. My expertise in technologies like React.js, Next.js, and Laravel allows me to deliver innovative and efficient solutions. As a self-taught learner, I am driven by a strong curiosity and a passion for continuous skill development. I am not just a coder but also a creative thinker, a problem solver, and a lifelong learner always eager to explore new technologies." />
          </div>

          <div className="mb-6">
            <Experiences />
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-zinc-900/50 p-6 rounded-lg relative overflow-hidden">
                <BorderBeam />
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-3xl">{stat.value}</p>
                    <p className="text-zinc-400">{stat.label}</p>
                  </div>
                  <stat.icon className="w-10 h-10 text-zinc-300" />
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <Card className="bg-zinc-900/50 p-6 rounded-lg relative overflow-hidden">
              <BorderBeam />
              <GitHubCalendar username="hasbihasbullh" colorScheme="dark" blockSize={12} blockMargin={5} fontSize={14} showWeekdayLabels />
            </Card>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Skills />
      </div>
    </section>
  );
}
