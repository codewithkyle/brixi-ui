// @ts-ignore
importScripts("/static/marked.js");

declare function marked(markdown:string):string;

onmessage = (e) => {
  const { id, markdown } = e.data;
  let output = {
    id: id,
    type: "success",
    html: "",
    error: "",
  };
  try {
    output.html = marked(markdown);
  } catch (e) {
    output.error = e;
    output.type = "error";
  }
  // @ts-ignore
  postMessage(output);
};