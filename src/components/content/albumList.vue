<template>
<div>
   <div class="block">
      <div class="MusicCover">   
         <el-image :src="albumlist.album.picUrl + '?param=300y300'"></el-image>
        </div>
    <div class="Musicrigth">
      <div class="MusicIitem1"><div class="MusicIitem1playlist"><div>专辑</div></div><div class="MusicIitemSpan">
           {{albumlist.album.name}}</div></div>
      <div class="MusicIitem3">
        <div class="MusicIitem3item">
   <el-button size="medium" round class="MusicIitem3item1"><i class="icon-bofang iconfont "></i> 播放全部</el-button >
     <el-button size="medium" round><i class="icon-xihuan iconfont"></i>   收藏()</el-button >
       <el-button size="medium" round>  vip下载</el-button >
       <el-button size="medium" round><i class="icon-zhuanfa iconfont"></i>转发</el-button >
</div></div>
      <div class="MusicIitem4">
        <div >歌手:<span>{{albumlist.album.artist.name}}</span></div>
        <div>时间:<span>{{albumlist.album.publishTime| gull}}</span> </div>
        </div>
    </div>
  </div>
    <!-- 歌曲列表 -->
  <div> 
  <div class="musciindexkiss">
  <div class="musictabs">
  <div v-for="nav in navBarData" :key="nav.name"
  @click="btnnav(nav.name,nav.path)"
  :class="nav.path==$route.path?'musictabsactive':''"
  >{{nav.name }}</div>
  </div>
   <keep-alive>
    <router-view></router-view>
    </keep-alive>
  </div>
  </div>
  </div>
</template>

<script>
import {album} from '../../network/app'
import { handleMusicTime } from "../../plugins/ulits"
export default {
  name:'albumList',
  data(){
      return{
        albumlist:[],
          navBarData: [
        { name: "歌曲列表", path: "/home/albumList/albumListson/"+this.$route.params.id },
        { name: "评论", path: "/home/albumList/albumReviews" },
        { name: "专辑详情", path: "/home/albumList/albumDetails" },
      ],
      }
  },
   methods: {
    btnnav(names,path){
    // this.activeNames=name;
     this.$store.commit("updatatabke", names);
    this.$router.push(path);
    // console.log(this.$route.path);

    },
    contentOfTheAlbum(){
      album({id:this.$route.params.id}).then(res=>{
           res.data.songs.forEach((item, index) => {
        res.data.songs[index].dt = handleMusicTime(item.dt);
      });
        this.albumlist=res.data;
      })
    }
    },
  created(){
 this.contentOfTheAlbum();
  },
     filters:{
     gull(data){
       const datae=new Date(data);
   return   datae.getFullYear()+'-'+
   (datae.getMonth()+1 < 10 ? '0'+(datae.getMonth()+1) : datae.getMonth()+1)+'-'+
   datae.getDate();
     },
     },
      watch:{
"$store.state.albumId"(current, last) {
   this.contentOfTheAlbum();
    },
   },
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
.musciindexkiss{
  padding: 10px 10px 20px 10px;
}
.musictabs{
  display: flex;
  gap: 24px;
  align-content: center;
  align-items: center;
}
.musictabsactive{
  font-weight: 1000;
  font-size: 24PX;
  border-bottom: 3PX solid red;
}
</style>