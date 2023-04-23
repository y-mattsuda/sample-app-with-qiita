import useSWR from "swr";
import { fetcher } from "@/lib";
import type { QiitaItem } from "@/lib/types";

const QIITA_API_URL = "https://qiita.com/api/v2";

export const useQiitaItems = () => {
  const { data, error, isLoading } = useSWR<QiitaItem[]>(
    `${QIITA_API_URL}/items`,
    fetcher
  );
  const rawData = data as QiitaItem[];
  return { rawData, error, isLoading };
};
