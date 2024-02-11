"use client";

import {ColumnDef} from "@tanstack/react-table";
import {Calendar, Pencil, Trash} from "lucide-react";
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Label} from "@radix-ui/react-menu";
import {Input} from "@/components/ui/input";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import MonthPicker from "@/components/month-picker";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Client = {
    id: string
    firstName: string
    lastName: string
    email: string
    reminderFrequency: "halfyear" | "year"
    lastReminder: string
    registrationDate: string
};

export const columns: ColumnDef<Client>[] = [
    {
        accessorKey: "firstName",
        header: "Vorname",
    },
    {
        accessorKey: "lastName",
        header: "Nachname",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "reminderFrequency",
        header: "Frequenz",
        cell: ({row}) => {
            const freq = row.getValue("reminderFrequency");

            return (
                <div>
                    {freq === "halfyear" ? "halbjährlich" : "jährlich"}
                </div>
            )
        }
    },
    {
        accessorKey: "lastReminder",
        header: "Letzte Erinnerung",
        cell: ({row}) => {
            const date = new Date(row.getValue("lastReminder"));
            const formatted = new Intl.DateTimeFormat("de-DE", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
            }).format(date);

            return <div>{formatted}</div>
        }
    },
    {
        accessorKey: "registrationDate",
        header: "Registrierung",
        cell: ({row}) => {
            const date = new Date(row.getValue("lastReminder"));
            const formatted = new Intl.DateTimeFormat("de-DE", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
            }).format(date);

            return <div>{formatted}</div>
        }
    },
    {
        id: "actions",
        cell: ({row}) => {
            const client : Client = row.original;

            const form = useForm({
                defaultValues : {
                    "id" : client.id,
                    "firstName" : client.firstName,
                    "lastName" : client.lastName,
                    "email" : client.email,
                    "lastReminder" : client.lastReminder,
                    "frequency" : client.reminderFrequency,
            },
        });

            return (
                <>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <Pencil className="h-4 w-4"/>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Bearbeiten</DialogTitle>
                            </DialogHeader>
                            <Form {...form}>
                                <form id="clientForm">

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
                                                                <Input placeholder="2024-3" {...field} />
                                                                <div className="absolute right-2 top-1.5">
                                                                    <Popover>
                                                                        <PopoverTrigger>
                                                                            <Calendar/>
                                                                        </PopoverTrigger>
                                                                        <PopoverContent>
                                                                            <MonthPicker currentMonth={new Date()} onMonthChange={()=> {}} />
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
                            <DialogFooter>
                                <Button type="submit">Speichern</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <Trash className="h-4 w-4"/>
                    </Button>
                </>
            )
        },
    },
];
