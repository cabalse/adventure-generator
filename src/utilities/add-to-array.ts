const addToArray = <t>(array: t[], value: t) => {
  if (value === undefined) return;
  array.push(value);
};

export default addToArray;
