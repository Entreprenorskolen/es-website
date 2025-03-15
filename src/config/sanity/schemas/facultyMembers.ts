const facultyMembers = {
  name: "facultyMembers",
  title: "Faculty Members",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
    },
    {
      name: "bio",
      title: "Bio",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};

export default facultyMembers;
