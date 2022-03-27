import Fuse from "fuse.js";

export const getAllTaskQueues = (data) => {
  let obj = {};
  for (let dataItem of data) {
    const { status } = dataItem;
    if (obj[status]) obj[status].push(dataItem);
    else obj[status] = [dataItem];
  }
  return obj;
};

export function search(searchTerm = "", data = [], key = ["title", "status"]) {
  if (searchTerm.length == 0) return data;
  data = Object.values(data);
  const fuseOptions = {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 50,
    maxPatternLength: 12,
    minMatchCharLength: 1,
  };
  if (key.length > 0) fuseOptions.keys = [...key];
  const fuse = new Fuse(data, fuseOptions);
  const res = searchTerm
    ? fuse.search(searchTerm).map((character) => character.item)
    : data;
  return res;
}
