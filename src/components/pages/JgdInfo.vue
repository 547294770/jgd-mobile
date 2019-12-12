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
                <p v-if="Pic!==''"><b>加工截图：</b>
                <vue-preview :slides="[{src: Pic,msrc: Pic,w: 600,h: 400}]" @click="closeHandle"></vue-preview>
                </p>
              </div>
            </div>
          </div>
          <div v-if="AttachmentList.length > 0" class="mui-card">
            <!--页眉，放置标题-->
            <div class="mui-card-header">加工单内容</div>
            <!--内容区-->
            <div class="mui-card-content">
              <vue-preview :slides="Attachment" @click="closeHandle"></vue-preview>
              <!-- <div class="detail">
                <div v-if="Status=='Uploaded'">
                  <input type="file" ref="fileInt"><button @click="changeHandle">上传</button>
                </div>
              </div> -->
            </div>
          </div>
          <div v-if="DeliveryList.length > 0" class="mui-card">
            <!--页眉，放置标题-->
            <div class="mui-card-header">送材料信息</div>
            <!--内容区-->
            <div class="mui-card-content">
              <div class="detail">
                <div v-for="(item,index) in DeliveryList" :key="index">
                  <div>送货类型：{{item.TypeName}}</div>
                  <div>送货日期：{{item.DeliveryAt}}</div>
                  <div>时 间 段：{{item.TimeSection}}</div>
                  <div>材料内容：{{item.Content}}</div>
                  <div>车辆信息：{{item.VehicleInfo}}</div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="PickUpList.length > 0" class="mui-card">
            <!--页眉，放置标题-->
            <div class="mui-card-header">提货信息</div>
            <!--内容区-->
            <div class="mui-card-content">
              <div class="detail">
                <div v-for="(item,index) in PickUpList" :key="index">
                  <div>提货类型：{{item.TypeName}}</div>
                  <div>提货日期：{{item.PickUpAt}}</div>
                  <div>时 间 段：{{item.TimeSection}}</div>
                  <div>提货内容：{{item.Content}}</div>
                  <div>车辆信息：{{item.VehicleInfo}}</div>
                  <div v-if="item.Pic">图   片：<vue-preview :slides="[{src: item.Pic,msrc: item.Pic,w: 600,h: 400}]" @click="closeHandle"></vue-preview></div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="FeeList.length > 0" class="mui-card">
            <!--页眉，放置标题-->
            <div class="mui-card-header">加工费</div>
            <!--内容区-->
            <div class="mui-card-content">
              <div class="detail">
                <div v-for="(item,index) in FeeList" :key="index">
                  <div>单号：{{item.FeeNo}}</div>
                  <div>类型：{{item.TypeName}}</div>
                  <div>图片：<img v-if="item.Pic" :src="item.Pic" style="width:80px"></div>
                  <div>明细：{{item.Content}}</div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="Status=='Print'||Status=='NoticePickUp'||Status=='ConfirmDeliveryMethod'||Status=='ConfirmPickUpMethod'" class="mui-card">
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
                  <div class="mui-input-row mui-radio">
                    <label>材料在利迅达仓库</label>
                    <input name="DelType" v-model="DelType" value="IsWareHouse" type="radio">
                  </div>
                </div>
                <div v-if="Status=='NoticePickUp'">
                  <div class="mui-input-row mui-radio">
                    <label>自提</label>
                    <input name="DelType" v-model="PickType" value="Self" type="radio">
                  </div>
                  <div class="mui-input-row mui-radio">
                    <label>利迅达送货</label>
                    <input name="DelType" v-model="PickType" value="LXD" type="radio">
                  </div>
                </div>
                <div v-if="Status=='ConfirmDeliveryMethod'">
                  <div v-if="DelType=='Self'">
                    <h5>送货日期：</h5><input type="date" v-model="Delivery.DeliveryAt"  />
                    <h5>时间段：</h5><input type="time" style="width:45%" placeholder="08:00" v-model="Delivery.Time1"  />-<input type="time" style="width:45%" placeholder="08:00" v-model="Delivery.Time2"  />
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
                <div v-if="Status=='ConfirmPickUpMethod'">
                  <div v-if="PickType=='Self'">
                    <h5>提货日期：</h5><input type="date" v-model="PickUp.PickUpAt"  />
                    <h5>时间段：</h5><input type="time" style="width:45%" placeholder="08:00" v-model="PickUp.Time1"  />-<input type="time" style="width:45%" placeholder="08:00" v-model="PickUp.Time2"  />
                    <h5>提货内容：</h5>
                    <div class="mui-input-row" style="margin: 10px 5px;">
                      <textarea id="textarea" v-model="PickUp.Content" rows="4" placeholder="填写提货内容说明。"></textarea>
                    </div>
                    <h5>车辆信息：</h5>
                    <div class="mui-input-row" style="margin: 10px 5px;">
                      <textarea id="textarea1"  v-model="PickUp.VehicleInfo" rows="2" placeholder="车牌、提货人联系方式、姓名等。"></textarea>
                    </div>
                    <h5>上传图片：</h5>
                    <div class="mui-input-row"><a v-if="PickUp.Pic" v-bind:href="PickUp.Pic" target="_blank">查看</a></div>
                    <div class="mui-input-row upload-area">
                      <div class="file"><input type="file" ref="filePickUp"></div>
                      <div class="button"><button @click="changeHandle('Pickup')">上传</button></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="Status=='Uploaded'||Status=='AlreadyGoods'||Status=='NoticePickUp'" class="mui-card">
            <div class="mui-card-content">
              <div class="detail">
                <p class="pmb0"><b>密码：</b><input type="password" v-model="PassWord" class="password"  /></p>
              </div>
            </div>
          </div>
          <div class="mui-content-padded button-list">
            <a v-if="Status=='None'" href="#" @click="saveOrder(ID)" class="btn btn-primary block">提交</a>
            <a v-if="Status=='None'" v-bind:href='EditUrl+ID' class="btn btn-primary block mt10">修改</a>
            <a v-if="Status=='None'" href="#" @click="deleteOrder(ID)" class="btn btn-danger block mt10">删除</a>
            <a v-if="Status=='Uploaded'" href="#" @click="saveOrder(ID)" class="btn btn-primary block">提交确认</a>
            <a v-if="Status=='Print'" href="#" @click="saveOrder(ID)" class="btn btn-primary block">确认送货方式</a>
            <a v-if="Status=='ConfirmDeliveryMethod'" href="#" @click="saveOrder(ID)" class="btn btn-primary block">提交送货资料</a>
            <a v-if="Status=='NoticePickUp'" href="#" @click="saveOrder(ID)" class="btn btn-primary block">确认提货方式</a>
            <a v-if="Status=='ConfirmPickUpMethod'" href="#" @click="saveOrder(ID)" class="btn btn-primary block">提交提货资料</a>
            <a v-if="Status=='Produced'" href="#" @click="saveOrder(ID)" class="btn btn-primary block">填写提货单</a>
            <a v-if="Status=='AlreadyGoods'" href="#" @click="saveOrder(ID)" class="btn btn-primary block">确认加工费</a>
            <!-- <a v-if="Status=='Shipped'" href="#" @click="saveOrder(ID)" class="btn btn-primary block">确认收货</a> -->
            <a v-if="!IsReject" :href="'#/Pages/RejectAdd?OrderID='+OrderID" class="btn btn-danger block">错误驳回</a>
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
      PassWord: '',
      IsUpload:0,
      EditUrl: '#/Pages/JgdEdit?ID=',
      OrderID: '',
      OrderNo: '',
      CreateAt: '',
      Content: '',
      IsReject: false,
      Pic: '',
      Status: 'None',
      StatusName: '未指定',
      DelTypeName: '未指定',
      PickTypeName: '未指定',
      ID: '',
      DelType: 'None',
      PickType: 'None',
      Attachment: [],
      AttachmentList: [],
      FeeList: [],
      DeliveryList: [],
      PickUpList: [],
      Delivery: {
        Content: '',
        VehicleInfo: '',
        SourceID: '',
        DeliveryAt: '',
        Time1: '09:30',
        Time2: '18:30'
      },
      PickUp: {
        Content: '',
        VehicleInfo: '',
        SourceID: '',
        PickUpAt: '',
        Time1: '09:30',
        Time2: '18:30',
        Pic: ''
      }
    }
  },
  created: function () {
    this.GLOBAL.HeaderText = '加工单明细'
    this.initPageData()
  },
  inject: ['reload'],
  methods: {
    initPageData: function () {
      let params = this.$route.query
      var _this = this
      _this.OrderID = params.ID
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
    saveOrder (orderid) {
      var _this = this
      // if(this.Status === 'Uploaded' && !this.IsUpload && !confirm('未确认上传附件，确认要提交吗？')){
      //   return false;
      // }

      _this.$loading('正在提交')
      axios.post('/handler/user/processingorder/exeorder', qs.stringify({
        OrderID: orderid,
        DelType: _this.DelType,
        PickType: _this.PickType,
        AttachmentLength: _this.AttachmentList.length,
        Attachment: _this.AttachmentList,
        Delivery: _this.Delivery,
        PickUp: _this.PickUp,
        PassWord: _this.PassWord
      })).then(function (res) {
        if (res.data.code === 0) {
          if (res.data.data.Status === 'Print' || (res.data.data.Status === 'ConfirmDeliveryMethod' && res.data.data.DelType === 'Self')|| (res.data.data.Status === 'ConfirmPickUpMethod' && res.data.data.PickType === 'Self')) {
            // path = '/Pages/JgdInfo'
            // query = { ID: _this.ID }
            _this.reload()
            console.log('res.data.data.Status======' + res.data.data.Status)
            console.log('_this.reload======' + _this.reload)
          } else {
            _this.$router.push({
              path: '/Pages/JgdTodoList',
              query: {}
            })
          }
        }
        _this.$loading.close()
        _this.$toast.bottom(res.data.msg)
      }).catch(function (error) {
        console.log(error)
        _this.$loading.close()
      })
    },
    deleteOrder (orderid) {
      var _this = this
      _this.$loading('正在提交')
      axios.post('/handler/user/processingorder/delete', qs.stringify({
        ID: orderid
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
    changeHandle (type) {
      var _this = this
      _this.$loading('正在上传')
      console.log('9999999999999999999999999----')
      let file = this.$refs.filePickUp.files[0]
     
      console.log(file)
      const data = new FormData()
      data.append('file', file)
      data.append('waterflag',this.Status=='Uploaded'?'1':'0')
      axios.post('/handler/user/upload/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        console.log(res)
        _this.PickUp.Pic = res.data.data.src
        // if(type === 'Pickup'){
        //   _this.PickUp.Pic = res.data.data.src
        // }else{
        //     _this.AttachmentList.push({
        //     SourceID: _this.OrderID,
        //     FileSize: res.data.data.size,
        //     FilePath: res.data.data.src,
        //     FileName: res.data.data.file,
        //     Name: res.data.data.name})
        //   _this.Attachment.push({
        //     src: res.data.data.src,
        //     msrc: res.data.data.src,
        //     w: 600,
        //     h: 400
        //   })
        //   _this.IsUpload = 1
        // }
        _this.$toast.bottom(res.data.msg)
        _this.$loading.close()
      }).catch(err => {
        console.log(err)
        _this.$loading.close()
      })
    },
    closeHandle: function () {
      console.log('999999999999999....')
    },
    goedit (id) {
      this.$router.push({
        path: '/Pages/JgdEdit',
        query: { ID: id }
      })
    }
  }
}
</script>
<style scoped>
.mt60{
  margin-top: 60px
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
.password{
  width: 200px;
  margin: 0px;
}
.detail .pmb0{
  margin-bottom: 0px;
}

.button-list a{
  margin-bottom: 10px;
}
</style>
