import axios from 'axios'
let apiUrl = 'http://localhost:3000'

export default {
  a: 1,
  fun: () => {
    return 'fun'
  },
  getPosts: () => {
    return axios.get(apiUrl + '/posts')
  }
}
