<template>
  <div>
      <div class="classifiedCollection">
          <div class="collectionitem "
           v-for="(coll,index) in collectList" :key="index"
           @click="collect(coll)"
           :class="isshow==coll?'collectactive':''">{{coll}}</div>
      </div>
       <div class="theAlbumcollection" v-if="isshow=='专辑'">
           <div class="titlealbum">收藏的专辑({{albumList[0].size}})</div>
           <div class="albumList">
           <div class="" v-for="(album,index) in albumList" :key="index"
           @click="albumListkiss(album.id)">
               <div class="albumlistitme">
                   <div><img :src="album.picUrl+'?param=220y200'" alt=""></div>
                   <div>{{album.name}}</div>
               </div>
           </div>
           </div>
       </div>
        <div class="theAlbumcollection" v-if="isshow=='歌手'">
           <div class="titlealbum">收藏的歌手({{singerCount.count}})</div>
           <div class="albumList"> 
           <div class="" v-for="(singer,index) in singerList" :key="index"
           @click="singerListkiss(singer.id)">
               <div class="albumlistitme">
                   <div><img :src="singer.picUrl+'?param=220y200'" alt=""></div>
                   <div>{{singer.name}}</div>
               </div>
           </div>
           </div>
       </div>
        <div class="theAlbumcollection" v-if="isshow=='视频'">
           <div class="titlealbum">收藏的mv({{mvcount.count}})</div>
           <div class="albumList">
           <div class="" v-for="(mvs,index) in mvList" :key="index"
           @click="mvListkiss(mvs.vid)">
               <div class="albumlistitme">
                   <div><img :src="mvs.coverUrl+'?param=220y200'" alt=""></div>
                   <div>{{mvs.title}}</div>
               </div>
           </div>
           </div>
       </div>
  </div> 
</template>

<script> 
import {albumsub,singersublist,mvsublist} from '../../network/app'
export default {
 name:'collection',
 data(){
     return{
         collectList:['专辑','歌手','视频'],
         isshow:'专辑',
         albumList:[],
         singerList:[],
         singerCount:0,
         mvList:[],
         mvcount:0
     }
 },
 methods:{
 collect(name){
     this.isshow=name;
     if (name=='歌手') {
         singersublist({}).then(res=>{
        this.singerCount=res.data;
        this.singerList=res.data.data;
        // console.log(res.data.data[0].name);
         })
     }
     else if(name=='视频'){
      mvsublist({}).then(res=>{
        this.mvcount=res.data;
        this.mvList=res.data.data;
        // console.log(res.data.data);
      })
     }
 },
   //获取收藏的专辑
   getalbumsub(){
   albumsub({}).then(res=>{
   this.albumList=res.data.data ;
   })  
   },
   //跳转到专辑页面
   albumListkiss(id){
       this.$router.push('/home/albumList/albumListson/'+id)
   },
   singerListkiss(id){
       this.$store.commit('updatasingerId',id)
         this.$router.push('/home/singerView/singerab/'+id)
   },
   mvListkiss(id){
      this.$store.commit('videotype','mv');
       this.$router.push('/home/videodetail/'+id)
   }
 },
 created(){
     this.getalbumsub();
 }
}

</script>
<style  scoped>
.classifiedCollection{
    display: flex;
    gap: 24px;
}
.collectionitem{
    font-size: 16px;
}
.collectactive{
    border-bottom: 3px solid #ec4141;
    color: black;
    font-weight: 600;
     font-size: 20px;
}
.albumList{
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-between; */
    gap: 24px;
}
.titlealbum{
    font-size: 16px;
    padding: 10px;
}
.albumlistitme{
    max-width: 220px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.albumlistitme img{
     border-radius: 20px;
}
</style>