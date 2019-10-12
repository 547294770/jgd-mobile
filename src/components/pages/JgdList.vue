<template>
    <div>
        <Header></Header>
        <div class="mui-content">
            <div class="mui-content-padded">
                <button type="button" @click="getdata" class="mui-btn mui-btn-primary mui-btn-block">填写加工单</button>
            </div>
            <div class="mui-content-padded">
                <ul class="mui-pager">
                    <li>
                        <a href="#">
                            上一页
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            下一页
                        </a>
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
import axios from 'axios'
export default {
  name: 'JgdList',
  components: {
    Header,
    Footer
  },
  data () {
    return { items: [
      {orderid: '20191012001', status: 1},
      {orderid: '20191012002', status: 2},
      {orderid: '20191012003', status: 3},
      {orderid: '20191012004', status: 4},
      {orderid: '20191012005', status: 5}
    ]
    }
  },
  methods: {
    getdata: function () {
      axios.get('/handler/admin/processingorder/unprocessed', {})
        .then(function (res) {
          console.log(res)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
<style scoped>

</style>
