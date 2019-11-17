<template>
    <div>
        <Header></Header>
        <!--页面主内容区开始-->
        <div class="mui-page-content">
            <div class="mui-scroll-wrapper">
                <div class="mui-scroll">
                    <div class="mui-input-group">
                        <div class="mui-input-row">
                            <label>公司名称</label>
                            <input type="text" v-model="Companyinfo.CompanyName" placeholder="点击输入公司名称" class="mui-input-clear mui-input">
                        </div>
                        <div class="mui-input-row">
                            <label>联系人</label>
                            <input type="text" v-model="Companyinfo.Contact" placeholder="点击输入联系人" class="mui-input-clear mui-input">
                        </div>
                        <div class="mui-input-row">
                            <label>电话</label>
                            <input type="text" v-model="Companyinfo.Tel" placeholder="点击输入电话" class="mui-input-clear mui-input">
                        </div>
                        <div class="mui-input-row">
                            <label>地址</label>
                            <input type="text" v-model="Companyinfo.Address" placeholder="点击输入地址" class="mui-input-clear mui-input">
                        </div>
                    </div>
                    <div class="mui-content-padded">
                        <button @click="onSubmit" class="btn btn-primary block">保存</button>
                    </div>
                </div>
            </div>
        </div>
        <!--页面主内容区结束-->
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
  name: 'CompanyInfo',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      Companyinfo: {
        Address: '',
        CompanyName: '',
        Contact: '',
        Tel: ''
      }
    }
  },
  created () {
    this.GLOBAL.HeaderText = '公司信息'
    this.loadData()
  },
  methods: {
    loadData: function () {
      var _this = this
      axios.get('/handler/user/user/companyinfo', {})
        .then(function (res) {
          if (res.data.data) {
            _this.Companyinfo = res.data.data
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    onSubmit: function () {
      let _this = this
      _this.$loading('正在提交')
      axios.post('/handler/user/user/updatecompany', qs.stringify(this.Companyinfo)).then(res => {
        if (res.data.code === 0) {
          console.log('res:' + res)
          _this.$toast.bottom('保存成功')
          _this.$router.push({
            path: '/Settings',
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
        _this.$toast.bottom('提交失败' + error)
      })
    }
  }
}
</script>
<style scoped>
.fa{
  font-size: 2.4em;
}
.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
  margin-top: 10px;
}
.mui-views,
.mui-view,
.mui-pages,
.mui-page,
.mui-page-content {
    position: absolute;
    left: 0;
    right: 0;
    top: 54px;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: #efeff4;
}
.mui-pages {
    top: 46px;
    height: auto;
}
.mui-scroll-wrapper,
.mui-scroll {
    background-color: #efeff4;
}
.mui-page.mui-transitioning {
    -webkit-transition: -webkit-transform 300ms ease;
    transition: transform 300ms ease;
}
.mui-page-left {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}
.mui-ios .mui-page-left {
    -webkit-transform: translate3d(-20%, 0, 0);
    transform: translate3d(-20%, 0, 0);
}
.mui-navbar {
    position: fixed;
    right: 0;
    left: 0;
    z-index: 10;
    height: 44px;
    background-color: #f7f7f8;
}
.mui-navbar .mui-bar {
    position: absolute;
    background: transparent;
    text-align: center;
}
.mui-android .mui-navbar-inner.mui-navbar-left {
    opacity: 0;
}
.mui-ios .mui-navbar-left .mui-left,
.mui-ios .mui-navbar-left .mui-center,
.mui-ios .mui-navbar-left .mui-right {
    opacity: 0;
}
.mui-navbar .mui-btn-nav {
    -webkit-transition: none;
    transition: none;
    -webkit-transition-duration: .0s;
    transition-duration: .0s;
}
.mui-navbar .mui-bar .mui-title {
    display: inline-block;
    width: auto;
}
.mui-page-shadow {
    position: absolute;
    right: 100%;
    top: 0;
    width: 16px;
    height: 100%;
    z-index: -1;
    content: '';
}
.mui-page-shadow {
    background: -webkit-linear-gradient(left, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, .01) 50%, rgba(0, 0, 0, .2) 100%);
    background: linear-gradient(to right, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, .01) 50%, rgba(0, 0, 0, .2) 100%);
}
.mui-navbar-inner.mui-transitioning,
.mui-navbar-inner .mui-transitioning {
    -webkit-transition: opacity 300ms ease, -webkit-transform 300ms ease;
    transition: opacity 300ms ease, transform 300ms ease;
}
.mui-page {
    display: none;
}
.mui-pages .mui-page {
    display: block;
}
.mui-page .mui-table-view:first-child {
    margin-top: 15px;
}
.mui-page .mui-table-view:last-child {
    margin-bottom: 30px;
}
.mui-table-view {
    margin-top: 20px;
}

.mui-table-view span.mui-pull-right {
    color: #999;
}
.mui-table-view-divider {
    background-color: #efeff4;
    font-size: 14px;
}
.mui-table-view-divider:before,
.mui-table-view-divider:after {
    height: 0;
}
.head {
    height: 40px;
}
#head {
    line-height: 40px;
}
.head-img {
    width: 40px;
    height: 40px;
}
#head-img1 {
    position: absolute;
    bottom: 10px;
    right: 40px;
    width: 40px;
    height: 40px;
}
.update {
    font-style: normal;
    color: #999999;
    margin-right: -25px;
    font-size: 15px
}
.mui-fullscreen {
    position: fixed;
    z-index: 20;
    background-color: #000;
}
.mui-ios .mui-navbar .mui-bar .mui-title {
    position: static;
}
/*问题反馈在setting页面单独的css*/
#feedback .mui-popover{
    position: fixed;
}
#feedback .mui-table-view:last-child {
    margin-bottom: 0px;
}
#feedback .mui-table-view:first-child {
    margin-top: 0px;
}

.mui-plus.mui-plus-stream .mui-stream-hidden{
    display: none !important;
}
.mui-input-row label{
    text-align: right;
}
.mui-input-row input[type=text]{
    color: #969696;
}
</style>
