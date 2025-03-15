const apply = {
  name: "apply",
  title: "Apply",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "intro",
      title: "Introduction Section",
      type: "object",
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
      ],
    },
    {
      name: "process",
      title: "Process Section",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
        },
        {
          name: "timeline",
          title: "Timeline",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "date", title: "Date", type: "string" },
                { name: "title", title: "Title", type: "string" },
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
      ],
    },
    {
      name: "content",
      title: "Content Section",
      type: "object",
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
                { name: "title", title: "Title", type: "string" },
                { name: "text", title: "Text", type: "text" },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "steps",
      title: "Steps Section",
      type: "object",
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
                { name: "title", title: "Title", type: "string" },
                { name: "text", title: "Text", type: "text" },
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
                { name: "title", title: "Title", type: "string" },
                { name: "text", title: "Text", type: "text" },
                { name: "url", title: "URL", type: "url" },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "FAQ",
      title: "FAQ",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            {
              name: "content",
              title: "Content",
              type: "array",
              of: [{ type: "block" }],
            },
          ],
        },
      ],
    },
  ],
};

export default apply;
