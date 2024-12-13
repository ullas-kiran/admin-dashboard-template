// utils/formatDate.ts
import dayjs from "dayjs";

/**
 * Formats a date string into a readable format without time.
 * @param date - The date string to format (e.g., "2024-12-11T05:28:41.461246").
 * @param format - The format string to use (default: "DD-MM-YYYY").
 * @returns The formatted date string or "Invalid Date" if the input is invalid.
 */
export function formatDate(date: string, format: string = "DD-MM-YYYY"): string {
  return dayjs(date).isValid() ? dayjs(date).format(format) : "Invalid Date";
}
