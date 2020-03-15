<template>
  <div id="home">
    <NavBar class="home-nar">
      <div slot="center">MISS</div>
    </NavBar>
    <tabControl :titles="titles" class="tab-control" @tabClick='tabClick' ref="tabControl1" v-show="isTabFixed" />

    <Scroll class="content" ref="Scroll" :probe-type="3" @isScroll="contentScroll" :pull-up-load="true"
            @pullingUp="loadMore">
      <HomeSwiper :banners="banners" @swiperImageLoad = 'swiperImageLoad'/>
      <HomeRecommend :recommends="recommends"/>
      <FeatureViews/>
      <tabControl :titles="titles"  @tabClick='tabClick' ref="tabControl2" />
      <GoodsList :goods="showGoods"/>
    </Scroll>

    <BackTop @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>

  import HomeSwiper from "./chidComps/HomeSwiper";
  import HomeRecommend from "./chidComps/HomeRecommend";
  import FeatureViews from "./chidComps/FeatureViews";

  import NavBar from "components/common/navbar/NavBar";
  import tabControl from "components/content/tabControl/tabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import {getHomeMultidata, getHomeGoods} from "network/home";
  import {debounce} from "common/utils";
  import {itemListenerMixin} from "../../common/mixin";


  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommend,
      FeatureViews,
      tabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    mixins: [itemListenerMixin],

    data(){
      return {
        banners: [],
        recommends: [],
        titles: ['流行', '精选', '新款'],
        goods: {
          'pop': {page: 1, list: []},
          'new': {page: 1, list: []},
          'sell': {page: 1, list: []},
        },  //在组建创建完成时，已经请求到了商品数据（goods）。
        currentType: 'pop',
        isShowBackTop: true,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0
      }
    },

    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }


    },

    created(){
      this._getHomeMultidata();
      this._getHomeGoods('pop');
      this._getHomeGoods('new');
      this._getHomeGoods('sell')

    },

    mounted(){

    },

    activated(){
      // console.log(this.saveY);
      // console.log('build');
      this.$refs.Scroll.scrollTo(0,this.saveY,0);
      // console.log(this.$refs.Scroll);
      this.$refs.Scroll.refresh();
      this.$refs.Scroll.refresh();
      this.$refs.Scroll.refresh();
      this.$refs.Scroll.scrollTo(0,this.saveY,0);

    },

    deactivated(){
      //保存Y值
      this.saveY = this.$refs.Scroll.getScrollY();
      // console.log(this.saveY);
      //取消全局事件监听
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },

    methods: {
      // 选择数据展示
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;

      },
      // 网络请求相关
      _getHomeMultidata(){
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list
        })
      },
      // 获取类型及相关页面内容
      _getHomeGoods(type){
        // 获取页码
        const page = this.goods[type].page;
        getHomeGoods(type, page).then(res => {
          const newList = res.data.list;
          console.log(res.data.list);
          this.goods[type].list.push(...newList);
          this.goods[type].page += 1;
          // 完成加载更多数据
          this.$refs.Scroll.finishPullUp()
        })
      },
      // 使滚动到顶部
      backClick(){
        this.$refs.Scroll.scrollTo(0, 0, 1000)
      },
      // 控制回归箭头显示区域
      contentScroll(position){
        //判断是否显示backTop
        this.isShowBackTop = (-position.y) > 1000;
        //决定tabControl是否吸顶（position：fixed）
        this.isTabFixed = (-position.y) > this.tabOffsetTop
        },
      // 加载更多数据
      loadMore(){
        this._getHomeGoods(this.currentType);
        // console.log(this.goods[this.currentType].page);
        this.$refs.Scroll.refresh();
      },
      // 获取高度,所有组件都有一个元素$el用于获取元素
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      }

    }

  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  .home-nar {
    background-color: hotpink;
    color: white;

    /*原生滚动时为了让它不跟随*/
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

</style>
