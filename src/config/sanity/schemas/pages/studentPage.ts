const studentPage = {
  name: "studentPage",
  title: "Student Page",
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
      name: "studentTitle",
      title: "Student Title",
      type: "string",
    },
    {
      name: "studentStoryTitle",
      title: "Student Story Title",
      type: "string",
    },
    {
      name: "studentStories",
      title: "Student Stories",
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

export default studentPage;
