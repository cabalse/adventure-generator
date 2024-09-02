const addToArray = <t>(array: t[], value: t): t[] => {
  if (value === undefined) return array;
  array.push(value);

  return array;
};

export default addToArray;
