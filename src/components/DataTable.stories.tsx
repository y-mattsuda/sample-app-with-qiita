import type { MRT_ColumnDef } from "material-react-table";
import DataTable from "./DataTable";

export default {
  title: "DataTable",
  component: DataTable,
};

type User = {
  name: string;
  age: number;
};

const data: User[] = [
  { name: "John", age: 20 },
  { name: "Jane", age: 21 },
];

const columns: MRT_ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    muiTableHeadCellProps: { sx: { color: "green" } },
  },
  {
    accessorKey: "age",
    header: "Age",
  },
];

export const Default = () => <DataTable data={data} columns={columns} />;
