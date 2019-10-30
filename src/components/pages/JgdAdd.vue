<template>
    <div>
        <Header></Header>
        <div class="mui-content">
          <div class="mui-content-padded">
            <div class="mui-input-row" style="margin: 20px 10px 0px 10px;">
              <textarea v-model="form.Content" rows="5" placeholder="填写加工要求，规格说明。"></textarea>
            </div>
            <div class="mui-content-padded">
              <button @click="onSubmit" class="btn btn-primary block">提交</button>
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
        Content: ''
      }
    }
  },
  created: function () {
    this.GLOBAL.HeaderText = '提交加工单'
  },
  methods: {
    onSubmit: function () {
      let _this = this
      _this.$loading('正在提交')
      axios.post('/handler/user/processingorder/add', qs.stringify(this.form)).then(res => {
        if (res.data.code === 0) {
          console.log('res:' + res)
          _this.$toast.bottom('提交成功')
          _this.form.Content = ''
        } else {
          _this.$toast.bottom(res.data.msg)
        }
        _this.$loading.close()
        console.log('res:' + res.data.code)
        _this.$router.push({
          path: '/Pages/JgdList',
          query: ''
        })
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

</style>
