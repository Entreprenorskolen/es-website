import ProgramPage from "./ProgramPage";
import { getData } from "./get_data";

export default async function Program() {
  const content = await getData();

  if (!content) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1>No program data available</h1>
      </main>
    );
  }

  return (
    <>
      <div className="w-full px-4 sm:px-6 md:px-8 mt-12 md:mt-24">
        <main className="max-w-7xl mx-auto">
          <ProgramPage program={content} />
        </main>
      </div>
    </>
  );
}
