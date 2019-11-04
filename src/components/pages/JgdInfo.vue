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
                <p><b>加工内容：</b><span>{{Content}}</span></p>
              </div>
            </div>
          </div>
          <div v-if="Attachment.length > 0" class="mui-card">
            <!--页眉，放置标题-->
            <div class="mui-card-header">附件信息</div>
            <!--内容区-->
            <div class="mui-card-content">
              <div class="detail">
                <ul>
                  <li v-for="(item,index) in Attachment" :key="index">
                    <a v-bind:href="item.FilePath" target="_blank">{{index}}.{{item.Name}}</a>
                  </li>
                </ul>
                <div v-if="Status=='Uploaded'">
                  <input type="file" ref="fileInt"><button @click="changeHandle">上传</button>
                </div>
              </div>
            </div>
          </div>
          <div v-if="Fee.length > 0" class="mui-card">
            <!--页眉，放置标题-->
            <div class="mui-card-header">加工费</div>
            <!--内容区-->
            <div class="mui-card-content">
              <div class="detail">
                <div v-for="(item,index) in Fee" :key="index">
                  <div>{{item.TypeName}}</div>
                  <div>{{item.Content}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="mui-card">
            <!--内容区-->
            <div class="mui-card-content">
              <div class="detail">
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
                <div v-if="Status=='NoticePickUp'">
                  <div v-if="DelType=='Self'">
                    <h5>提货日期：</h5><input type="date" v-model="PickUp.PickUpAt"  />
                    <h5>提货内容：</h5>
                    <div class="mui-input-row" style="margin: 10px 5px;">
                      <textarea id="textarea" v-model="PickUp.Content" rows="4" placeholder="填写提货内容说明。"></textarea>
                    </div>
                    <h5>车辆信息：</h5>
                    <div class="mui-input-row" style="margin: 10px 5px;">
                      <textarea id="textarea1"  v-model="PickUp.VehicleInfo" rows="2" placeholder="车牌、提货人联系方式、姓名等。"></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mui-content-padded">
            <a v-if="Status=='None'" href="#" @click="saveOrder(ID)" class="btn btn-primary block">提交</a>
            <a v-if="Status=='Uploaded'" href="#" @click="saveOrder(ID)" class="btn btn-primary block">提交确认</a>
            <a v-if="Status=='Print'" href="#" @click="saveOrder(ID)" class="btn btn-primary block">确认送货方式</a>
            <a v-if="Status=='ConfirmDeliveryMethod'" href="#" @click="saveOrder(ID)" class="btn btn-primary block">提交送货资料</a>
            <a v-if="Status=='NoticePickUp'" href="#" @click="saveOrder(ID)" class="btn btn-primary block">提交提货资料</a>
            <a v-if="Status=='Produced'" href="#" @click="saveOrder(ID)" class="btn btn-primary block">填写提货单</a>
            <a v-if="Status=='AlreadyGoods'" href="#" @click="saveOrder(ID)" class="btn btn-primary block">确认加工费</a>
            <a v-if="Status=='Shipped'" href="#" @click="saveOrder(ID)" class="btn btn-primary block">确认收货</a>
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
      Fee: [],
      Delivery: {
        Content: '',
        VehicleInfo: '',
        SourceID: '',
        DeliveryAt: ''
      },
      PickUp: {
        Content: '',
        VehicleInfo: '',
        SourceID: '',
        PickUpAt: ''
      }
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
    loadfee () {
      let params = this.$route.params
      var _this = this
      axios.post('/handler/user/processingorder/fee', qs.stringify({
        OrderID: params.ID
      })).then(function (res) {
        _this.Fee = []
        for (var index = 0; index < res.data.data.length; index++) {
          _this.Fee[index] = res.data.data[index]
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
        OrderID: orderid,
        DelType: _this.DelType,
        AttachmentLength: _this.Attachment.length,
        Attachment: _this.Attachment,
        Delivery: _this.Delivery,
        PickUp: _this.PickUp
      })).then(function (res) {
        _this.$toast.bottom(res.data.msg)
        _this.$loading.close()
        _this.$router.push({
          path: '/Pages/JgdList'
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
.detail{
  padding: 10px 15px;
}
.mui-content-padded{
  margin-bottom: 60px;
}
</style>
