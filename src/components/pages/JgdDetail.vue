<template>
    <div>
        <Header></Header>
          <div class="mui-card mt60">
            <!--页眉，放置标题-->
            <div class="mui-card-header">加工单信息</div>
            <!--内容区-->
            <div class="mui-card-content">
              <div class="detail">
                <p><b>加工单号：</b><span>{{OrderNo}}</span></p>
                <p><b>下单时间：</b><span>{{CreateAt}}</span></p>
                <p><b>送货方式：</b><span>{{DelType}}</span></p>
                <p v-if="Content!==''"><b>加工内容：</b><span>{{Content}}</span></p>
                <p v-if="Pic!==''"><b>上传截图：</b><a v-bind:href="Pic" target="_blank">{{Pic}}</a></p>
              </div>
            </div>
          </div>
          <div v-if="AttachmentList.length > 0" class="mui-card">
            <!--页眉，放置标题-->
            <div class="mui-card-header">附件信息</div>
            <!--内容区-->
            <div class="mui-card-content">
              <div class="detail">
                <ul>
                  <li v-for="(item,index) in AttachmentList" :key="index">
                    <a v-bind:href="item.FilePath" target="_blank">{{index}}.{{item.Name}}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div v-if="DeliveryList.length > 0" class="mui-card">
            <!--页眉，放置标题-->
            <div class="mui-card-header">送货单</div>
            <!--内容区-->
            <div class="mui-card-content">
                <ul class="mui-table-view">
                  <li v-for="(item,index) in DeliveryList" @click="goshdinfo(item)" class="mui-table-view-cell" :key="index">
                    <a class="mui-navigate-right" href="javascript:;">
                      送货单号：{{ item.OrderNo }}</a>
                </li>
              </ul>
            </div>
          </div>
          <div v-if="PickUpList.length > 0" class="mui-card">
            <!--页眉，放置标题-->
            <div class="mui-card-header">提货单</div>
            <!--内容区-->
            <div class="mui-card-content">
                <ul class="mui-table-view">
                  <li v-for="(item,index) in PickUpList" @click="gothdinfo(item)" class="mui-table-view-cell" :key="index">
                    <a class="mui-navigate-right" href="javascript:;">
                      提货单号：{{ item.OrderNo }}</a>
                </li>
              </ul>
            </div>
          </div>
          <div v-if="FeeList.length > 0" class="mui-card mb60">
            <!--页眉，放置标题-->
            <div class="mui-card-header">加工费</div>
            <!--内容区-->
            <div class="mui-card-content">
              <div class="detail">
                <div v-for="(item,index) in FeeList" :key="index">
                  <div>{{item.TypeName}}</div>
                  <div>{{item.Content}}</div>
                </div>
              </div>
            </div>
          </div>
        <Footer></Footer>
    </div>
</template>
<script>

import Header from '../Header'
import Footer from '../Footer'
import '../../../static/css/mui.min.css'
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'JgdAdd',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      OrderID: '',
      OrderNo: '',
      CreateAt: '',
      Content: '',
      Pic: '',
      Status: 0,
      DelType: 'None',
      PickType: 'None',
      AttachmentList: [],
      FeeList: [],
      DeliveryList: [],
      PickUpList: []
    }
  },
  created: function () {
    this.GLOBAL.HeaderText = '加工单明细'
    this.initPageData()
    this.loadattachment()
    this.loadfee()
  },
  methods: {
    initPageData: function () {
      let params = this.$route.params
      var _this = this
      _this.$loading('加载中')
      axios.post('/handler/user/processingorder/info', qs.stringify({
        OrderID: params.ID
      })).then(function (res) {
        for (const key in res.data.data) {
          if (res.data.data.hasOwnProperty(key)) {
            _this[key] = res.data.data[key]
            console.log(key + ':' + res.data.data[key])
          }
        }
        _this.$loading.close()
      }).catch(function (error) {
        console.log(error)
        _this.$loading.close()
      })
    },
    goshdinfo (item) {
      // console.log('item:' + item.OrderNo)
      this.$router.push({
        name: 'PagesShdInfo',
        params: item
      })
    },
    gothdinfo (item) {
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
.mt60{
  margin-top: 60px
}
.mb60{
  margin-bottom: 60px
}
.mt10{
  margin-top: 10px
}
.detail{
  padding: 10px 15px;
}
.mui-content-padded{
  margin-bottom: 60px;
}
.jgd-info-delete{
  margin-top: 10px;
}
</style>
