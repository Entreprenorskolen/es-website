const processSection = {
  type: "object",
  name: "processSection",
  title: "Application Process Section",
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
      name: "timeline",
      title: "Timeline",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "date",
              title: "Date",
              type: "string",
            },
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "description",
              title: "Description",
              type: "array",
              of: [{ type: "block" }],
            },
          ],
        },
      ],
    },
    {
      name: "sectionType",
      title: "Section Type",
      type: "string",
      initialValue: "processSection",
      hidden: true,
    },
  ],
};

export default processSection;
