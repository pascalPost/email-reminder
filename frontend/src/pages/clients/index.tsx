import ClientForm from "./_form.tsx";
import {ClientTable} from "./_table.tsx";

export default function ClientsPage() {
    return (
        <>
            <ClientForm/>
            <div className="container mx-auto py-10">
                <ClientTable/>
            </div>
        </>
    );

}
