<template>
    <div>
        <Header></Header>
          <scroller :on-refresh='refresh' :on-infinite='infinite' ref="listScroller" class="padding">
            <div class="mui-content">
              <div class="mui-card mui-content-padded" id="container-jgd-list">
                <ul class="mui-table-view">
                  <li v-for="(item,index) in items" @click="jgdDetail(item)" class="mui-table-view-cell" :key="index">
                    <a class="mui-navigate-right" href="javascript:;">单号：{{ item.OrderNo }}
                      <span class="mui-badge mui-badge-primary">{{item.StatusName}}</span>
                    </a>
                  </li>
                </ul>
              </div>
          </div>
          </scroller>
        <Footer></Footer>
    </div>
</template>
<script>

import Vue from 'vue'
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
    return {
      noData: false,
      items: [],
      pageIndex: 0,
      pageSize: 20
    }
  },
  created: function () {
    this.GLOBAL.HeaderText = '加工单列表'
  },
  mounted: function () {
    console.log('mounted....')
  },
  methods: {
    loadData: function (done) {
      var _this = this
      axios.post('/handler/user/processingorder/list', `page=${_this.pageIndex}&size=${_this.pageSize}`)
        .then(function (res) {
          if (res.data.code === 0) {
            _this.noData = res.data.data.lastPage
            if (_this.pageIndex <= 1) {
              _this.items = res.data.data.data
            } else {
              _this.items = _this.items.concat(res.data.data.data)
            }
          }
          if (_this.noData && done.name == 'bound finishInfinite') {
            done(_this.noData)
          }else{
            done()
          }
        })
        .catch(function (error) {
          done()
          console.log(error)
        })
    },
    refresh (done) {
      this.pageIndex = 1
      setTimeout(() => {
        this.loadData(done)
      }, 1500)
    },
    infinite (done) {
      this.pageIndex++
      setTimeout(() => {
        this.loadData(done)
      }, 1500)
    },
    jgdDetail (item) {
      // console.log('item:' + item.OrderNo)
      this.$router.push({
        name: 'PagesJgdDetail',
        params: item
      })
    }
  }
}
</script>
<style scoped>
  .padding {
    padding-top:40px;
    padding-bottom: 0px;
  }
</style>
