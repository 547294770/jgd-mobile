<template>
    <div>
        <Header></Header>
        <Content></Content>
        <Footer></Footer>
    </div>
</template>
<script>
import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import '../../static/css/mui.min.css'
import '../../static/css/font-awesome.min.css'
import '../../static/css/font-awesome.padding.css'
import '../../static/css/jgd.css'

export default {
  name: 'Home',
  components: {
    Header,
    Content,
    Footer
  },
  created () {
    this.GLOBAL.HeaderText = '首页'
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
</style>
