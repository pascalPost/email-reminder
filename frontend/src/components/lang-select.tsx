import i18n from "i18next";
import {Languages} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

export default function LanguageSelector() {
    return (
        <div className="inline-flex items-center">
            <div>
                <Select
                    value={i18n.resolvedLanguage}
                    onValueChange={(value) => {
                        i18n.changeLanguage(value).catch((error) => {
                            console.error(error);
                        });
                    }}
                >
                    <SelectTrigger className="px-2">
                        <Languages className="mr-2 h-5" strokeWidth={0.7}/>
                        <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='en'>
                            en
                        </SelectItem>
                        <SelectItem value='de'>
                            de
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}