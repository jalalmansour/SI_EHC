// Utility helpers used across UI components

// Merges className strings, filtering out falsy values
export function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}


