import startup from "./startup";
import student from "./student";
import pages from "./pages";
import modules from "./modules";
import contact from "./contact";
import facultyMembers from "./facultyMembers";
import apply from "./pages/apply";

export const schemas = [
  startup,
  student,
  contact,
  facultyMembers,
  ...pages,
  ...modules,
  apply,
];
