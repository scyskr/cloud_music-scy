<template>
<div>
    <div class="block">
      <div class="MusicCover">   
         <el-image :src="theCover.coverImgUrl"></el-image>
        </div>
    <div class="Musicrigth">
      <div class="MusicIitem1"><div class="MusicIitem1playlist"><div>歌单</div></div><div class="MusicIitemSpan">今天从 {{theCover.name}} 听起|私人雷达</div></div>
      <div class="MusicIitem2"><div class="MusicIitem1playlist1"><img :src="theCover.creator.avatarUrl"  alt="">
      </div> <div class="playnikenane"><span>{{theCover.creator.nickname}} </span></div> <div class="createdatetime">  {{ theCover.createTime | gull }} 创建</div></div>
      <div class="MusicIitem3">
        <div class="MusicIitem3item">
   <el-button size="medium" round class="MusicIitem3item1"><i class="icon-bofang iconfont "></i> 播放全部</el-button >
     <el-button size="medium" round><i class="icon-xihuan iconfont"></i>   收藏</el-button >
       <el-button size="medium" round><i class="icon-zhuanfa iconfont"></i>  分享</el-button >
       <el-button size="medium" round>默认按钮</el-button >
</div></div>
      <div class="MusicIitem4">
        <div >标签:<span>{{theCover.tags | theLabel}}</span></div>
        <div>歌曲:<span>{{theCover.trackCount}}</span>  播放: {{theCover.playCount}}</div>
        <div class="overfll">简介:<span>{{theCover.description}}</span></div>
        </div>
    </div>
  </div>
  <!-- 歌曲列表 -->
  <div>
      <el-tabs v-model="activeName">
    <el-tab-pane label="歌曲列表" name="first">
        <thesong :playlistChest="musicList"></thesong>
    </el-tab-pane>
    <el-tab-pane label="评论(0)" name="second">专属定制</el-tab-pane>
    <el-tab-pane label="收藏者" name="third">收藏者</el-tab-pane>
  </el-tabs>
  </div>
  </div>
</template>   

<script>
import thesong from '../content/theSongList.vue'
import {thePlaylist,thePlaylistall} from '../../network/app'
import { handleMusicTime } from '../../plugins/ulits';
export default {
   name:'playlist',
     data() {
      return {
        src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        jpages:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
         activeName: 'first',
        cuid:0,
        musicList:[],
        theCover:[]
      }
   },
   components:{
     thesong
   },
    computed:{
   userid(){
      return this.$route.params.id
   }
 },
   created(){
     thePlaylist({id:this.userid}).then(res=>{
          this.musicList=res.data.playlist;
             this.$store.commit("updatamusicList", this.musicList.tracks);
            //  console.log( this.musicList,'我是playlist的musicList');
          // 处理播放时间
      this.musicList.tracks.forEach((item, index) => {
        this.musicList.tracks[index].dt = handleMusicTime(item.dt);
      });
        //  console.log( this.musicList.tracks[0].dt,'4145456');
          this.theCover=res.data.playlist;
        })
   },
   filters:{
     gull(data){
       const datae=new Date(data);
   return   datae.getFullYear()+'-'+
   (datae.getMonth()+1 < 10 ? '0'+(datae.getMonth()+1) : datae.getMonth()+1)+'-'+
   datae.getDate();
     },
   theLabel(kis){
   return kis

   }
   }
} 
</script>

<style>
.block{
  display: grid;
  grid-template-columns: 1fr 3fr;
  }
  .MusicCover img{
    border-radius: 20px;
    vertical-align: middle;
  }
  .MusicIitem1{
    display: grid;
  grid-template-columns: 1fr 10fr;
  align-items: center;
  }
  .MusicIitem1playlist{
    text-align: center;
    margin: 0 auto;
  }
  .MusicIitem1playlist div{
    border: 1px solid #ec4141;
    padding: 2px;
    font-size: 14px;
    color: #ec4141;
    border-radius: 2px;
  }
  .MusicIitemSpan{
   font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
   font-size: 24px;
   font-weight: 800;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  }
  .MusicIitem1playlist1{
    text-align: center;
    }
  .MusicIitem1playlist1 img{
    height: 31px;
    width: 31px;
    border-radius: 50%;
    vertical-align: middle;
  }
    .MusicIitem2{
    display: grid;
  grid-template-columns: 1fr 1fr 10fr;
  align-items: center;
  padding: 10px;
  }
   .MusicIitem3{
        display: grid;
      align-items: center; 
   }
   .MusicIitem3item{
     margin-top: 4px;
   }
   .MusicIitem3item1{
     margin-left: 18px;
     background-color: #ec4141;
     color: #fff;
   }
   .el-button--medium.is-round {
    padding: 9px 31px;
}
 .MusicIitem4 div{
   padding: 15px 0 15px 10px;
   margin-left: 19px;
 }
 .el-tabs__item.is-active{
        color: black;
        font-weight: 850;
        font-size: 18px;
        
}
.el-tabs__active-bar{
    background-color:#ec4141 ;
    height: 3px;
}
.el-tabs__nav-wrap::after{
    background-color: #fff;
}
.overfll{
  width: 600px;
  overflow: hidden;
  height: 70px;
  white-space: nowrap;
  text-overflow: ellipsis
}
.playnikenane{
      overflow: hidden;
    white-space: nowrap;
    margin-right: 10px;
    text-overflow: ellipsis;
}
.createdatetime{
  margin-left: 10px;
}
</style>