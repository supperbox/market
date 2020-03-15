import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";


export const itemListenerMixin = {
  data(){
    return {
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted(){
    this.newRefresh = debounce(this.$refs.Scroll.refresh, 100);

    this.itemImgListener = () => {
      this.newRefresh()
    };

    this.$bus.$on('itemImgLoad', this.itemImgListener);
    console.log('111');

  },

};

export const backTopMixin = {
  component:{
    BackTop
  },
  data(){
    return{
      isShowBackTop:false
    }
  },
  methods: {
    backClick(){
      this.$refs.Scroll.scrollTo(0, 0, 300)
    },
    listenShowBackTop(positionY){
      this.isShowBackTop = positionY > 1000;
    }
  }
}