<template>
    <div>
        <Header></Header>
        <div class="mui-content">
          <div class="mui-content-padded">
            <div><h5>加工要求：</h5></div>
            <div class="mui-input-row">
              <textarea v-model="form.Content" rows="5" placeholder="填写加工要求，规格说明。"></textarea>
            </div>
            <div><h5>图片：</h5></div>
            <div><a v-bind:href="form.Pic" target="_blank">{{form.Pic}}</a></div>
            <div class="mui-input-row upload-area">
              <div class="file"><input type="file" ref="fileInt"></div>
              <div class="button"><button @click="changeHandle">上传</button></div>
            </div>
            <div class="mui-content-padded upload-area">
              <div class="save"><button @click="onSubmit(true)" class="btn btn-primary">保存为草稿</button></div>
              <div class="submit"><button @click="onSubmit(false)" class="btn btn-primary">提交</button></div>
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
import '../../../static/css/font-awesome.min.css'
import '../../../static/css/font-awesome.padding.css'
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
      items: [],
      form: {
        Content: '',
        Pic: '',
        IsDraft: 0
      }
    }
  },
  created: function () {
    this.GLOBAL.HeaderText = '提交加工单'
  },
  methods: {
    onSubmit: function (draft) {
      if(this.form.Pic === '' && !confirm('未上传图片，确认要保存吗？')){
        return false;
      }
      let _this = this
      _this.$loading('正在提交')
      this.form.IsDraft = draft ? 1 : 0
      axios.post('/handler/user/processingorder/add', qs.stringify(this.form)).then(res => {
        if (res.data.code === 0) {
          console.log('res:' + res)
          _this.$toast.bottom('提交成功')
          _this.form.Content = ''
          _this.form.Pic = ''
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
    },
    changeHandle () {
      var _this = this
      const file = this.$refs.fileInt.files[0]
      if(!file) {
        _this.$toast.bottom('请选择图片')
        return;
      }
      _this.$loading('正在上传')
      console.log(file)
      const data = new FormData()
      data.append('file', file)
      axios.post('/handler/user/upload/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        console.log(res)
        _this.$refs.fileInt.value = null
        _this.form.Pic = res.data.data.src
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
