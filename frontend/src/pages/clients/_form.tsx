import {Button} from "@/components/ui/button"
import {Card, CardContent, CardFooter} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "@/i18n.ts";
import MonthPicker from "@/components/month-picker";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Calendar} from "lucide-react";
import {useTranslation} from 'react-i18next';

export const GenericStringConstraint = z.string().min(1).max(20);

export const clientFormSchema = z.object({
    firstName: GenericStringConstraint,
    lastName: GenericStringConstraint,
    email: z.string().email(),
    lastReminder: z.string().refine(value => /^\d{4}-\d{2}$/.test(value), {params: {i18n: "InvalidDate"}}),
    frequency: z.enum(["halfyear", "year"]),
});

export function yearMonthString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1
    return `${year}-${month}`;
}

export default function ClientForm() {
    const {t} = useTranslation();

    const form = useForm<z.infer<typeof clientFormSchema>>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            lastReminder: "",
            frequency: "halfyear",
        },
        resolver: zodResolver(clientFormSchema),
    });

    const watchLastReminder = form.watch('lastReminder');

    const lastReminderDate = (): Date => {
        if (!watchLastReminder) {
            return new Date();
        }

        const [year, month]: number[] = watchLastReminder.split("-").map(Number);
        return new Date(year, month - 1);
    }

    function onMonthChange(date: Date) {
        form.setValue('lastReminder', yearMonthString(date));
    }

    function onReset() {
        form.reset();
    }

    function onSubmit(values: z.infer<typeof clientFormSchema>) {
        console.log(values);

        alert(JSON.stringify(values));
        // form.reset();
    }

    return (
        <div className="md:container md:max-w-3xl md:mx-auto ml-2 mr-2">
            <Card>
                <CardContent className="pt-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} onReset={onReset} id="clientForm">
                            <div className="grid grid-cols-2 items-center gap-4">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t("FirstName")}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={t('PlaceholderFirstName')} {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('LastName')}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={t('PlaceholderLastName')} {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <div className="flex flex-col space-y-1.5 col-span-2">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>{t('Email')}</FormLabel>
                                                <FormControl>
                                                    <Input placeholder={t('PlaceholderEmail')} {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <FormField
                                        control={form.control}
                                        name="lastReminder"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>{t('LastReminder')}</FormLabel>
                                                <FormControl>
                                                    <div className="relative flex items-center max-w-2xl ">
                                                        <Input placeholder={yearMonthString(new Date())} {...field} />
                                                        <div className="absolute right-2 top-1.5">
                                                            <Popover>
                                                                <PopoverTrigger>
                                                                    <Calendar/>
                                                                </PopoverTrigger>
                                                                <PopoverContent>
                                                                    <MonthPicker currentMonth={lastReminderDate()}
                                                                                 onMonthChange={onMonthChange}/>
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>
                                                    </div>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5 mt-4">
                                    <Label htmlFor="frequency">{t('Frequency')}</Label>
                                    <Select defaultValue="semiannual">
                                        <SelectTrigger id="frequency" {...form.register("frequency")}>
                                            <SelectValue/>
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="semiannual">{t('Semiannual')}</SelectItem>
                                            <SelectItem value="annual">{t('Annual')}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="grid grid-cols-2 w-full gap-4 mt-2">
                    <Button type="reset" form="clientForm" variant="outline">{t('Cancel')}</Button>
                    <Button type="submit" form="clientForm">{t('Save')}</Button>
                </CardFooter>
            </Card>
        </div>
    );
}