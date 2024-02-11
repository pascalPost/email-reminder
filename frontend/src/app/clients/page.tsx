"use client";

import ClientForm from "@/app/clients/form";
import {DataTable} from "@/app/clients/data-table";
import {columns, Client} from "@/app/clients/columns";

async function getData(): Promise<Client[]> {
    // Fetch data from your API here.
    return [
        {
            "id": "1",
            "firstName": "Max",
            "lastName": "Mustermann",
            "email": "Max@mustermann.de",
            "reminderFrequency": "halfyear",
            "registrationDate": "2023-12-17T22:33:05Z",
            "lastReminder": "2023-12-01T00:00:00Z"
        },
        {
            "id": "2",
            "firstName": "Bitte",
            "lastName": "Mal-Was",
            "email": "bitte@verschicken.now",
            "reminderFrequency": "halfyear",
            "registrationDate": "2023-12-18T22:40:19Z",
            "lastReminder": "2023-01-01T00:00:00Z"
        },
        {
            "id": "3",
            "firstName": "Max",
            "lastName": "Mustermann",
            "email": "Max@mustermann.de",
            "reminderFrequency": "year",
            "registrationDate": "2023-12-21T23:03:34Z",
            "lastReminder": "2023-12-01T00:00:00Z"
        }
    ];
}

export default async function ClientsPage() {
    const data = await getData()

    return (
        <>
            <ClientForm/>
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={data}/>
            </div>
        </>
    );
};