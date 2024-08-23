const inArray = <t>(array: t[], value: t) => {
  const res = array.indexOf(value) !== -1;
  return res;
};

export default inArray;
