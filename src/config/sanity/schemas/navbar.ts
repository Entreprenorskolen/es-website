const navbar = {
  name: "navbar",
  title: "Navigation Bar",
  type: "document",
  fields: [
    {
      name: "homeText",
      title: "Home Link Text",
      type: "string",
      description: "Text for the home navigation link",
    },
    {
      name: "studentsText",
      title: "Students Link Text",
      type: "string",
      description: "Text for the students navigation link",
    },
    {
      name: "alumniText",
      title: "Alumni Link Text",
      type: "string",
      description: "Text for the alumni navigation link",
    },
    {
      name: "programText",
      title: "Program Link Text",
      type: "string",
      description: "Text for the program navigation link",
    },
    {
      name: "aboutText",
      title: "About Link Text",
      type: "string",
      description: "Text for the about navigation link",
    },
    {
      name: "applyText",
      title: "Apply Button Text",
      type: "string",
      description: "Text for the apply/søk button",
    },
  ],
  preview: {
    select: {
      title: "homeText",
    },
    prepare(selection: { title: string }) {
      const { title } = selection;
      return {
        title: `Navbar - ${title || "Home"}`,
      };
    },
  },
};

export default navbar;
