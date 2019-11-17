<template>
  <vue-preview :slides="list" @click="closeHandle"></vue-preview>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      list: [{
　　　　　　　　 src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
　　　　　　　　 msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
　　　　　　　　 w: 600,
　　　　　　　　 h: 400
  　　　　　　},
  　　　　　　 {
              src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg', 
              msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
              w: 1200,
              h: 900
  　　　　　　}]
    }
  },
  methods: {
    closeHandle: function () {
      console.log('999999999999999....')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
　.my-gallery:after{content:"";display:block;visibility: hidden;clear:both;height:0}
　.my-gallery figure{width:100px;height:100px;float:left;margin:.100px;padding:0;box-shadow:0 0 .100px #ccc;}
</style>
