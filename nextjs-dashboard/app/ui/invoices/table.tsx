import Image from "next/image";
import { UpdateInvoice, DeleteInvoice } from "@/app/ui/invoices/buttons";
import InvoiceStatus from "@/app/ui/invoices/status";
import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
import { fetchFilteredInvoices } from "@/app/lib/data";
import Table from "../table";
import { Column, Header } from "@/app/lib/definitions";
import type { InvoicesTable } from "@/app/lib/definitions";

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);

  const headers: Header[] = [
    { label: "Customer", className: "px-4 py-5 font-medium sm:pl-6" },
    { label: "Email", className: "px-3 py-5 font-medium" },
    { label: "Amount", className: "px-3 py-5 font-medium" },
    { label: "Date", className: "px-3 py-5 font-medium" },
    { label: "Status", className: "px-3 py-5 font-medium" },
    {
      label: <span className="sr-only">Edit</span>,
      className: "relative py-3 pl-6 pr-3",
    },
  ];

  const columns: Column<InvoicesTable>[] = [
    {
      className: "whitespace-nowrap py-3 pl-6 pr-3",
      render: (invoice) => (
        <div className="flex items-center gap-3">
          <Image
            src={invoice.image_url}
            className="rounded-full"
            width={28}
            height={28}
            alt={`${invoice.name}'s profile picture`}
          />
          <p>{invoice.name}</p>
        </div>
      ),
    },
    {
      className: "whitespace-nowrap px-3 py-3",
      render: "email",
    },
    {
      className: "whitespace-nowrap px-3 py-3",
      render: (invoice) => formatCurrency(invoice.amount),
    },
    {
      className: "whitespace-nowrap px-3 py-3",
      render: (invoice) => formatDateToLocal(invoice.date),
    },
    {
      className: "whitespace-nowrap px-3 py-3",
      render: (invoice) => <InvoiceStatus status={invoice.status} />,
    },
    {
      className: "whitespace-nowrap py-3 pl-6 pr-3",
      render: (invoice) => (
        <div className="flex justify-end gap-3">
          <UpdateInvoice id={invoice.id} />
          <DeleteInvoice id={invoice.id} />
        </div>
      ),
    },
  ];

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {invoices?.map((invoice) => (
              <div
                key={invoice.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={invoice.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <p>{invoice.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{invoice.email}</p>
                  </div>
                  <InvoiceStatus status={invoice.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p>{formatDateToLocal(invoice.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Table headers={headers} columns={columns} data={invoices} />
        </div>
      </div>
    </div>
  );
}
