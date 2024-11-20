// Utility function to convert a string to kebab-case
export const toKebabCase = (str: string | null | undefined): string => {
  if (!str) return ""; // Handle null or undefined inputs gracefully

  return str
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/[^\w-]+/g, "") // Remove non-word characters except dashes
    .replace(/--+/g, "-") // Replace multiple dashes with a single dash
    .replace(/^-+|-+$/g, ""); // Trim dashes from start and end
};
