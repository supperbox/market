<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from  'components/common/swiper/index'
  export default {
    name: "HomeSwiper",
    components:{
      Swiper,
      SwiperItem
    },
    props:{
      banners:{},
      type:Array,
      default(){
        return[]
      }
    },
    data(){
      return {
        isLoad:true
      }
    },
    methods:{
      imageLoad(){
        if (this.isLoad){
          this.$emit('swiperImageLoad');
          this.isLoad = false
        }
      }
    }

  }
</script>

<style scoped>

</style>