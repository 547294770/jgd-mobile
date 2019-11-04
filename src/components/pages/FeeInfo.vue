<template>
    <div>
        <Header></Header>
          <div class="mui-card mt60">
            <!--内容区-->
            <div class="mui-card-content">
              <div class="detail">
                <p><b>单号：</b><span>{{FeeNo}}</span></p>
                <p><b>加工单：</b><span>{{ProcessingNo}}</span></p>
                <p><b>创建时间：</b><span>{{CreateAt}}</span></p>
                <p><b>费用明细：</b><span>{{Content}}</span></p>
                <p><b>费用类型：</b><span>{{TypeName}}</span></p>
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
  name: 'FeeInfo',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      Content: '',
      CreateAt: '',
      FeeNo: '',
      ProcessingNo: '',
      TypeName: '',
      SourceID: ''
    }
  },
  created: function () {
    this.GLOBAL.HeaderText = '加工费明细'
    this.initPageData()
  },
  methods: {
    initPageData: function () {
      let params = this.$route.params
      var _this = this
      _this.$loading('加载中')
      axios.post('/handler/user/rocessingfee/info', qs.stringify({
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
