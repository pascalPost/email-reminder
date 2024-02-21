import {Row} from "@tanstack/react-table";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Calendar, Pencil, Trash} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {yearMonthStringFromDate} from "@/lib/utils.ts";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import MonthPicker from "@/components/month-picker.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Client, clientSchema} from "@/pages/clients/_schema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

export function ActionsCell({row}: { row: Row<Client> }) {
    const client = row.original;

    const form = useForm<Client>({
        defaultValues: {
            "id": client.id,
            "firstName": client.firstName,
            "lastName": client.lastName,
            "email": client.email,
            "lastReminder": client.lastReminder,
            "reminderFrequency": client.reminderFrequency,
        },
        resolver: zodResolver(clientSchema),
    });

    const lastReminder = form.watch('lastReminder');

    function onMonthChange(date: Date) {
        form.setValue('lastReminder', date);
    }

    function onReset() {
        form.reset();
    }

    function onSubmit(values: Client) {
        console.log(values);

        alert(JSON.stringify(values));
        // form.reset();
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" className="size-8 p-0">
                        <Pencil className="size-4"/>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Bearbeiten</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={() => {
                            form.handleSubmit(onSubmit)
                        }} onReset={onReset} id="clientEditForm">
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
                                <div className="col-span-2 flex flex-col space-y-1.5">
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
                                <div className="mt-4 flex flex-col space-y-1.5">
                                    <FormField
                                        control={form.control}
                                        name="lastReminder"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Letzte Erinnerung</FormLabel>
                                                <FormControl>
                                                    <div className="relative flex max-w-2xl items-center">
                                                        <Input
                                                            placeholder={yearMonthStringFromDate(new Date())} {...field}
                                                            value={yearMonthStringFromDate(lastReminder)}/>
                                                        <div className="absolute right-2 top-1.5">
                                                            <Popover>
                                                                <PopoverTrigger>
                                                                    <Calendar/>
                                                                </PopoverTrigger>
                                                                <PopoverContent>
                                                                    <MonthPicker currentMonth={lastReminder}
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
                                <div className="mt-4 flex flex-col space-y-1.5">
                                    <FormLabel>Frequenz</FormLabel>
                                    <Select defaultValue={form.watch('reminderFrequency')}>
                                        <SelectTrigger id="frequency" {...form.register("reminderFrequency")}>
                                            <SelectValue/>
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="semiannual">Halbjährlich</SelectItem>
                                            <SelectItem value="annual">Jährlich</SelectItem>
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
            <Button variant="ghost" className="size-8 p-0">
                <Trash className="size-4"/>
            </Button>
        </>
    )
}