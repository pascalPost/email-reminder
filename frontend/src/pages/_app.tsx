import {NavigationMenu} from "@radix-ui/react-navigation-menu";
import {ThemeProvider} from "next-themes";
import {usePathname} from "next/navigation";
import {
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {ModeToggle} from "./_mode-toggle";
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";
import {NavLink, Outlet} from 'react-router-dom'

export default function App() {
    const queryClient = new QueryClient()
    const pathname = usePathname();

    return (
        <div>
            {/*// <html lang="en" suppressHydrationWarning={true}>*/}
            {/*// <body className={`min-h-screen bg-background antialiased`}>*/}
            <QueryClientProvider client={queryClient}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <NavigationMenu orientation="horizontal" className="mb-4 flex justify-center gap-2 pt-2">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}
                                                    active={pathname === '/clients'}>
                                    <NavLink to="/clients">
                                        Clients
                                    </NavLink>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}
                                                    active={pathname === '/emails'}>
                                    <NavLink to="/emails">
                                        Emails
                                    </NavLink>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}
                                                    active={pathname === '/settings'}>
                                    <NavLink to='/settings'>
                                        Settings
                                    </NavLink>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                        <ModeToggle/>
                    </NavigationMenu>
                    <Outlet/>
                </ThemeProvider>
            </QueryClientProvider>
            {/*</body>*/}
            {/*</html>*/}
        </div>
    )
}
