// src/lib/utils.ts

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge Tailwind CSS class names intelligently
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
