<template>
  <div>
    <h2>分类</h2>
    <div class="wrapper">
     <ul class="content">
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
     </ul>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll"

  export default {
    name: "Category",
    data(){
      return{
        scroll:null
      }
    },
    mounted(){
      this.scroll = new BScroll('.wrapper',{
        probeType:3,
        pullUpLoad:true
      });
      this.scroll.on('scroll',(position)=>{

      });
      this.scroll.on('pullingUp',()=>{

      })
    }
  }
</script>

<style scoped>
.wrapper{
  height: 200px;
  background-color: cornflowerblue;
  overflow: hidden;
}
  /*.content{*/
  /*  height: 100px;*/
  /*}*/
</style>
