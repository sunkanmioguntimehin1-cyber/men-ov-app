export const getInitials = (name?: string) => {
  if (!name) return ""; // fallback if undefined or empty

  return name
    .trim()
    .split(/\s+/) // handles multiple spaces
    .map((word) => word[0]?.toUpperCase() || "")
    .join("");
};
