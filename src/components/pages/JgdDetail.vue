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
                <p><b>订单状态：</b><span>{{StatusName}}</span></p>
                <p><b>送货方式：</b><span>{{DelTypeName}}</span></p>
                <p><b>提货方式：</b><span>{{PickTypeName}}</span></p>
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
              <vue-preview :slides="Attachment" @click="closeHandle"></vue-preview>
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
          <div v-if="IsSelf" class="mui-content-padded">
            <a v-if="Status==='None'||Status==='Processing'" v-bind:href='EditUrl+ID' class="btn btn-primary block mt10">修改</a>
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
  name: 'JgdDetail',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      EditUrl: '#/Pages/JgdEdit?ID=',
      OrderID: '',
      OrderNo: '',
      CreateAt: '',
      Content: '',
      Attachment: [],
      AttachmentList: [],
      IsSelf: false,
      Pic: '',
      StatusName: '未指定',
      DelTypeName: '未指定',
      PickTypeName: '未指定',
      ID: '',
      DelType: 'None',
      PickType: 'None',
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
      let params = this.$route.query
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
        _this.Attachment = []
        _this.AttachmentList.forEach(p=>{
          _this.Attachment.push({
            src: p.FilePath,
            msrc: p.FilePath,
            w: 600,
            h: 400
          })
        })
        _this.$loading.close()
      }).catch(function (error) {
        console.log(error)
        _this.$loading.close()
      })
    },
    goshdinfo (item) {
      // console.log('item:' + item.OrderNo)
      this.$router.push({
        path: '/Pages/ShdInfo',
        query: { ID: item.ID }
      })
    },
    gothdinfo (item) {
      // console.log('item:' + item.OrderNo)
      this.$router.push({
        path: '/Pages/ThdInfo',
        query: { ID: item.ID }
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
