

export const validateName = (name) => {
  const regex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
  return regex.test(name.trim());
};