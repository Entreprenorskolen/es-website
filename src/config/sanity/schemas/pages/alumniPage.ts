const alumniPage = {
  name: "alumniPage",
  title: "Alumni Page",
  type: "document",
  fields: [
    {
      name: "mainTitle",
      title: "Main Title",
      type: "string",
    },
    {
      name: "titleText",
      title: "Title Text",
      type: "text",
    },
    {
      name: "startupTitle",
      title: "Startup Title",
      type: "string",
    },
    {
      name: "alumniTitle",
      title: "Alumni Title",
      type: "string",
    },
    {
      name: "alumniStoryTitle",
      title: "Alumni Story Title",
      type: "string",
    },
    {
      name: "alumniStories",
      title: "Alumni Stories",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Name",
              type: "string",
            },
            {
              name: "roleInStartup",
              title: "Role in Startup",
              type: "string",
            },
            {
              name: "image",
              title: "Image",
              type: "image",
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
  ],
};

export default alumniPage;
