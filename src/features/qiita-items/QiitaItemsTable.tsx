"use client";

import DataTable from "@/components/DataTable";
import type { MRT_ColumnDef } from "material-react-table";
import { useQiitaItems } from "./hooks";
import { ArticleLinkButton } from "@/components/Buttons";

type QiitaItemsTableRow = {
  id: string;
  title: string;
  userId: string;
  created_at: string;
};

type QiitaItemsTableColumn = MRT_ColumnDef<QiitaItemsTableRow>;

const QiitaItemsTable = () => {
  const { rawData, error } = useQiitaItems();
  if (error) {
    return <div>error</div>;
  }
  const data: QiitaItemsTableRow[] = rawData.map((item) => ({
    id: item.id,
    title: item.title,
    userId: item.user.id,
    created_at: item.created_at,
  }));
  const columns: QiitaItemsTableColumn[] = [
    {
      accessorKey: "title",
      header: "記事タイトル",
      size: 350,
    },
    {
      accessorKey: "userId",
      header: "ユーザーID",
      size: 50,
    },
    {
      accessorFn(row) {
        return new Date(row.created_at).toLocaleString();
      },
      id: "created_at",
      header: "投稿日",
      size: 100,
    },
    {
      accessorFn(row) {
        return (
          <ArticleLinkButton
            link={`/items/${row.id}`}
            tooltip="記事詳細ページへ移動します"
          />
        );
      },
      id: "go-to-detail",
      header: "詳細へ",
      size: 50,
    },
  ];
  return <DataTable data={data} columns={columns} />;
};

export default QiitaItemsTable;
