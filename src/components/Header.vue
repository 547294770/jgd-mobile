<template>
    <header id="app_header" class="mui-bar mui-bar-nav">
        <a v-if="showArraw()" v-on:click="back" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
        <h1 class="mui-title">{{title}}</h1>
        <a v-if="rightbuttoncss.length > 0" @click="onRightButtonClick" :class="rightbuttoncss"></a>
    </header>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      title: this.GLOBAL.HeaderText,
      rightbuttoncss: 'mui-icon mui-pull-right',
      rightbuttonclick: null
    }
  },
  name: 'Header',
  created: function () {
    this.getuserinfo()
  },
  methods: {
    back: function () {
      this.$router.go(-1)
    },
    showArraw: function () {
      if (this.title === '设置' || this.title === '首页') {
        return false
      }
      return true
    },
    setRightButtonClick (click) {
      this.rightbuttonclick = click;
    },
    setRightButtonCss (css) {
      this.rightbuttoncss = css + ' ' + this.rightbuttoncss;
    },
    onRightButtonClick () {
      if (this.rightbuttonclick) {
        this.rightbuttonclick()
      }
    },
    getuserinfo: function () {
      axios.get('/handler/user/user/init', {})
        .then(function (res) {
          if (res && res.data.code === '2222') {
            window.location = res.data.url
          } else if (res) {
            this.USERINFO = res.data
          }
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
