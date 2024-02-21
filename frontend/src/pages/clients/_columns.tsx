import {ColumnDef} from "@tanstack/react-table";
import {useTranslation} from "react-i18next";
import {ActionsCell} from "./_action-cell";
import {Client} from "@/pages/clients/_schema.ts";

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
        cell: function FrequencyCell({row}) {
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
        cell: function LastReminderCell({row}) {
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
        cell: function RegistrationCell({row}) {
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
