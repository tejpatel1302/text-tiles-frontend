import DataTableRowActions from "./DataTableRowAction";

export type Address = {
  billToName: string;
  address1: string;
  address2: string;
  city: string;
  county: string;
  eir: string;
  id: string;
};

export const getAddressColumns = ({ onEdit, onDelete }: any) => [
  {
    header: "Address ID",
    accessorKey: "id",
    cell: ({row}:any) => {
      const result = row.getValue('id');
      const hyphenIndex = result.indexOf('-');
      const formattedResult = hyphenIndex !== -1 ? result.substring(0, hyphenIndex) : result;
      return (
          <div>
              {formattedResult}
          </div>
      );
  }
  },
  {
    header: "Bill To Name",
    accessorKey: "billToName",
  },
  {
    header: "Address 1",
    accessorKey: "address1",
  },
  {
    header: "Address 2",
    accessorKey: "address2",
  },
  {
    header: "City",
    accessorKey: "city",
  },
  {
    header: "County",
    accessorKey: "county",
  },
  {
    header: "EIR",
    accessorKey: "eir",
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }: any) => (
      <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />
    ),
  },
];
