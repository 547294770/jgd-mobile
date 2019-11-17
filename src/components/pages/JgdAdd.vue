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
            <div class="mui-input-row">
              <a v-bind:href="form.Pic" target="_blank">{{form.Pic}}</a>
              <input type="file" ref="fileInt"><button @click="changeHandle">上传</button>
            </div>
            <div class="mui-content-padded">
              <button @click="onSubmit(true)" class="btn btn-primary block">保存为草稿</button>
              <button @click="onSubmit(false)" class="btn btn-primary block">提交</button>
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

</style>
