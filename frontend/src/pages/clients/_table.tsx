import {Client} from "./_schema.ts";
import {useQuery} from "@tanstack/react-query";
import {columns} from "./_columns.tsx";
import {DataTable} from "./_data-table.tsx";
import axios from "axios";

async function fetchClients(): Promise<Client[]> {
    return axios.get('/client').then(response => {
        return response.data as Client[];
    });
}

export function ClientTable() {
    const {isPending, error, data} = useQuery({
        queryKey: ['getClients'],
        queryFn: async () => {
            return fetchClients();
        }
    });

    if (isPending) return <DataTable columns={columns} data={[]} loading={true}/>;
    if (error) return <div>An error occurred: {error.message}</div>;

    return <DataTable columns={columns} data={data}/>
}