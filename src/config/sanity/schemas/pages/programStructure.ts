const programStructure = {
  name: "programStructure",
  title: "Program Structure",
  type: "document",
  fields: [
    {
      name: "isEnglish",
      title: "Is English",
      type: "boolean",
      description:
        "Tell the website to load this document if the user has English as their language.",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "introTitle",
      title: "Introduction Title",
      type: "string",
    },
    {
      name: "intro",
      title: "Introduction",
      type: "text",
    },
    {
      name: "sections",
      title: "Sections",
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
              name: "topic",
              title: "Topic",
              type: "string",
            },
            {
              name: "text",
              title: "Text",
              type: "text",
            },
            {
              name: "courses",
              title: "Courses",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "courseCode",
                      title: "Course Code",
                      type: "string",
                    },
                    {
                      name: "title",
                      title: "Title",
                      type: "string",
                    },
                    {
                      name: "credits",
                      title: "Credits",
                      type: "string",
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
          ],
        },
      ],
    },
    {
      name: "bostonInfo",
      title: "Boston Information",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
        },
        {
          name: "topic",
          title: "Topic",
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
    {
      name: "cernInfo",
      title: "CERN Information",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
        },
        {
          name: "topic",
          title: "Topic",
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
    {
      name: "berlinInfo",
      title: "Berlin Information",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
        },
        {
          name: "topic",
          title: "Topic",
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
    {
      name: "readMoreLink",
      title: "Read More Link",
      type: "url",
    },
  ],
};

export default programStructure;
