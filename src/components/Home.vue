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

export default {
  name: 'Home',
  components: {
    Header,
    Content,
    Footer
  },
  created () {
    this.GLOBAL.HeaderText = '加工系统'
  }
}
</script>
<style scoped>
.fa{
  font-size: 2.4em;
}
</style>
