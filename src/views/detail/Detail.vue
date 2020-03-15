<template>
  <div id="detail">
    <detail-navbar class="detail-navbar" @titleClick="titleClick" :current-index="currentIndex"/>
    <Scroll class="content" ref="Scroll" @isScroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramsInfo"/>
      <detail-comment-info ref="comments" :comment-info="commentInfo"/>
      <goods-list ref="recommends" :goods="recommends"/>
    </Scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addCart="addCart"/>
  </div>
</template>

<script>

  import DetailNavbar from "./childComps/DetailNavbar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "../../components/common/scroll/Scroll";
  import GoodsList from "../../components/content/goods/GoodsList";


  import {getDetail, getRecommend, Goods, GoodsParam, Shop} from "../../network/detail";
  import {itemListenerMixin,backTopMixin} from "../../common/mixin";
  import {debounce} from "../../common/utils";
  import {mapActions} from 'vuex'

  import BackTop from "../../components/content/backTop/BackTop";
  import Toast from "../../components/common/toast/Toast";


  export default {
    name: "Detail",
    components: {
      BackTop,
      DetailNavbar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      Toast
    },
    mixins: [itemListenerMixin,backTopMixin],

    data(){
      return {
        iid: null,
        topImages: null,
        shop: {},
        goods: {},
        detailInfo: {},
        paramsInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0
      }
    },

    methods: {
      imageLoad(){
        this.newRefresh();
        this.getThemeTopY()
      },

      titleClick(index){
        this.$refs.Scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },

      contentScroll(position){
        const positionY = -position.y;

        let length = this.themeTopYs.length;

        for (let i = 0; i < length-1 ; i++) {
          if (this.currentIndex !==i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY <
            this.themeTopYs[i + 1]) )) {
            this.currentIndex = i;
            // this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        this.listenShowBackTop(positionY)
      },

      ...mapActions({
        addToCart: 'addToCart'
      }),

      addCart(){
        // 获取购物车需要展示的信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        //
        this.addToCart(product).then(() => {
          this.$toast({message: '加入购物车成功'})});
        //  添加到购物车

      }


      },

    created(){
      // 获取当前路由对应的id
      this.iid = this.$route.params.id;
      // 获取iid对应的详细数据
      getDetail(this.iid).then(res => {
        console.log(res);
        const data = res.result;
        //获取图片数据
        this.topImages = data.itemInfo.topImages;
        // //获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        //获取店铺信息
        this.shop = new Shop(data.shopInfo);
        // 保存商品详细数据
        this.detailInfo = data.detailInfo;

        // 获取参数信息
        this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        // 取出评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
        // console.log(this.goods);
        // 等待DOM渲染完毕再执行该函数，但图片尚未加载完毕
        // this.$nextTick(() =>{
        //   this.themeTopYs.push(0);
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        //   this.themeTopYs.push(this.$refs.comments.$el.offsetTop);
        //   this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
        //   console.log(this.themeTopYs);
        // })
      });
      // 获取推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      });
      //
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.comments.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop - 44);
        this.themeTopYs.push(Number.MAX_VALUE);
        console.log(this.themeTopYs);
      }, 500)

    },

    mounted(){
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comments.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      // console.log(this.themeTopYs);

    },

    updated(){
      //可行
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comments.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      // console.log(this.themeTopYs);
    },

    destroyed(){
      //在推荐图片中发出图片加载完成的事件监听，切换页面时阻止监听。
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    }

  }

</script>


<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  /*.detail-nav{*/
  /*}*/
  .content {
    height: calc(100% - 44px - 58px);
  }

  .detail-navbar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>