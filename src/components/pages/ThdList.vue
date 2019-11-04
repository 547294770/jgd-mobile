<template>
    <div>
        <Header></Header>
        <div class="mui-content">
            <div class="mui-card">
              <ul class="mui-table-view">
                <li v-for="(item,index) in items" @click="info(item)" class="mui-table-view-cell" :key="index">
                  <a class="mui-navigate-right" href="javascript:;">
                    提货单号：{{ item.OrderNo }}</a>
                </li>
              </ul>
            </div>
            <div class="mui-content-padded">
                <ul class="mui-pager">
                    <li>
                        <a href="#">
                            上一页
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            下一页
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>

import Header from '../Header'
import Footer from '../Footer'
import '../../../static/css/mui.min.css'
import '../../../static/css/font-awesome.min.css'
import '../../../static/css/font-awesome.padding.css'
import axios from 'axios'
export default {
  name: 'JgdList',
  components: {
    Header,
    Footer
  },
  data () {
    return { items: [] }
  },
  created: function () {
    this.GLOBAL.HeaderText = '提货单列表'
    this.loadData()
  },
  methods: {
    loadData: function () {
      var _this = this
      _this.$loading('加载中...')
      axios.get('/handler/user/pickuporder/list', {})
        .then(function (res) {
          console.log(res)
          console.log(_this)
          _this.items = res.data.data
          _this.$loading.close()
        })
        .catch(function (error) {
          console.log(error)
          _this.$loading.close()
        })
    },
    info (item) {
      // console.log('item:' + item.OrderNo)
      this.$router.push({
        name: 'PagesThdInfo',
        params: item
      })
    }
  }
}
</script>
<style scoped>

</style>
