const introSection = {
  type: "object",
  name: "introSection",
  title: "Introduction Section",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "sectionType",
      title: "Section Type",
      type: "string",
      initialValue: "introSection",
      hidden: true,
    },
  ],
};

export default introSection;
