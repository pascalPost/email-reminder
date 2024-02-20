import ClientForm from "./_form";
import {Client, columns} from "./_columns.tsx";
import {useQuery} from "@tanstack/react-query";
import {DataTable} from "./_data-table";

async function getData(): Promise<Client[]> {
    // Fetch data from your API here.
    return [
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
    ];
}

export default function ClientsPage() {
    const query = useQuery({queryKey: ['data'], queryFn: getData})

    const data = query.data ?? [];

    return (
        <>
            <ClientForm/>
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={data}/>
            </div>
        </>
    );
}
