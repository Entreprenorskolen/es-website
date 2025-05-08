"use client";

import { useEffect, useState } from "react";
import { getAboutData, getFacultyMembers } from "./get_data";
import { AboutWrapper } from "./AboutWrapper";
import { useLanguage } from "@app/context/LanguageContext";
import { AboutPage, FacultyMember } from "@app/types";

export default function About() {
  const { language: currentLanguage } = useLanguage();
  const [about, setAbout] = useState<AboutPage | null>(null);
  const [facultyMembers, setFacultyMembers] = useState<FacultyMember[] | null>(null);
  const [loadingAbout, setLoadingAbout] = useState(true);
  const [loadingFaculty, setLoadingFaculty] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingAbout(true);
      try {
        const aboutData = await getAboutData(currentLanguage);
        console.log(currentLanguage);
        console.log(aboutData);
        setAbout(aboutData);
      } catch (error) {
        console.error("Error fetching about data:", error);
        setAbout(null);
      } finally {
        setLoadingAbout(false);
      }
    };

    fetchData();
  }, [currentLanguage]);

  useEffect(() => {
    const fetchFaculty = async () => {
      setLoadingFaculty(true);
      try {
        const facultyData = await getFacultyMembers();
        setFacultyMembers(facultyData);
      } catch (error) {
        console.error("Error fetching faculty members:", error);
        setFacultyMembers(null);
      } finally {
        setLoadingFaculty(false);
      }
    };
    fetchFaculty();
  }, []);

  if (loadingAbout || loadingFaculty) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1>Loading...</h1>
      </main>
    );
  }

  if (!about) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1>No about data available. Please try again later.</h1>
      </main>
    );
  }

  return <AboutWrapper about={about} facultyMembers={facultyMembers || []} />;
}
