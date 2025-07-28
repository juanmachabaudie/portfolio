import Image from "next/image";
import Search from "@/app/ui/search";
import { Column, FormattedCustomersTable, Header } from "@/app/lib/definitions";
import { fetchFilteredCustomers } from "@/app/lib/data";
import Table from "../table";

export default async function CustomersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const customers = await fetchFilteredCustomers(query, currentPage);
  console.log(customers);

  const headers: Header[] = [
    { label: "Name", className: "px-4 py-5 font-medium sm:pl-6" },
    { label: "Email", className: "px-3 py-5 font-medium" },
    { label: "Total Invoices", className: "px-3 py-5 font-medium" },
    { label: "Pending", className: "px-3 py-5 font-medium" },
    { label: "Paid", className: "px-3 py-5 font-medium" },
  ];

  const columns: Column<FormattedCustomersTable>[] = [
    {
      className: "whitespace-nowrap py-3 pl-6 pr-3",
      render: (customer) => (
        <div className="flex items-center gap-3">
          <Image
            src={customer.image_url}
            className="rounded-full"
            width={28}
            height={28}
            alt={`${customer.name}'s profile picture`}
          />
          <p>{customer.name}</p>
        </div>
      ),
    },
    {
      className: "whitespace-nowrap px-3 py-3",
      render: "email",
    },
    {
      className: "whitespace-nowrap px-3 py-3",
      render: "total_invoices",
    },
    {
      className: "whitespace-nowrap px-3 py-3",
      render: "total_pending",
    },
    {
      className: "whitespace-nowrap px-3 py-3",
      render: "total_paid",
    },
  ];

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-md bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {customers?.map((customer) => (
              <div
                key={customer.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <div className="flex items-center gap-3">
                        <Image
                          src={customer.image_url}
                          className="rounded-full"
                          alt={`${customer.name}'s profile picture`}
                          width={28}
                          height={28}
                        />
                        <p>{customer.name}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{customer.email}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between border-b py-5">
                  <div className="flex w-1/2 flex-col">
                    <p className="text-xs">Pending</p>
                    <p className="font-medium">{customer.total_pending}</p>
                  </div>
                  <div className="flex w-1/2 flex-col">
                    <p className="text-xs">Paid</p>
                    <p className="font-medium">{customer.total_paid}</p>
                  </div>
                </div>
                <div className="pt-4 text-sm">
                  <p>{customer.total_invoices} invoices</p>
                </div>
              </div>
            ))}
          </div>
          <Table headers={headers} columns={columns} data={customers} />
        </div>
      </div>
    </div>
  );
}
