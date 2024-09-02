const removeFromArray = <t>(array: t[], value: t): t[] => {
  const index = array.indexOf(value);
  if (index !== -1) {
    array.splice(index, 1);
  }

  return array;
};

export default removeFromArray;
