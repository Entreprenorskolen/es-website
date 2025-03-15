import { getAboutData, getFacultyMembers } from "./get_data";
import { AboutWrapper } from "./AboutWrapper";

export default async function About() {
  const about = await getAboutData();
  const facultyMembers = await getFacultyMembers();

  if (!about) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1>No about data available</h1>
      </main>
    );
  }

  if (!facultyMembers) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1>No faculty members available</h1>
      </main>
    );
  }

  return <AboutWrapper about={about} facultyMembers={facultyMembers} />;
}
