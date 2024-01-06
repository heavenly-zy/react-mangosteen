import axios from 'axios'

axios.defaults.baseURL = isDev ? '/' : 'https://mangosteen2.hunger-valley.com'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 10000

export const ajax = {
  get: <T>(path: string) => axios.get<T>(path),
  post: () => { },
  patch: () => { },
  delete: () => { },
}
