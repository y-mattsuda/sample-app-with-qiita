import axios from 'axios'

// create fetcher for SWR using axios
export const fetcher = <T>(url: string) =>
  axios.get<T>(url).then((res) => res.data)
export const newFetcherWithToken = <T>(
  token: string
): ((url: string) => Promise<T>) => {
  return (url: string) => {
    return axios
      .get<T>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
  }
}

export const formatDate = (date: Date, format: string) => {
  format = format.replace(/yyyy/g, String(date.getFullYear()))
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
  format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2))
  format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2))
  format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2))
  format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2))
  format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3))
  return format
}

/*
 * This function is required to avoid a TypeScript type error for asynchronous RSC
 * ref: https://zenn.dev/tfutada/articles/36ad71ab598019#typescript%E3%82%A8%E3%83%A9%E3%83%BC
 * */
export function asyncComponent<T, R>(
  fn: (arg: T) => Promise<R>
): (arg: T) => R {
  return fn as (arg: T) => R
}
