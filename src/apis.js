import axios from 'axios'
let apiUrl = 'http://localhost:3000'

let shuffle = function (array) {
  var ranNums = []
  var i = array.length
  var j = 0
  while (i--) {
    j = Math.floor(Math.random() * (i + 1))
    ranNums.push(array[j])
    array.splice(j, 1)
  }
  return ranNums
}

let getRandomNums = function (randomNums, allNums) {
  if (!randomNums || !allNums || randomNums > allNums) {
    return
  }
  var allArray = []
  var randomArray = []
  var allRandomArray = []
  for (var i = 1; i <= allNums; i++) {
    allArray.push(i)
  }
  allRandomArray = shuffle(allArray)
  for (var j = 0, l = allRandomArray.length; j < l; j++) {
    if (j < randomNums) {
      randomArray.push(allRandomArray[j])
    } else {
      break
    }
  }
  return randomArray
}

export default {
  a: 1,
  fun: () => {
    return 'fun'
  },
  getArticles: (page, pagesize) => {
    let _page = page || 1
    let _pagesize = pagesize || 10
    return axios.get(apiUrl + '/articles?_page=' + _page + '&_limit=' + _pagesize)
  },
  getArticle: (id) => {
    return axios.get(apiUrl + '/articles/' + id)
  },
  getRandomArticles: (nums) => {
    // 模拟输出随机nums条文章信息
    let allArticlesNum = 18
    let articleIds = getRandomNums(nums, allArticlesNum)
    let queryString = articleIds.join('&id=')
    return axios.get(apiUrl + '/articles?id=' + queryString)
  },
  getFilterArticles: (page, pagesize, condition) => {
    let _page = page || 1
    let _pagesize = pagesize || 10
    let params
    let paramsString
    // source=2,5&month=8,10,11
    // 根据条件字符串来拼接API查询的参数
    // let testCondition = 'source=2,5&month=8,10,11'
    let getParams = function (conditionString) {
      let params = ''
      if (!conditionString) return
      let filterArr = conditionString.split('&')
      // console.log(filterArr)
      let filterObj = {}
      if (filterArr.length) {
        filterArr.map((filter) => {
          let tmpArr = filter.split('=')
          if (tmpArr.length === 2) {
            filterObj[tmpArr[0]] = tmpArr[1]
          }
        })
      }
      // console.log(filterObj)
      for (let key in filterObj) {
        let tmpItemArr = filterObj[key].split(',')
        if (tmpItemArr.length) {
          tmpItemArr.map((item) => {
            params = params + (key + '=' + item + '&')
          })
        }
      }
      params = params.substr(0, params.length - 1)
      return params
    }
    if (condition) {
      params = getParams(condition)
      paramsString = '&' + params
    } else {
      paramsString = ''
    }
    // console.log(getParams(testCondition))
    return axios.get(apiUrl + '/articles?_page=' + _page + '&_limit=' + _pagesize + paramsString)
  }
}
