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

// yearMonthStringFromDate will convert a Date object into a string in the format "YYYY-MM"
export function yearMonthStringFromDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1
    return `${year}-${month}`;
}

// yearMonthStringToDate will convert a string in the format "YYYY-MM" into a Date object or undefined
export function yearMonthStringToDate(date: string): Date | undefined {
    const [year, month] = date.split('-');
    if (year.length == 4 && month.length == 2) {
        const convertedDate = new Date(parseInt(year), parseInt(month) - 1);

        if (!isNaN(convertedDate.getTime())) {
            return convertedDate;
        }
    }

    return undefined;
}