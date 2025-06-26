import startup from "./startup";
import student from "./student";
import pages from "./pages";
import modules from "./modules";
import contact from "./contact";
import facultyMembers from "./facultyMembers";
import apply from "./pages/apply";
import navbar from "./navbar";
import footer from "./footer";

export const schemas = [
  startup,
  student,
  contact,
  facultyMembers,
  navbar,
  footer,
  ...pages,
  ...modules,
  apply,
];
