<template>
 <div>
   <banner></banner>
 
<el-container>
  <el-aside >
      <div class="left-index">
      <div class="core">
          <div class="onTheLeftSideOfTheBasket" v-for="(item) in title" :key="item.id" 
           :class="item.id==idem?'active':''" @click="on(item.id)">{{item.name}}</div>
      </div>
     <div class="afterLoggingIn" v-if="$store.state.loginuser">
        <div class="afterLoggingIntitle">创建的歌单</div>
         <div class="myplaylistskr"><i class="icon-xihuan iconfont "></i>  我喜欢的音乐</div>
         <div class="myplaylistskr"><i class="icon-gedan iconfont "></i>  BigCheat的2019年度歌单</div>
          <div class="afterLoggingIntitle">收藏的歌单</div>
        <div class="myplaylistskr"><i class="icon-gedan iconfont "></i>  BigCheat的2019年度歌单</div>
     </div>
     </div>
  </el-aside>
  <el-main>
      <div class="coreinfo">
      <!-- 发现音乐-->
      <keep-alive>
      <router-view></router-view>
      </keep-alive>
      </div>
      </el-main>
</el-container>
<theunderlying></theunderlying>
</div>
</template>
 
<script>
import banner from '../components/cloud_banner/banner.vue'
import {logInSuccessfully} from '../network/app'
import theunderlying from './content/theunderlying.vue'
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
       }
   },
   components:{
       banner,
       theunderlying
   },
   methods:{
  on(id){
    if(id==1){
      this.$router.push('/home/foutthat/recomm'); 
        }
     this.idem=id  
       },
    getplaylist(){
         if (!this.$store.state.loginuser==false) {
        // 说明已经退出登录
        this.$message.error("请先进行登录操作");
        return;
        }
        else{
            //获取时间戳并传递时间戳
            const datatime=(new Date).getTime();
          logInSuccessfully({ uid: window.localStorage.getItem("userId"),timestamp:datatime}).then(res=>{
                   console.log(res);
          })
        }

     }
   },
   watch:{
    "$store.state.loginuser"(current) {
      // console.log(current);
      if (current) {
        this.getplaylist();
      } else {
        // 清空收藏和创建歌单
        this.createdMusicList = [];
        this.collectedMusicList = [];
      }
    },
   },
 created(){
    
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
</style>