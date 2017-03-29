<template>
  <div class="filterContainer">
    <ul class="flexRowBetween filterBar">
      <li :class="{ itemActive: item.id === currentFilterIndex }" v-for="(item, index) in data" :key="index" @click="toggleFilter(item)">{{ item.title }}</li>
    </ul>
    <section class="filterContent" v-show="currentFilterIndex != 0">
      <ul class="items">
        <li v-for="(item, index) in filter.items" :key="index" @click.stop.prevent="handleFilter(item, $event)">
          <h4>{{ item.title }}</h4>
          <ul v-if="item.subItems && item.subItems.length" class="subItems">
            <li v-for="subItem in item.subItems" @click.stop.prevent="selectFilterItem(subItem)" :class="{ subItemsActive: subItem.check }" >{{ subItem.title }}</li>
          </ul>
        </li>
      </ul>
      <button v-show="filterType === 'filter'" @click="filterHandle(currentFilterIndex)">确定</button>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ArticleFilter',
  data () {
    return {
      data: [
        {
          id: 1,
          type: 'order',
          title: '排序',
          items: [
            {id: 1, title: '按标题升序'},
            {id: 2, title: '按标题降序'},
            {id: 3, title: '按时间升序'},
            {id: 4, title: '按时间降序'},
            {id: 5, title: '按来源排序'},
            {id: 6, title: '按自然排序'}
          ]
        },
        {
          id: 2,
          type: 'filter',
          title: '筛选',
          items: [
            {
              id: 1,
              title: '来源',
              name: 'sourceId',
              subItems: [
                {id: 1, check: false, title: '今日头条'},
                {id: 2, check: false, title: '腾讯网'},
                {id: 3, check: false, title: '搜狐网'},
                {id: 4, check: false, title: '新浪网'},
                {id: 5, check: false, title: '百度网'}
              ]
            },
            {
              id: 2,
              title: '月份',
              name: 'month',
              subItems: [
                {id: 1, check: false, title: '一月'},
                {id: 2, check: false, title: '二月'},
                {id: 3, check: false, title: '三月'},
                {id: 4, check: false, title: '四月'},
                {id: 5, check: false, title: '五月'},
                {id: 6, check: false, title: '六月'},
                {id: 7, check: false, title: '七月'},
                {id: 8, check: false, title: '八月'},
                {id: 9, check: false, title: '九月'},
                {id: 10, check: false, title: '十月'},
                {id: 11, check: false, title: '十一月'},
                {id: 12, check: false, title: '十二月'}
              ]
            }
          ]
        }
      ],
      currentFilterIndex: 0,
      filter: {},
      filterType: ''
    }
  },
  mounted () {
    this.filter = this.data[0]
  },
  methods: {
    toggleFilter (item) {
      this.filterType = item.type
      if (item.id === this.currentFilterIndex) {
        this.currentFilterIndex = 0
      } else {
        this.filter = item
        this.currentFilterIndex = item.id
      }
    },
    handleFilter (item, event) {
      if (item.subItems) {
        return
      }
      this.currentFilterIndex = 0
      this.$parent.$emit('ORDER', item.id)
    },
    selectFilterItem (subItem) {
      // console.log(subItem)
      subItem.check = !subItem.check
    },
    filterHandle (currentFilterIndex) {
      // 根据总的筛选数组数据和要筛选的筛选项目ID来获取筛选的字符串
      let getFilterString = function (dataArray, id) {
        if (!dataArray || dataArray.length === 0 || !id) return
        let filterArray = []
        let selectObj = {}
        let condition = ''
        dataArray.map((item) => {
          if (item.id === id && item.items) {
            filterArray = item.items
          }
        })
        // console.log(filterArray)
        // 获取已选择的筛选项对象
        filterArray.map((item) => {
          if (item.subItems && item.subItems.length) {
            selectObj[item.name] = []
            item.subItems.map((subItem) => {
              if (subItem.check) {
                selectObj[item.name].push(subItem.id)
              }
            })
          }
        })
        // console.log(selectObj)
        // 将已选择的筛选项转换成字符串
        for (let key in selectObj) {
          selectObj[key] = selectObj[key].join(',')
          condition = condition + (key + '=' + selectObj[key] + '&')
        }
        condition = condition.substr(0, condition.length - 1)
        return condition
      }
      console.log(getFilterString(this.data, currentFilterIndex))
      this.$parent.$emit('FILTER', getFilterString(this.data, currentFilterIndex))
      this.currentFilterIndex = 0
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../css/vars.scss';
.filterContainer{
  width: 100%;
  ul.filterBar{
    li{
      display: block; flex: 1; text-align: center; height: 3rem; line-height: 3rem; border-bottom: 1px solid $borderColor;
    }
    li:not(:last-child){border-right: 1px solid $borderColor; }
    .itemActive{border-bottom: 2px solid $mainColor; color: $mainColor; }
  }
  .filterContent{
    width: 100%; height: calc(100vh - 4rem); background-color: $mainBgColor; position: relative;
    .items{
      background-color: $lightColor;
      &>li{
        display: block; line-height: 3rem; padding: .5rem 1rem; border-bottom: 1px solid $borderColor;
        h4{font-weight: 500; font-size: 1.5rem;}
      }
    }
    .subItems{
      padding-bottom: 1rem;
      &>li{
        display: inline-block; margin-bottom: .5rem; width: calc(calc(100vw - 4rem)/3); text-align: center; border: 1px solid $borderColor; border-radius: 4px; padding: 0 .5rem; height: 2.5rem; line-height: 2.5rem;
      }
      &>li:nth-child(3n + 1){margin-right: 1rem;}
      &>li:nth-child(3n + 2){margin-right: 1rem;}
    }
    .subItemsActive{color: $mainColor;}
    button{display: block; border: none; background-color: $mainColor; border-radius: .4rem; width: 94vw; height: 4rem; line-height: 4rem; font-family: "Microsoft YaHei"; font-size: 1.8rem; color: $lightColor; position: absolute; left: 3vw; bottom: 4rem;}
  }
}
</style>
