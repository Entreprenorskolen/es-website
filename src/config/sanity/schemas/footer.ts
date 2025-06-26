const footer = {
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    // Navigation links
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
    // Contact section
    {
      name: "contactTitle",
      title: "Contact Section Title",
      type: "string",
      description: "Title for the contact section",
    },
    {
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
      description: "Contact phone number",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      description: "Contact email address",
    },
    // Address section
    {
      name: "addressTitle",
      title: "Address Section Title",
      type: "string",
      description: "Title for the address section",
    },
    {
      name: "streetAddress",
      title: "Street Address",
      type: "string",
      description: "Street address",
    },
    {
      name: "cityPostalCode",
      title: "City and Postal Code",
      type: "string",
      description: "City and postal code",
    },
  ],
  preview: {
    select: {
      title: "contactTitle",
    },
    prepare(selection: { title: string }) {
      const { title } = selection;
      return {
        title: `Footer - ${title || "Contact"}`,
      };
    },
  },
};

export default footer;
