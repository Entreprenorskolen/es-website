"use client";

import { useSelect, useStudents } from "@app/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/components";
import { ALUMNI_YEARS, PRIMARY_ORANGE } from "@app/constants";
import { StudentDialog } from "@app/components/Dialogs/StudentDialog";

export default function AlumniStudents({
  alumniTitle,
}: {
  alumniTitle: string;
}) {
  const { currentValue: currentYear, onChange: onYearChange } =
    useSelect("2024");

  const { students } = useStudents("alumni", currentYear);
  return (
    <>
      <section className="flex my-8 justify-center">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center w-11/12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 mt-8 text-center md:text-left"
            style={{
              color: PRIMARY_ORANGE,
            }}
          >
            {alumniTitle}
          </h2>
          <div className="mt-2 md:mt-0">
            <div className="mt-2">
              <Select value={currentYear} onValueChange={onYearChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose year" />
                </SelectTrigger>
                <SelectContent align="center">
                  {ALUMNI_YEARS.map((year) => (
                    <SelectItem value={year} key={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>
      <section className="flex my-2 md:my-8 justify-center">
        <div className="w-11/12 grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-3 md:gap-6 mb-16">
          {students.map((student) => (
            <div key={student.name} className="flex justify-center">
              <StudentDialog
                student={student}
                key={student.name}
                className="w-full max-w-[150px] md:max-w-none"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
