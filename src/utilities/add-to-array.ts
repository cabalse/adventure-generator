const addToArray = <t>(array: t[], value: t) => {
  if (value === undefined) return;
  if (array.indexOf(value) === -1) {
    array.push(value);
  }
};

export default addToArray;
