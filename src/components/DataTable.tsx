"use client";

import MaterialReactTable from "material-react-table";
import type { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";

export type DataTableProps<T extends Record<string, any>> = {
  data: T[];
  columns: MRT_ColumnDef<T>[];
};

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
}: DataTableProps<T>) => {
  const memoizedColumns = useMemo(() => columns, [columns]);

  return (
    <MaterialReactTable
      columns={memoizedColumns}
      data={data}
      enableRowSelection
      enableColumnOrdering
      enableGlobalFilter={false}
    />
  );
};

export default DataTable;
