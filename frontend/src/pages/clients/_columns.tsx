"use client";

import {ColumnDef, Row} from "@tanstack/react-table";
import {Calendar, Pencil, Trash} from "lucide-react";
import {Button} from "@/components/ui/button"
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import MonthPicker from "@/components/month-picker";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslation} from "react-i18next";
import {clientFormSchema, GenericStringConstraint} from "@/pages/clients/_schema.ts";
import {yearMonthString} from "@/lib/utils.ts";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Client = {
    id: string
    firstName: string
    lastName: string
    email: string
    reminderFrequency: "semiannual" | "annual"
    lastReminder: string
    registrationDate: string
};

const clientEditSchema = clientFormSchema.extend({
    "id": GenericStringConstraint
});

function ActionsCell({row}: { row: Row<Client> }) {
    const client: Client = row.original;

    const form = useForm<z.infer<typeof clientEditSchema>>({
        defaultValues: {
            "id": client.id,
            "firstName": client.firstName,
            "lastName": client.lastName,
            "email": client.email,
            "lastReminder": yearMonthString(new Date(client.lastReminder)),
            "frequency": client.reminderFrequency,
        },
        resolver: zodResolver(clientEditSchema),
    });

    const watchLastReminder = form.watch('lastReminder');

    function onMonthChange(date: Date) {
        form.setValue('lastReminder', yearMonthString(date));
    }

    function onReset() {
        form.reset();
    }

    const lastReminderDate = (): Date => {
        if (!watchLastReminder) {
            return new Date();
        }

        const [year, month]: number[] = watchLastReminder.split("-").map(Number);
        return new Date(year, month - 1);
    }

    function onSubmit(values: z.infer<typeof clientEditSchema>) {
        console.log(values);

        alert(JSON.stringify(values));
        // form.reset();
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <Pencil className="h-4 w-4"/>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Bearbeiten</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} onReset={onReset} id="clientEditForm">
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
                                <div className="flex flex-col space-y-1.5 mt-4">
                                    <FormField
                                        control={form.control}
                                        name="lastReminder"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Letzte Erinnerung</FormLabel>
                                                <FormControl>
                                                    <div className="relative flex items-center max-w-2xl">
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
                                    <FormLabel>Frequenz</FormLabel>
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
                    <DialogFooter>
                        <Button type="reset" form="clientEditForm" variant="outline">Reset</Button>
                        <Button type="submit" form="clientEditForm">Speichern</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Button variant="ghost" className="h-8 w-8 p-0">
                <Trash className="h-4 w-4"/>
            </Button>
        </>
    )
}

export const columns: ColumnDef<Client>[] = [
    {
        accessorKey: "firstName",
        header: "FirstName"
    },
    {
        accessorKey: "lastName",
        header: "LastName",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "reminderFrequency",
        header: "Frequency",
        cell: ({row}) => {
            const {t} = useTranslation();

            const freq = row.getValue("reminderFrequency");

            return (
                <div>
                    {freq === "semiannual" ? t("Semiannual") : t("Annual")}
                </div>
            )
        }
    },
    {
        accessorKey: "lastReminder",
        header: "LastReminder",
        cell: ({row}) => {
            const {i18n} = useTranslation();

            const date = new Date(row.getValue("lastReminder"));
            const formatted = new Intl.DateTimeFormat(i18n.resolvedLanguage === "de" ? "de-DE" : undefined, {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
            }).format(date);

            return <div>{formatted}</div>
        }
    },
    {
        accessorKey: "registrationDate",
        header: "Registration",
        cell: ({row}) => {
            const {i18n} = useTranslation();
            const date = new Date(row.getValue("registrationDate"));
            const formatted = new Intl.DateTimeFormat(i18n.resolvedLanguage === "de" ? "de-DE" : undefined, {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
            }).format(date);

            return <div>{formatted}</div>
        }
    },
    {
        id: "actions",
        cell: row => ActionsCell(row),
    },
];
