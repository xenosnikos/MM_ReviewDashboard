export const providers = [
  "Google",
  "Yellow Pages",
  "CarGurus",
  "Cars",
  "Dealer",
  "Facebook"
];
export const selectProvider = [...providers.filter((item) => item !== "Cars")];

export const filterProvider = ["All Social Media", ...selectProvider];

export const ratings = [5, 4, 3, 2, 1];
