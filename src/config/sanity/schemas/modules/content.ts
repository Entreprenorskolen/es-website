const contentSection = {
  type: "object",
  name: "contentSection",
  title: "Application Content Section",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "introText",
      title: "Introduction Text",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "informationBoxes",
      title: "Information Boxes",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "text",
              title: "Text",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      name: "sectionType",
      title: "Section Type",
      type: "string",
      initialValue: "contentSection",
      hidden: true,
    },
  ],
};

export default contentSection;
