export const getAllTaskQueues = (data) => {
  let obj = {};
  for (let dataItem of data) {
    const { status } = dataItem;
    if (obj[status]) obj[status].push(dataItem);
    else obj[status] = [dataItem];
  }
  return obj;
};
