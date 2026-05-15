import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
export const currency = (v: number) => `Rs ${v.toLocaleString("en-IN")}`;
