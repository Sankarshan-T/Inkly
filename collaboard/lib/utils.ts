import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const COLORS = [
  "#08081c",
  "#141347",
  "#2bc2ad",
  "#d43d52",
  "#d50e71",
  "#732bde",
  "#12a66b",
  "#d47118",
]

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
};