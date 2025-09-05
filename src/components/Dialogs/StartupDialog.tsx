import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";
import Image from "next/image";
import { getImageUrl } from "@app/lib/image-utils";
import { Button, H6, BlockRenderer } from "@app/components";
import { Startup } from "@app/types";
import { Avatar, AvatarImage } from "@app/components/Avatar";
import { IconBrandLinkedin, IconMail, IconWorldWww } from "@tabler/icons-react";
import Link from "next/link";

interface StartupDialogProps {
  startup: Startup;
}

const StartupCard = (startup: Startup) => {
  return (
    <>
      <Image
        src={getImageUrl(startup.logo)}
        alt={startup.name}
        width={250}
        height={250}
        className={`min-h-[150px] md:min-h-[250px]`}
      />
      <H6 className="mt-1 font-medium group-hover:bg-accent group-hover:text-background w-full text-center duration-300 group-hover:mt-0 transition-all">
        {startup.name}
      </H6>
    </>
  );
};

const StartupDialog = ({ startup }: StartupDialogProps) => {
  const noDescription =
    startup.description === null || startup.description === undefined;

  if (noDescription) {
    return (
      <div className="flex flex-col items-center group">
        <StartupCard {...startup} />
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger className="flex flex-col items-center group">
        <>
          <StartupCard {...startup} />
        </>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-row justify-start items-center">
          <Avatar className={"w-[50px] h-[50px]"}>
            <AvatarImage src={getImageUrl(startup.logo)} alt={startup.name} />
          </Avatar>
          <DialogTitle className="text-black ml-4">{startup.name}</DialogTitle>
        </DialogHeader>
        <div className="text-black ml-2 flex flex-col justify-center">
          <BlockRenderer blocks={startup.description ?? []} />
          <div className="flex flex-row justify-center items-center mt-2">
            {startup.url && (
              <Button
                variant="transparent"
                size="icon"
                className="mx-2"
                asChild
              >
                <Link href={startup.url}>
                  <IconWorldWww stroke={1.5} size={50} />
                </Link>
              </Button>
            )}
            {startup.linkedin && (
              <Button
                variant="transparent"
                size="icon"
                className="mx-2"
                asChild
              >
                <Link href={startup.linkedin}>
                  <IconBrandLinkedin stroke={1.5} size={50} />
                </Link>
              </Button>
            )}
            {startup.mail && (
              <Button
                variant="transparent"
                size="icon"
                className="mx-2"
                asChild
              >
                <Link href={`mailto:${startup.mail}`}>
                  <IconMail stroke={1.5} size={50} />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { StartupDialog };
