const about = {
  name: "about",
  title: "About",
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
      name: "titleText",
      title: "Title Text",
      type: "text",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
    },
    {
      name: "aboutTitle",
      title: "About Title",
      type: "string",
    },
    {
      name: "aboutText",
      title: "About Text",
      type: "text",
    },
  ],
};

export default about;
