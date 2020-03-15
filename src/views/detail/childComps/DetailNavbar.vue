<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in title"
             class="title-item"
             :class="{active:index === indexChange}"
             @click="titleClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "DetailNavbar",
    components: {
      NavBar
    },

    props: {
      currentIndex: 0
    },

    data(){
      return {
        title: ['商品', '参数', '评论', '推荐'],
        counter:Number
      }
    },

    computed: {
      indexChange: {
        get: function (){
          return this.currentIndex
        },
        set: function (){
          return this.counter
        }
      }
    },

      methods: {
        titleClick(index){
          this.counter = index;
          this.$emit('titleClick', index)
        },

        backClick(){
          this.$router.back()
        }

      }

    }

</script>

<style scoped>

  .title {
    display: flex;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: orangered;
  }

  .back {
    margin-top: 6px;
  }

</style>
