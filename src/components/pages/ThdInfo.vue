<template>
    <div>
        <Header></Header>
          <div class="mui-card mt60">
            <!--内容区-->
            <div class="mui-card-content">
              <div class="detail">
                <p><b>单号：</b><span>{{OrderNo}}</span></p>
                <p><b>加工单：</b><span>{{ProcessingNo}}</span></p>
                <p><b>提货日期：</b><span>{{PickUpAt}}</span></p>
                <p><b>提货内容：</b><span>{{Content}}</span></p>
                <p><b>车辆信息：</b><span>{{VehicleInfo}}</span></p>
                <p><b>提货方式：</b><span>{{TypeName}}</span></p>
                <p v-if="item.Pic"><b>上传图片：</b><vue-preview :slides="[{src: Pic,msrc: Pic,w: 600,h: 400}]" @click="closeHandle"></vue-preview></p>
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
  name: 'ThdInfo',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      Content: '',
      VehicleInfo: '',
      OrderNo: '',
      ProcessingNo: '',
      TypeName: '',
      SourceID: '',
      PickUpAt: '',
      Pic: ''
    }
  },
  created: function () {
    this.GLOBAL.HeaderText = '提货单明细'
    this.initPageData()
  },
  methods: {
    initPageData: function () {
      let params = this.$route.query
      var _this = this
      _this.$loading('加载中')
      axios.post('/handler/user/pickuporder/info', qs.stringify({
        ID: params.ID
      })).then(function (res) {
        for (const key in res.data.data) {
          if (res.data.data.hasOwnProperty(key)) {
            _this[key] = res.data.data[key]
            console.log(res.data.data[key])
          }
        }
        _this.$loading.close()
      }).catch(function (error) {
        console.log(error)
        _this.$loading.close()
      })
    },
    closeHandle: function () {
      console.log('999999999999999....')
    }
  }
}
</script>
<style scoped>
.mt60{
  margin-top: 60px
}
.detail{
  padding: 10px 15px;
}
.mui-content-padded{
  margin-bottom: 60px;
}
</style>
