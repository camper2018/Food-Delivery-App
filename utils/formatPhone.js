export const formatPhone = (phoneNumber) => {
  const formattedPhone = phoneNumber.split("");
  formattedPhone.splice(3, 0, ") ");
  formattedPhone.splice(7, 0, "-");
  return `(${formattedPhone.join("")}`;
};
