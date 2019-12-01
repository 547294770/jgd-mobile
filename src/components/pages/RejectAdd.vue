<template>
    <div>
        <Header></Header>
        <div class="mui-content">
          <div class="mui-content-padded">
            <div><h5>驳回原因：</h5></div>
            <div class="mui-input-row">
              <textarea v-model="form.Reason" rows="5" placeholder="请填写错误原因"></textarea>
            </div>
            <div class="mui-content-padded upload-area">
              <div class="submit"><button @click="onSubmit" class="btn btn-primary">提交</button></div>
            </div>
          </div>
          <div class="mui-card mui-content-padded">
            <ul class="mui-table-view">
              <li v-for="(item,index) in items" class="mui-table-view-cell" :key="index">
                <p> 原因：{{ item.Reason }} </p>
                <p> 时间：{{item.CreateAt}}</p>
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
import qs from 'qs'
export default {
  name: 'RejectAdd',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      items: [],
      form: {
        Reason: '',
        OrderID:'',
      }
    }
  },
  created: function () {
    this.GLOBAL.HeaderText = '错误驳回'
    this.loadData()
  },
  methods: {
    loadData: function () {
      let _this = this
      let params = this.$route.query
      _this.form.OrderID = params.OrderID
      console.log('orderID='+_this.OrderID)
      axios.post('/handler/user/rejection/list',`orderid=${params.OrderID}`).then(res=>{
        console.log('res.data.data.data:'+res.data.data.data)
        if (res.data.code === 0) {
          _this.items = res.data.data.data
        }
      })
    },
    onSubmit: function () {
      let _this = this
      _this.$loading('正在提交')
      axios.post('/handler/user/rejection/add', qs.stringify(this.form)).then(res => {
        if (res.data.code === 0) {
          console.log('res:' + res)
          _this.$toast.bottom('提交成功')
          _this.$router.push({
            path: '/Pages/JgdTodoList',
            query: ''
          })
        } else {
          _this.$toast.bottom(res.data.msg)
        }
        _this.$loading.close()
        console.log('res:' + res.data.code)
      }).catch(error => {
        console.log('error:' + error)
        _this.$loading.close()
        _this.$toast.bottom('提交失败')
      })
    }
  }
}
</script>
<style scoped>
.upload-area{
  display: -webkit-flex;
  display: flex;
  align-items:flex-start;
  flex-direction: row;
  box-sizing: border-box;
}
.upload-area > div.file{
  width: 80%;
}
.upload-area > div.button{
  width: 20%;
}
.upload-area > div.save{
  width: 100%;
}
.upload-area > div.save button{
  width: 100%;
}
.upload-area > div.submit{
  width: 100%;
}
.upload-area > div.submit button{
  width: 100%;
}
</style>
