<template>
  <div class="excloudindex">
      <el-backtop target=".excloudindex"></el-backtop>
    <div class="recommendThePlaylist">
   <div class="recommendThePlaylistheader" v-if="$store.state.userid==''">请登录再查看你的雷达歌单 </div> 
    <div class="recommendThePlaylistheader" v-else>{{$store.state.userid.nickname}} </div> 
   <div class="bigData">根据你的红心我们会推荐更多好的音乐给你</div>
    <div class="recommendedHome" >
        <div class="recommendedItme" >
        <div class="iteminfo" v-for="(items,id) in reslut" :key="id"
        @click="exclumusic(items.id)"
        >
          <img :src="items.coverImgUrl" alt=""><span>{{items.name}}</span></div>
        </div>
    </div>
</div>  
    <div class="recommendThePlaylist">
   <div class="recommendThePlaylistheader">让音乐唤醒你 <i class="icon-arrow-right-bold iconfont "></i></div> 
    <div class="recommendedHome" >
        <div class="recommendedItme" >
        <div class="iteminfo" v-for="(infos) in exclusives" :key="infos.name"
        @click="recommendedItmemusci(infos.id)"
        >
          <div><img  v-lazy="infos.coverImgUrl" alt=""></div>
        <div><span>{{infos.name}}</span></div>
        </div>
        </div>
       
    </div>
</div> 
  </div>
</template>

<script>
import {api,exclusive} from '../../network/app'
export default {
   name:"exclus",
    data() {
    return {
        reslut:[{}],
        banners:[{}],
        exclusives:[{}]
    }
  }, 
  methods:{
   exclumusic(id){
      this.$router.push('/home/playlist/'+id); 
   },
   recommendedItmemusci(id){
       this.$router.push('/home/playlist/'+id); 
   }
  },
  //mounted 
  created(){
          api({limit:5}).then(res=>{
            const reslutdata=res.data;
            this.reslut=reslutdata.playlists;
          }),
          exclusive({limit:100}).then(res=>{
                this.exclusives=res.data.playlists;
                 console.log(this.exclusives);
          })
  },
}
</script>

<style>
.excloudindex::-webkit-scrollbar
{
    width: 5px;
    height: 5px;
    border-radius: 10px;
    background-color: #ccc;
}
/*定义滚动条轨道 内阴影+圆角*/
.excloudindex::-webkit-scrollbar-track
{
   box-shadow: inset 0 0 6px rgba(241, 240, 240, 0.3);
    border-radius: 10px;
    background-color: #ffff;
}
/*定义滑块 内阴影+圆角*/
.excloudindex::-webkit-scrollbar-thumb
{
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(249, 248, 248, 0.3);
    background-color: #ccc;
    border-radius: 10px;
}
.excloudindex{
  overflow-y: scroll;
  height: 800px;
}
 .recommendThePlaylistheader{
     color: black;
        font-weight: 850;
        font-size: 18px;
        padding: 20px 20px 10px 0px;
     }
      .recommendedItme {
     display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    column-gap: 24px;
    row-gap: 24px;
 } 
  .iteminfo img{
    width: 200px;
 }
 .bigData{
     color: #ccc;
     font-size: 14px;
     padding-bottom: 10px;
 }
</style>