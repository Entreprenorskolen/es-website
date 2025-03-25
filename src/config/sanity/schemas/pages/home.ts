const home = {
  name: "home",
  title: "Home",
  type: "document",
  fields: [
    {
      name: "isEnglish",
      title: "Is English",
      type: "boolean",
      description: "Tell the website to load this document if the user has English as their language.",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "image",
      title: "Hero Image",
      type: "image",
    },
    {
      name: "cta",
      title: "Call to Action",
      type: "object",
      fields: [
        {
          name: "text",
          title: "Button Text",
          type: "string",
        },
        {
          name: "link",
          title: "Button Link",
          type: "url",
        },
      ],
    },
    {
      name: "partners",
      title: "Partner Logos",
      type: "array",
      of: [{ type: "image" }],
    },
    {
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        {
          type: "object",
          name: "section",
          title: "Section",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text" },
          ],
        },
      ],
    },
    {
      name: "successStories",
      title: "Success Stories",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "position", title: "Position", type: "string" },
            { name: "story", title: "Story", type: "text" },
            { name: "image", title: "Image", type: "image" },
          ],
        },
      ],
    },
    {
      name: "news",
      title: "News & Publications",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "date", title: "Date", type: "string" },
            { name: "description", title: "Description", type: "text" },
            { name: "link", title: "Link", type: "url" },
          ],
        },
      ],
    },
    {
      name: "statistics",
      title: "Key Statistics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Value", type: "string" },
            { name: "description", title: "Description", type: "string" },
          ],
        },
      ],
    },
    {
      name: "contact",
      title: "Contact Section",
      type: "object",
      fields: [
        { name: "title", title: "Title", type: "string" },
        { name: "description", title: "Description", type: "text" },
        { name: "image", title: "Image", type: "image" },
      ],
    },
  ],
};

export default home;
