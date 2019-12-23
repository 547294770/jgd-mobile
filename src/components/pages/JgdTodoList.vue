<template>
    <div>
        <Header ref="header"></Header>
        <div class="mui-content">
          <scroller :on-refresh='refresh' :on-infinite='infinite' ref="todolistScroller" class="padding">
            <div class="mui-card" id="container-jgd-list">
              <ul class="mui-table-view">
                <li v-for="(item,index) in items" @click="jgdInfo(item)" class="mui-table-view-cell" :key="index">
                  <a class="mui-navigate-right" href="javascript:;">
                    <span v-if="item.Status=='None'" class="mui-badge mui-badge-primary">草稿</span>
                    <span v-if="item.Status=='Processing'" class="mui-badge mui-badge-primary">待确认送货方式</span>
                    <span v-if="item.Status=='Uploaded'" class="mui-badge mui-badge-primary">待确认加工内容</span>
                    <!-- <span v-if="item.Status=='Print'" class="mui-badge mui-badge-primary">待确认送货方式</span> -->
                    <span v-if="item.Status=='ConfirmDeliveryMethod'" class="mui-badge mui-badge-primary">待录入送货资料</span>
                    <span v-if="item.Status=='NoticePickUp'" class="mui-badge mui-badge-primary">待确认提货方式</span>
                    <span v-if="item.Status=='ConfirmPickUpMethod'" class="mui-badge mui-badge-primary">待录入提货信息</span>
                    <span v-if="item.Status=='AlreadyGoods'" class="mui-badge mui-badge-primary">待确认加工费</span>
                    <span v-if="item.Status=='Shipped'" class="mui-badge mui-badge-primary">待确认收货</span>
                    单号：{{ item.OrderNo }}</a>
                </li>
              </ul>
            </div>
          </scroller>
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
  name: 'JgdTodoList',
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
    this.GLOBAL.HeaderText = '加工单待办列表'
  },
  mounted: function () {
    console.log('mounted....')
    // this.loadData()
    this.$refs.header.setRightButtonCss('fa fa-edit fa-lg')
    this.$refs.header.setRightButtonClick(function () {
      this.$router.push({
        path: '/Pages/JgdAdd',
        query: {}
      })
    })
    // console.log('rightbuttoncss...:'+this.$$refs.rightbuttoncss)
  },
  methods: {
    loadData: function (done) {
      var _this = this
      axios.post('/handler/user/processingorder/todolist', `page=${_this.pageIndex}&size=${_this.pageSize}`)
        .then(function (res) {
          if (res.data.code === 0) {
            _this.noData = res.data.data.lastPage
            if (_this.pageIndex <= 1) {
              _this.items = res.data.data.data
            } else {
              _this.items = _this.items.concat(res.data.data.data)
            }
          }
          if (done) {
            if (_this.noData && done.name == 'bound finishInfinite') {
              done(_this.noData)
            } else {
              done()
            }
          }
        })
        .catch(function (error) {
          if (done) {
            done()
          }
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
    jgdInfo (item) {
      // console.log('item:' + item.OrderNo)
      // this.$router.push({
      //   name: 'PagesJgdInfo',
      //   params: item
      // })
      this.$router.push({
        path: '/Pages/JgdInfo',
        query: { ID: item.ID }
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
