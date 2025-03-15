const stepsSection = {
  type: "object",
  name: "stepsSection",
  title: "Steps Section",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "steps",
      title: "Steps",
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
      name: "outroText",
      title: "Outro Text",
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
            {
              name: "url",
              title: "URL",
              type: "url",
            },
          ],
        },
      ],
    },
    {
      name: "sectionType",
      title: "Section Type",
      type: "string",
      initialValue: "stepsSection",
      hidden: true,
    },
  ],
};

export default stepsSection;
