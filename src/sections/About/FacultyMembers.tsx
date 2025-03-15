"use client";

import { FacultyMember } from "@app/types";
import { H2 } from "@app/components";
import { FacultyMemberCard } from "./FacultyMemberCard";

interface FacultyMembersProps {
  facultyMembers: FacultyMember[];
}

const facultyOrder = [
  "Dr. Roger Sørheim",
  "Dr. Øystein Widding",
  "Dr. Lise Aaboen",
  "Dr. Torgeir Aadland",
  "Dr. Dag Håkon Haneberg",
  "Ingrid (Oline) Berg Sivertsen",
  "Besart 'Bess' Olluri",
];

export const FacultyMembers = ({ facultyMembers }: FacultyMembersProps) => {
  // Sort faculty members according to the predefined order
  const sortedFacultyMembers = [...facultyMembers].sort((a, b) => {
    const indexA = facultyOrder.indexOf(a.name);
    const indexB = facultyOrder.indexOf(b.name);

    // If both names are in the order array, use their indices
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }

    // If one name is not in the order array, put it last
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    // If neither name is in the order array, sort alphabetically
    return a.name.localeCompare(b.name);
  });

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 bg-gray-50">
      <H2 className="mb-24 text-center">Fagstaben</H2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
        {sortedFacultyMembers.map((member, index) => (
          <FacultyMemberCard key={index} member={member} />
        ))}
      </div>
    </section>
  );
};
