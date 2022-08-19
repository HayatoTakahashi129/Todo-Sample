const URI_CONST = {
  getTodo: {
    url: "/todo",
    method: "get",
    initialReturnValue: [],
  },
  postTodo: {
    url: "/todo",
    method: "post",
  },
};

export const hasGetMethod = (url) => {
  const resource = Object.entries(URI_CONST).find(
    ([key, value]) => value.method === "get" && value.url === url
  );
  return Boolean(resource);
};

export default URI_CONST;
