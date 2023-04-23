// create fetcher for SWR using axios
import axios from "axios";
export const fetcher = <T>(url: string) =>
  axios.get<T>(url).then((res) => res.data);
