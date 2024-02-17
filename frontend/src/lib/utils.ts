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