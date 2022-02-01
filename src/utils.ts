export const formatErrors = (errors) => {
  const res = [];
  errors.detail.forEach(({ loc, msg, type }) => {
    res.push({
      name: [loc.pop()],
      errors: [msg],
    });
  });
  return res;
};
