import {Moon, Sun} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItemRight,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useTheme} from "@/lib/utils.ts";
import {Theme} from "@/components/theme-provider";


export default function ModeToggle() {
    const {theme, setTheme} = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun
                        className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
                    <Moon
                        className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuRadioGroup value={theme} onValueChange={(v) => {
                    setTheme(v as Theme)
                }}>
                    <DropdownMenuRadioItemRight value="light">Light</DropdownMenuRadioItemRight>
                    <DropdownMenuRadioItemRight value="dark">Dark</DropdownMenuRadioItemRight>
                    <DropdownMenuRadioItemRight value="system">System</DropdownMenuRadioItemRight>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
