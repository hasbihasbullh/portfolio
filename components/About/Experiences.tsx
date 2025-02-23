import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { BorderBeam } from "@/components/ui/magicui/border-beam";
import { Building2 } from "lucide-react";

const Experiences = () => {
  const [activeTab, setActiveTab] = useState(0);

  const experiences = [
    {
      company: "PT. Solusi Kreatif Univer",
      items: [
        {
          role: "Advertiser",
          period: "March - May 2024",
          description: "Created image and video content for products and managed digital ads.",
          points: ["Created image and video content for products", "Managed ads on Facebook Ads and TikTok Ads", "Established marketplaces on Shopee, TikTok, and Lazada"],
        },
      ],
    },
    {
      company: "Lead English",
      items: [
        {
          role: "IT Staff",
          period: "October - March 2024",
          description: "Managed student data and maintained a WordPress-based website.",
          points: ["Input student data", "Maintained a WordPress-based website"],
        },
      ],
    },
    {
      company: "Disnaker Trans",
      items: [
        {
          role: "International Training",
          period: "September 21, 2023",
          description: "Completed an intensive English training program.",
          points: ["Improved English proficiency", "Participated in a 21-day program from start to finish"],
        },
      ],
    },
    {
      company: "PT. Rice Inti Persero",
      items: [
        {
          role: "Intern - Software Developer",
          period: "March - May 2019",
          description: "Developed a simple CRUD application and performed system maintenance.",
          points: ["Developed a simple CRUD application for student data", "Input data for tools and equipment on the web", "Performed computer maintenance at the office"],
        },
      ],
    },
  ];

  return (
    <Card className="bg-zinc-900/50 rounded-lg relative overflow-hidden">
      <BorderBeam />
      <div className="flex flex-col md:flex-row">
        <div className="md:w-80 md:border-r border-zinc-800 flex md:flex-col overflow-x-auto md:overflow-x-visible">
          {experiences.map((exp, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex items-center gap-3 p-4 text-left transition-colors whitespace-nowrap md:whitespace-normal ${activeTab === index ? "bg-zinc-800/50 text-zinc-50" : "text-zinc-400 hover:bg-zinc-800/30"}`}
            >
              <Building2 className="w-5 h-5" />
              <span>{exp.company}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 p-4 md:p-6">
          {experiences[activeTab].items.map((item, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <h4 className="font-semibold text-xl text-zinc-50">{item.role}</h4>
              <p className="text-zinc-400">{experiences[activeTab].company}</p>
              <p className="text-sm text-zinc-500 mb-4">{item.period}</p>
              <p className="text-zinc-300 mb-3">{item.description}</p>
              <ul className="space-y-2">
                {item.points.map((point, idx) => (
                  <li key={idx} className="text-zinc-400 flex items-start gap-2">
                    <span className="block w-1 h-1 mt-2 bg-zinc-400 rounded-full"></span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default Experiences;
