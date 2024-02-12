'use client';

import "@/app/globals.css";
import {Inter as FontSans} from "next/font/google";
import {NavigationMenu} from "@radix-ui/react-navigation-menu";
import {ThemeProvider} from "next-themes";
import {usePathname} from "next/navigation";
import {
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {ModeToggle} from "@/app/mode-toggle";
import {cn} from "@/lib/utils";
import React from "react";
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export default function RootLayout({children}: { children: React.ReactNode }) {
    const queryClient = new QueryClient()
    const pathname = usePathname();

    return (
        <html lang="en" suppressHydrationWarning={true}>
        <body className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
        )}>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <NavigationMenu orientation="horizontal" className="flex justify-center mt-2 mb-4 gap-2">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link href="/clients" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}
                                                    active={pathname === '/clients'}>
                                    Clients
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link href="/emails" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}
                                                    active={pathname === '/emails'}>
                                    Emails
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link href="/settings" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}
                                                    active={pathname === '/settings'}>
                                    Settings
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                    <ModeToggle/>
                </NavigationMenu>
                {children}
            </ThemeProvider>
        </QueryClientProvider>
        </body>
        </html>
    )
}
