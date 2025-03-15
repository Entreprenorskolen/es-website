"use client";

import { useState } from "react";
import { SanityBlock, H4 } from "@app/components";
import Image from "next/image";
import { FacultyMember } from "@app/types";
import { urlForProfileImage } from "@app/config";

export const FacultyMemberCard = ({ member }: { member: FacultyMember }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col items-center text-center max-w-xl mx-auto">
      {member.image && (
        <div className="relative w-48 h-48 mb-6">
          <Image
            src={urlForProfileImage(member.image)}
            alt={member.name}
            fill
            className="object-cover rounded-full grayscale border-2 border-gray-200"
          />
        </div>
      )}
      <div className="w-full p-6 bg-white rounded-lg shadow-md transition-all duration-300">
        <div className="space-y-4">
          <div>
            <H4 className="text-2xl">{member.name}</H4>
            <p className="text-lg text-primary-600 mt-1">{member.title}</p>
          </div>
          <div
            className={`prose prose-sm max-w-prose text-left text-gray-600 transition-all duration-300 overflow-hidden ${
              !isExpanded ? "line-clamp-3" : ""
            }`}
          >
            <SanityBlock blocks={member.bio} />
          </div>
          {member.bio && member.bio.length > 0 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary-600 hover:text-primary-700 font-medium text-sm mt-2 focus:outline-none"
            >
              {isExpanded ? "Vis mindre" : "Les mer"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
