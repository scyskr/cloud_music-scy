<template>
 <div>
 <div v-show="$store.state.IssongCard==false">
   <banner></banner>
 
<el-container>
  <el-aside >
      <div class="left-index">
      <div class="core">
          <div class="onTheLeftSideOfTheBasket" v-for="(item) in title" :key="item.id" 
           :class="item.id==idem?'active':''" @click="on(item.id)">{{item.name}}</div>
      </div>
     <div class="afterLoggingIn" v-if="$store.state.loginuser==true">
        <div class="afterLoggingIntitle">创建的歌单</div>
         <div class="myplaylistskr"  v-for="(item, index) in createdMusicList"
              :key="index" @click="bntmyplaylist(item.id)"><i class="icon-xihuan iconfont"></i>  {{ item.name }}</div>
          <div class="afterLoggingIntitle">收藏的歌单</div>
        <div class="myplaylistskr"  v-for="(item, index) in collectedMusicList"
              :key="index" @click="btnCollection(item.id)"
                ><i class="icon-gedan iconfont "></i>  {{ item.name }}</div>
     </div>
     </div>
  </el-aside>  
  <el-main>
      <div class="coreinfo">
      <!-- 发现音乐-->
      <!-- <keep-alive> -->
      <router-view :key="Dates" ></router-view>
      <!-- </keep-alive> -->
      </div>
      </el-main>
</el-container>
</div>
<div class="indexflooter">
<theunderlying></theunderlying>
</div>

<song-card></song-card>
</div>
</template>
 
<script>
import banner from '../components/cloud_banner/banner.vue'
import {userPlaylist} from '../network/app'
import theunderlying from './content/theunderlying.vue'
import songCard from '../views/songCard/songCard.vue'
export default {
   name:'home',
   data(){
       return {
      title:[{id:1,name:'发现音乐'}
      ,{id:2,name:'视频'},
      {id:3,name:'收藏'},
      {id:4,name:'每日推荐'}],
      idem:1,
        // 创建的歌单
      createdMusicList: [],
      // 收藏的歌单
      collectedMusicList: [],
      Dates:'',
       }
   },
   components:{
       banner,
       theunderlying,
       songCard
   },
   methods:{
  on(id){
    if(id==1){
      this.$router.push('/home/foutthat/recomm'); 
      }
      else if(id==2){
        if(this.$store.state.loginuser==true){
        this.$router.push('/home/video/videos');
       
        }
        else{
        this.$message.error("登录才可以查看视频信息");
        return;
          }
        }
        else if(id==3){
         
          this.$router.push('/home/collection');
        }
        else{
          this.$router.push('/home/oneday');
        }
      this.idem=id;
        
        
       },
    getplaylist(){
         if (this.$store.state.loginuser==false) {
        // 说明已经退出登录
        this.$message.error("请先进行登录操作");
        // return;
        }
        else{
            //获取时间戳并传递时间戳
            let ids=window.localStorage.getItem('userId');
            const datatime=(new Date).getTime();
          userPlaylist({ uid: ids,timestamp:datatime}).then(res=>{
             let rens=res.data.playlist;
                 let index = rens.findIndex((item) => item.subscribed == true);
                  this.createdMusicList = rens.slice(0, index);
                  this.collectedMusicList = rens.slice(index);
                  this.createdMusicList[0].name = "我喜欢的音乐";
       // 将收藏的歌单上传至vuex
      this.$store.commit("updateCollectMusicList", this.collectedMusicList);
      // 将创建的歌单上传至vuex
      this.$store.commit("updateCreatedMusicList", this.createdMusicList);
          })
        }

     },
     //跳转歌单
     bntmyplaylist(id){
      this.Dates=Date.parse(new Date());
        this.$router.push('/home/playlist/'+id); 
     },
     btnCollection(id){
        this.Dates=Date.parse(new Date());
        this.$router.push('/home/playlist/'+id); 
     }
   },
   created(){
      if (document.cookie.search("MUSIC_U=") != -1) {
      // 如果本地存有cookie，则先暂时判定为已登录，
      // 以解决登录状态下在视频页等需要登录的页面刷新因为登录状态默认为false，
      // 需要等待获取用户信息请求结束后更新用户状态才有进入视频页的权限，导致被返回到发现音乐页面，体验很差
      // 后面获取用户信息将再次确认用户是否登录
      this.$store.commit("updataLoginState", true);
    }
   },
   watch:{
    "$store.state.loginuser"(current) {
      if (current==true) {
        this.getplaylist();
      } else {
        // 清空收藏和创建歌单
        this.createdMusicList = [];
        this.collectedMusicList = [];
      }
    },
   },
 created(){
      this.getplaylist();
   }
}
</script>
 
<style>
.left-index{
   position: fixed;
}
.core{
    padding: 8px 20px;
    margin-top: 65px;
    width: 270px;
}
.afterLoggingIn{
      padding: 8px 20px;
       width: 270px;
}
.coreinfo{
    margin-top: 65px;
}
.top{
    margin-top:65px;
}
.onTheLeftSideOfTheBasket,.afterLoggingIn .myplaylistskr{
    padding: 10px;
    }
    .active{
         font-weight: 600;
         color: black;
         background-color: rgb(242, 241, 241);
    }
    .el-aside{
        border-right: 1px solid #ccc;
    }
    .afterLoggingIntitle{
      font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
      font-size: 14px;
      color: #ccc;
      padding: 10px;
    }
    .icon-gedan{
        font-size: 18px;
      
    }
    .myplaylistskr{
   vertical-align: middle;
    }
    .myplaylistskr{
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
</style>