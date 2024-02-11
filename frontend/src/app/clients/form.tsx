"use client";

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardFooter} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import MonthPicker from "@/components/month-picker";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Calendar} from "lucide-react";

const GenericStringConstraint = z.string().min(1, {
    message: "Min. 1 Buchstabe.",
}).max(20, {
    message: "Max. 20 Buchstaben.",
});

const formSchema = z.object({
    firstName: GenericStringConstraint,
    lastName: GenericStringConstraint,
    email: z.string().email({
        message: "Ungültige Email.",
    }),
    lastReminder: z.string().regex(/^\d{4}-\d{2}$/, {
        message: "Ungültiges Datum YYYY-MM.",
    }),
    frequency: z.enum(["halfyear", "year"]),
});

export default function ClientForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            lastReminder: "",
            frequency: "halfyear",
        },
        resolver: zodResolver(formSchema),
    });

    const watchLastReminder = form.watch('lastReminder');

    const lastReminderDate = (): Date => {
        if (!watchLastReminder) {
            return new Date();
        }

        const [year, month]: number[] = watchLastReminder.split("-").map(Number);
        return new Date(year, month - 1);
    }

    function yearMonthString(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1
        return `${year}-${month}`;
    }

    function onMonthChange(date: Date) {
        form.setValue('lastReminder', yearMonthString(date));
    }

    function onReset() {
        console.log("reset");
        form.reset();
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
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
                                            <FormLabel>Vorname</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Max" {...field} />
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
                                            <FormLabel>Nachname</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Mustermann" {...field} />
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
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="max@mustermann.de" {...field} />
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
                                                <FormLabel>Letzte Erinnerung</FormLabel>
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
                                    <Label htmlFor="frequency">Frequenz</Label>
                                    <Select defaultValue="halfyear">
                                        <SelectTrigger id="frequency" {...form.register("frequency")}>
                                            <SelectValue/>
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="halfyear">Halbjährlich</SelectItem>
                                            <SelectItem value="year">Jährlich</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="grid grid-cols-2 w-full gap-4 mt-2">
                    <Button type="reset" form="clientForm" variant="outline">Abbrechen</Button>
                    <Button type="submit" form="clientForm">Speichern</Button>
                </CardFooter>
            </Card>
        </div>
    );
}