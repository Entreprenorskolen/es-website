import { Image } from "sanity";

interface SanityMeta {
  _type: string;
  _id: string;
  _rev: string;
  _createdAt: Date;
  _updatedAt: Date;
}

export interface MarkDefinition {
  _key: string;
  _type: string; // E.g., "link", "annotation"
  href?: string; // Used for links
  [key: string]: unknown; // Allow additional fields without using `any`
}

export interface Block {
  _key: string;
  _type: "block";
  style: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: {
    text: string;
  }[];
  markDefs: MarkDefinition[]; // ✅ Replace `any[]` with `MarkDefinition[]`
  listItem?: "bullet" | "number";
  level?: number;
}

/** ✅ New Call to Action Type */
interface CallToAction {
  text: string;
  link: string;
}

/** ✅ New Partner Logos Type */
type PartnerLogo = Image;

/** ✅ New Section Type */
interface Section {
  title: string;
  topic: string;
  text: string;
  courses: Course[];
  description: string;
}

/** ✅ New Success Story Type */
interface SuccessStory {
  name: string;
  position: string;
  story: string;
  image: Image;
}

/** ✅ New News & Publications Type */
interface NewsItem {
  title: string;
  date: string;
  description: string;
  link: string;
}

/** ✅ New Statistics Type */
interface Statistic {
  value: string;
  description: string;
}

/** ✅ New Contact Section Type */
interface ContactSection {
  title: string;
  description: string;
  image: Image;
}

interface HomeSection {
  sectionTitle?: string;
  sectionSubtitle?: string;
  items?: {
    _key?: string;
    title?: string;
    description?: string;
  }[];
}

/** ✅ Updated HomePage Type to Match `home.ts` Schema */
export interface HomePage extends SanityMeta {
  title: string;
  description: string;
  image: Image;
  cta: CallToAction;
  partners: PartnerLogo[];
  sections?: HomeSection;
  successStories: SuccessStory[];
  news: NewsItem[];
  statistics: Statistic[];
  contact: ContactSection;
}

export interface AboutPage extends SanityMeta {
  title: string;
  titleText: string;
  image: Image;
  aboutTitle: string;
  aboutText: string;
  isEnglish?: boolean;
}

export interface SortableItem extends SanityMeta {
  sortOrder: number;
}

export interface ContactPerson extends SortableItem {
  position: string;
  email: string;
  image: Image;
  phone: string;
  name: string;
}

interface TimelineItem {
  date: string;
  title: string;
  description: Block[];
}

interface InformationBox {
  title: string;
  text: string;
}

interface Step {
  title: string;
  text: string;
}

interface OutroTextItem {
  title: string;
  text: string;
  url: string;
}

export interface SanityBase {
  _type: string;
  _key: string;
}

interface FAQItem {
  _key: string;
  title: string;
  content: Block[];
}

interface IntroSection {
  title: string;
  content: Block[];
}

export interface ApplyPage extends SanityMeta {
  title: string;
  intro: IntroSection;
  process: {
    title: string;
    timeline: TimelineItem[];
  };
  content: {
    title: string;
    introText: Block[];
    informationBoxes: InformationBox[];
  };
  steps: {
    title: string;
    steps: Step[];
    outroText: OutroTextItem[];
  };
  FAQ: FAQItem[];
}

interface Course {
  courseCode: string;
  title: string;
  credits: string;
  url: string;
}

interface ExternalInfo {
  title: string;
  topic: string;
  text: string;
  url: string;
}

export interface ProgramStructurePage extends SanityMeta {
  title: string;
  introTitle: string;
  intro: string;
  sections: Section[];
  bostonInfo: ExternalInfo;
  cernInfo: ExternalInfo;
  berlinInfo: ExternalInfo;
  readMoreLink: string;
}

export interface AlumniOrganizationPage extends SanityMeta {
  video: string;
  content: Block[];
  image: Image;
}

export interface AlumniPage extends SanityMeta {
  mainTitle: string;
  titleText: string;
  startupTitle: string;
  alumniTitle: string;
  alumniStoryTitle: string;
  alumniStories: Array<{
    name: string;
    roleInStartup: string;
    image: Image;
    text: string;
  }>;
}

export interface FacultyMember extends SanityMeta {
  name: string;
  title: string;
  image: Image;
  bio: Block[];
}

export interface Startup {
  name: string;
  description?: Block[];
  url?: string;
  logo: Image;
  linkedin?: string;
  mail?: string;
  isInHouse: boolean;
}

export interface Student {
  _type: string;
  name: string;
  description: string;
  linkedin: string | null;
  current: boolean;
  image: Image;
  year: number;
}

export interface SolanLinjeforeningPage extends SanityMeta {
  title: string;
  description: string;
  solanUrl: string;
  videoTitle: string;
  video: string;
}
