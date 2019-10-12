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
export default {
  name: 'Home',
  components: {
    Header,
    Content,
    Footer
  }
}
</script>
<style scoped>

</style>
