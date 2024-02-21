import {NavigationMenu} from "@radix-ui/react-navigation-menu";
import {
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import ModeToggle from "./_mode-toggle";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {NavLink, Outlet, useLocation} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import LanguageSelector from "@/components/lang-select.tsx";
import ThemeProvider from "@/components/theme-provider.tsx";

function MenuLink({url, children}: { url: string, children: React.ReactNode; }) {
    const location = useLocation().pathname;
    return (
        <NavigationMenuLink asChild active={location === url}
                            className={navigationMenuTriggerStyle()}>
            <NavLink to={url}>
                {children}
            </NavLink>
        </NavigationMenuLink>
    )
}

export default function App() {
    const queryClient = new QueryClient();
    const {t} = useTranslation('navigation');

    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <NavigationMenu orientation="horizontal" className="mb-4 flex justify-center gap-2 pt-2">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <MenuLink url='/clients'>
                                    {t('Clients')}
                                </MenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <MenuLink url='/emails'>
                                    {t('Emails')}
                                </MenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <MenuLink url='/settings'>
                                    {t('Settings')}
                                </MenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                        <LanguageSelector/>
                        <ModeToggle/>
                    </NavigationMenu>
                    <Outlet/>
                </ThemeProvider>
            </QueryClientProvider>
        </div>
    )
}
