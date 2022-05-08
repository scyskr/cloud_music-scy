<template>
  <div>
   <video-list :videoList="singerMvInfo.mvs"
   :isLoad="true"
    @clickListCardItem="goToVideoDetail"
    @bottomLoad="bottomLoad"
   ></video-list>
  </div>
</template>

<script>
import videoList from '../../components/content/videoList/videoList.vue'
import {singermv} from '../../network/app'
export default {
  name:'singMV',
  data(){
    return{
       // 歌手mv数据
      singerMvInfo: { mvs: [], hasMore: false },
    }
  },
  methods:{
     getSingerMv() {
   singermv({id:this.$store.state.singerId, limit:100}).then(res=>{
         this.singerMvInfo = res.data;
         console.log(this.singerMvInfo);
   })
      
     
    },
       // 点击视频卡片进入视频详情
    goToVideoDetail({ id }) {
      if (!this.$store.state.isLogin) {
        this.$message.error("登录后才能观看MV哦!");
        return;
      }
      // console.log(id);
      this.$router.push({ name: "videoDetail", params: { id, type: "mv" } });
    },
        // mv上拉加载
    bottomLoad() {
      if (this.singerMvInfo.hasMore == true) {
        this.getSingerMv();
      }
    },
  },
    created() {
    this.getSingerMv();
  },
  components:{
    videoList
  }
}

</script>
<style>
</style>