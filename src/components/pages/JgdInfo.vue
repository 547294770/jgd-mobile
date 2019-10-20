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
              <h5>送货方式：</h5>
              <div class="mui-input-row"><p>{{DelType}}</p></div>
            <h5>加工内容：</h5>
            <div class="mui-input-row">
              <p>{{Content}}</p>
            </div>
            <h5>附件：</h5>
            <ul>
              <li v-for="(item,index) in Attachment" :key="index">
                <a v-bind:href="item.FilePath" target="_blank">{{index}}.{{item.Name}}</a>
              </li>
            </ul>
            <div v-if="Status=='Uploaded'">
              <input type="file" ref="fileInt"><button @click="changeHandle">上传</button>
            </div>
            <div v-if="Status=='Print'">
              <div class="mui-input-row mui-radio">
                <label>自送</label>
                <input name="DelType" v-model="DelType" value="Self" type="radio">
              </div>
              <div class="mui-input-row mui-radio">
                <label>利迅达提货</label>
                <input name="DelType" v-model="DelType" value="LXD" type="radio">
              </div>
            </div>
            <div v-if="Status=='ConfirmDeliveryMethod'">
              <div v-if="DelType=='Self'">
                <h5>送货日期：</h5><input type="date" v-model="Delivery.DeliveryAt"  />
                <h5>材料内容：</h5>
                <div class="mui-input-row" style="margin: 10px 5px;">
                  <textarea id="textarea" v-model="Delivery.Content" rows="4" placeholder="填写材料内容说明。"></textarea>
                </div>
                <h5>车辆信息：</h5>
                <div class="mui-input-row" style="margin: 10px 5px;">
                  <textarea id="textarea1"  v-model="Delivery.VehicleInfo" rows="2" placeholder="车牌、送货人联系方式、姓名等。"></textarea>
                </div>
              </div>
            </div>
            <div class="mui-content-padded">
              <a v-if="Status=='None'" href="#" @click="saveOrder(ID)" class="mui-btn mui-btn-primary">提交</a>
              <a v-if="Status=='Uploaded'" href="#" @click="saveOrder(ID)" class="mui-btn mui-btn-primary">提交确认</a>
              <a v-if="Status=='Print'" href="#" @click="saveOrder(ID)" class="mui-btn mui-btn-success">确认送货方式</a>
              <a v-if="Status=='ConfirmDeliveryMethod'" href="#" @click="saveOrder(ID)" class="mui-btn mui-btn-success">提交送货资料</a>
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
      OrderID: '',
      OrderNo: '',
      CreateAt: '',
      Content: '',
      Status: 0,
      DelType: 'None',
      Attachment: [],
      Delivery: {
        Content: '',
        VehicleInfo: '',
        SourceID: '',
        DeliveryAt: ''
      }
    }
  },
  created: function () {
    this.GLOBAL.HeaderText = '加工单明细'
    this.initPageData()
    this.loadattachment()
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
    loadattachment () {
      let params = this.$route.params
      var _this = this
      axios.post('/handler/user/processingorder/attachment', qs.stringify({
        OrderID: params.ID
      })).then(function (res) {
        _this.Attachment = []
        for (var index = 0; index < res.data.data.length; index++) {
          _this.Attachment[index] = res.data.data[index]
        }
        console.log('_this.Attachment.length :' + _this.Attachment.length)
        // for (const key in res.data.data) {
        //   if (res.data.data.hasOwnProperty(key)) {
        //     _this.Attachment[key] = res.data.data[key]
        //     console.log(res.data.data[key])
        //   }
        // }
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
        OrderID: orderid,
        DelType: _this.DelType,
        AttachmentLength: _this.Attachment.length,
        Attachment: _this.Attachment,
        Delivery: _this.Delivery
      })).then(function (res) {
        _this.$toast.bottom(res.data.msg)
        _this.$loading.close()
        _this.$router.push({
          path: '/JgdList'
        })
      }).catch(function (error) {
        console.log(error)
        _this.$loading.close()
      })
    },
    changeHandle () {
      var _this = this
      _this.$loading('正在上传')
      const file = this.$refs.fileInt.files[0]
      console.log(file)
      const data = new FormData()
      data.append('file', file)
      axios.post('/handler/user/upload/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        console.log(res)
        _this.Attachment.push({
          SourceID: _this.OrderID,
          FileSize: res.data.data.size,
          FilePath: res.data.data.src,
          FileName: res.data.data.file,
          Name: res.data.data.name})
        _this.$toast.bottom(res.data.msg)
        _this.$loading.close()
      }).catch(err => {
        console.log(err)
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
.mui-content-padded{
  margin-bottom: 60px;
}
</style>
