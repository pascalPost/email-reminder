import {useQuery} from "@tanstack/react-query";
import {Client, clientSchema} from "@/pages/clients/_schema.ts";
import {z} from "zod";
import ClientForm from "@/pages/clients/_form.tsx";
import {DataTable} from "@/pages/clients/_data-table.tsx";
import {columns} from "@/pages/clients/_columns.tsx";

async function getData(): Promise<Client[]> {
    // Fetch data from your API here.
    return z.array(clientSchema).parseAsync([
        {
            "id": "1",
            "firstName": "Max",
            "lastName": "Mustermann",
            "email": "Max@mustermann.de",
            "reminderFrequency": "semiannual",
            "registrationDate": "2023-12-17T22:33:05Z",
            "lastReminder": "2023-12-01T00:00:00Z"
        },
        {
            "id": "2",
            "firstName": "Bitte",
            "lastName": "Mal-Was",
            "email": "bitte@verschicken.now",
            "reminderFrequency": "semiannual",
            "registrationDate": "2023-12-18T22:40:19Z",
            "lastReminder": "2023-01-01T00:00:00Z"
        },
        {
            "id": "3",
            "firstName": "Max",
            "lastName": "Mustermann",
            "email": "Max@mustermann.de",
            "reminderFrequency": "annual",
            "registrationDate": "2023-12-21T23:03:34Z",
            "lastReminder": "2023-12-01T00:00:00Z"
        }
    ]);
}

export default function ClientsPage() {
    const {isPending, isSuccess, error, data} = useQuery({
        queryKey: ['getClients'],
        queryFn: async () => {
            return getData();
        }
    });

    if (isPending) return <div>Fetching posts...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    if (isSuccess) {
        return (
            <>
                <ClientForm/>
                <div className="container mx-auto py-10">
                    <DataTable columns={columns} data={data}/>
                </div>
            </>
        );
    }
}
