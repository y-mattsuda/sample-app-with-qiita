import type { QiitaItem } from "@/lib/types";
import type { FC } from "react";

type QiitaItemProps = {
  item: QiitaItem;
};

const QiitaItemDetail: FC<QiitaItemProps> = ({ item }) => {
  const { title } = item;
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default QiitaItemDetail;
