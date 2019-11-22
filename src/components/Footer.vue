<template>
    <nav class="mui-bar mui-bar-tab">
        <a :class="active('/')" href="#/">
            <span class="mui-icon mui-icon-home"></span>
            <span class="mui-tab-label">首页</span>
        </a>
        <a class="mui-tab-item mui-active" href="#/Pages/JgdAdd">
            <span class="fa fa-edit fa-lg mui-icon"></span>
            <span class="mui-tab-label">发布</span>
        </a>
        <a :class="active('/Settings')" href="#/Settings">
            <span class="mui-icon mui-icon-gear"></span>
            <span class="mui-tab-label">设置</span>
        </a>
    </nav>
</template>
<script>
export default {
  name: 'Footer',
  methods: {
    active: function (input) {
      var path = this.$route.path
      if (input === path) {
        return 'mui-tab-item mui-active'
      } else {
        return 'mui-tab-item'
      }
    }
  },
  created: function () {
    console.log(this.$route.path)
  }
}
</script>
<style scoped>

</style>
