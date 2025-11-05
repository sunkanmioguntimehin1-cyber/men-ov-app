// export const truncateSimple = (text:string, length: number) =>
//   text.length > length ? text.slice(0, length) + "..." : text;


export const truncateSimple = (text: string, length: number) =>
  text?.length > length ? text.slice(0, length) + "..." : text || "";