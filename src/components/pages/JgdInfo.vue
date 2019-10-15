<template>
    <div>
        <Header></Header>
          <div class="mui-content-padded mt60">
              <h5>加工单号：</h5>
              <div class="mui-input-row">
                <h4>{{OrderNo}}</h4>
              </div>
              <h5>下单时间：</h5>
              <div class="mui-input-row"><p>{{CreateAt}}</p></div>
            <h5>加工内容：</h5>
            <div class="mui-input-row">
              <p>{{Content}}</p>
            </div>
            <h5>附件：</h5>
            <div class="mui-content-padded">
              <a v-if="Status=='None'" href="#" @click="saveOrder(ID)" class="mui-btn mui-btn-primary">提交</a>
              <a v-if="Status=='Uploaded'" href="#" @click="saveOrder(ID)" class="mui-btn mui-btn-primary">提交确认</a>
              <a v-if="Status=='Print'" href="#" @click="saveOrder(ID)" class="mui-btn mui-btn-success">填写送货单</a>
              <a v-if="Status=='Produced'" href="#" @click="saveOrder(ID)" class="mui-btn mui-btn-success">填写提货单</a>
              <a v-if="Status=='AlreadyGoods'" href="#" @click="saveOrder(ID)" class="mui-btn mui-btn-success">确认加工费</a>
              <a v-if="Status=='Shipped'" href="#" @click="saveOrder(ID)" class="mui-btn mui-btn-success">确认完成</a>
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
      OrderNo: '',
      CreateAt: '',
      Content: '',
      Status: 0
    }
  },
  created: function () {
    this.GLOBAL.HeaderText = '加工单明细'
    this.initPageData()
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
            console.log(res.data.data[key])
          }
        }
        _this.$loading.close()
      }).catch(function (error) {
        console.log(error)
        _this.$loading.close()
      })
    },
    saveOrder (orderid) {
      var _this = this
      _this.$loading('正在提交')
      axios.post('/handler/user/processingorder/exeorder', qs.stringify({
        OrderID: orderid
      })).then(function (res) {
        _this.$toast.bottom(res.data.msg)
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
</style>
