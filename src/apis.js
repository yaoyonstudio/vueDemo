import axios from 'axios'
let apiUrl = 'http://localhost:3000'

export default {
  a: 1,
  fun: () => {
    return 'fun'
  },
  getArticles: (page, pagesize) => {
    let _page = page || 1
    let _pagesize = pagesize || 10
    return axios.get(apiUrl + '/articles?_page=' + _page + '&_limit=' + _pagesize)
  }
}
