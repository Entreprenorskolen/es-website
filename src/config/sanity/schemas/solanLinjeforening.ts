const solanLinjeforening = {
  name: "solanLinjeforening",
  title: "Solan Linjeforening",
  type: "document",
  fields: [
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
      name: "solanUrl",
      title: "Solan URL",
      type: "url",
    },
    {
      name: "videoTitle",
      title: "VideoTitle",
      type: "string",
    },
    {
      name: "video",
      title: "Video",
      type: "string",
      description: "Enter YouTube video URL",
    },
  ],
};

export default solanLinjeforening;
