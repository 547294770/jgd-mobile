<template>
    <header id="app_header" class="mui-bar mui-bar-nav">
        <a v-on:click="back" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
        <h1 class="mui-title">{{title}}</h1>
    </header>
</template>
<script>
export default {
  data () {
    return {
      title: this.GLOBAL.HeaderText
    }
  },
  name: 'Header',
  methods: {
    back: function () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>

</style>
