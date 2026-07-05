import React from "react";
import { Metadata } from "next";
import Home from "@/modules/home";

import { METADATA } from "@/common/constants/metadata";

export const metadata: Metadata = {
  title: `${METADATA.creator} | Personal Website`,
  description: `Personal portfolio of ${METADATA.creator}, a freelance web developer and designer specializing in user-centered design and modern web development.`,
  alternates: {
    canonical: "/",
  },
};

import { client } from "@/sanity/lib/client";
import { profileQuery, projectsQuery, experiencesQuery, educationQuery, skillsQuery, achievementsQuery } from "@/sanity/lib/queries";

export default async function HomePage() {
  const [profile, projects, experiences, education, skills, achievements] = await Promise.all([
    client.fetch(profileQuery),
    client.fetch(projectsQuery),
    client.fetch(experiencesQuery),
    client.fetch(educationQuery),
    client.fetch(skillsQuery),
    client.fetch(achievementsQuery)
  ]);

  return <Home 
    sanityProfile={profile} 
    sanityProjects={projects?.length > 0 ? projects : undefined}
    sanityExperiences={experiences?.length > 0 ? experiences : undefined}
    sanityEducation={education?.length > 0 ? education : undefined}
    sanitySkills={skills?.length > 0 ? skills : undefined}
    sanityAchievements={achievements?.length > 0 ? achievements : undefined}
  />;
}

