import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {useContext} from "react";
import {ThemeProviderContext} from "@/components/theme-provider";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function useTheme() {
    return useContext(ThemeProviderContext);
}

export function yearMonthString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1
    return `${year}-${month}`;
}