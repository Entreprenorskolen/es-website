import { Student } from "@app/types";
import Image from "next/image";
import { getImageUrl } from "@app/lib/image-utils";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@app/components";
import Link from "next/link";
import { IconBrandLinkedin } from "@tabler/icons-react";
import { ScrollArea } from "@app/components/Dialogs/ScrollArea";
import { splitTextIntoParagraphs } from "@app/util";
import { cn } from "@app/lib/utils";

interface StudentDialogProps {
  student: Student;
  className?: string;
}

const getFirstName = (name: string) => {
  return name.split(" ")[0];
};

const StartupCard = (student: Student) => {
  return (
    <>
      <Image
        src={getImageUrl(student.image)}
        alt={student.name}
        width={175}
        height={225}
      />
      <p className="font-medium text-center w-full text-black hover:bg-[#FF5C00] hover:text-white transition-all duration-300">
        {getFirstName(student.name)}
      </p>
    </>
  );
};

const StudentDialog = ({ student, className }: StudentDialogProps) => {
  const noDescription =
    student.description === null || student.description === undefined;

  if (noDescription) {
    return (
      <div className={cn("flex flex-col items-center group", className)}>
        <StartupCard {...student} />
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={cn("cursor-pointer hover:opacity-80", className)}>
          <StartupCard {...student} />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-row justify-start items-center">
          <Image
            src={getImageUrl(student.image)}
            alt={student.name}
            width={77}
            height={100}
            className="rounded-md"
          />
          <div className="flex items-center">
            <DialogTitle className="text-black ml-4">
              {student.name}
            </DialogTitle>
            {student.linkedin && (
              <Button
                variant="transparent"
                size="icon"
                className="mx-2 text-black"
                asChild
              >
                <Link href={student.linkedin}>
                  <IconBrandLinkedin stroke={1.5} size={50} />
                </Link>
              </Button>
            )}
          </div>
        </DialogHeader>
        <div className="text-black flex flex-col justify-center">
          <ScrollArea className="max-h-[200px] md:max-h-[600px]">
            {splitTextIntoParagraphs(student.description || "", 500).map(
              (paragraph, index) => (
                <p key={index} className="mb-2">
                  {paragraph}
                </p>
              ),
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { StudentDialog };
