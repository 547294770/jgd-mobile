<template>
    <div>
        <Header></Header>
        <div class="mui-content">
            <div class="mui-content-padded">
              <a class="btn btn-primary block" @click="jgdadd">
  <i class="fa fa-edit fa-lg"></i> 填写加工单</a>
            </div>
            <div class="mui-card" id="container-jgd-list">
              <ul class="mui-table-view">
                <li v-for="(item,index) in items" @click="jgdInfo(item)" class="mui-table-view-cell" :key="index">
                  <a class="mui-navigate-right" href="javascript:;">
                    <span v-if="item.Status=='None'" class="mui-badge mui-badge-primary">待提交</span>
                    <span v-if="item.Status=='Uploaded'" class="mui-badge mui-badge-primary">待确认加工内容</span>
                    <span v-if="item.Status=='Print'" class="mui-badge mui-badge-primary">待确认送货方式</span>
                    <span v-if="item.Status=='ConfirmDeliveryMethod'" class="mui-badge mui-badge-primary">待录入送货资料</span>
                    <span v-if="item.Status=='NoticePickUp'" class="mui-badge mui-badge-primary">待提交提货信息</span>
                    <span v-if="item.Status=='AlreadyGoods'" class="mui-badge mui-badge-primary">待确认加工费</span>
                    <span v-if="item.Status=='Shipped'" class="mui-badge mui-badge-primary">待确认收货</span>
                    单号：{{ item.OrderNo }}</a>
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
    this.GLOBAL.HeaderText = '加工单列表'
    this.loadData()
  },
  methods: {
    loadData: function () {
      var _this = this
      _this.$loading('加载中...')
      axios.get('/handler/user/processingorder/list', {})
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
    jgdadd () {
      this.$router.push({
        path: '/JgdAdd',
        query: {
          id: 123
        }
      })
    },
    jgdInfo (item) {
      // console.log('item:' + item.OrderNo)
      this.$router.push({
        name: 'JgdInfo',
        params: item
      })
    }
  }
}
</script>
<style scoped>

</style>
