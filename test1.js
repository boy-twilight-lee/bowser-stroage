const a = () => {
  try {
    return 1;
  } catch (error) {
  } finally {
    return 3;
  }
  return 2;
};

console.log(a());
