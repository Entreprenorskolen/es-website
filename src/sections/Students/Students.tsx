"use client";

import { useStudents } from "@app/hooks";
import { Tabs, TabsList, TabsTrigger } from "@app/components";
import { CURRENT_YEARS } from "@app/constants";
import { PRIMARY_ORANGE } from "@app/constants";
import { StudentDialog } from "@app/components/Dialogs/StudentDialog";
import { useState } from "react";

export function StudentSection({ studentTitle }: { studentTitle: string }) {
  const [currentYear, setCurrentYear] = useState("2027");
  const { students, isLoading } = useStudents("current", currentYear);

  return (
    <div className="mb-24">
      <section className="flex my-8 justify-center mt-16">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center w-11/12">
          <h2
            className="text-4xl font-bold mb-8"
            style={{
              color: PRIMARY_ORANGE,
            }}
          >
            {studentTitle}
          </h2>
          <div className="mt-2 md:mt-0">
            <div className="mt-2">
              <Tabs
                value={currentYear}
                onValueChange={setCurrentYear}
                className="mt-2 md:mt-0"
              >
                <TabsList>
                  {CURRENT_YEARS.map((year) => (
                    <TabsTrigger key={year} value={year}>
                      {year}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
      <section className="flex my-2 md:my-8 justify-center">
        <div className="w-11/12 grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-3 md:gap-6">
          {isLoading ? (
            <div className="col-span-2 md:col-span-full flex justify-center items-center h-40">
              <div className="text-gray-500">Loading students...</div>
            </div>
          ) : (
            students.map((student) => (
              <div key={student.name} className="flex justify-center">
                <StudentDialog
                  student={student}
                  className="w-full max-w-[150px] md:max-w-none"
                />
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
