const runSimulator = (max) => {
  return Math.floor(Math.random() * max);
}

const transformData = (data) => {
  const result = [];

  data.forEach(d => {
    if (result[d] === undefined) {
      result[d] = 0;
    }
    result[d] = result[d] + 1;
  });

  return result;
}

export {
  runSimulator,
  transformData
}
