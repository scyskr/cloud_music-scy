<template>
  <div class="singertheskr">
    <!-- top 50 -->
    <div class="singerHits">
       <div class="singerHitsimg"><img src="../../assets/img/topSongsLogo.png" alt=""></div>
       <div>
         <div class="hot50">热门歌曲50首</div>
         <el-table
    :data="tableDatasong"
    stripe
    style="width: 100%"
    :show-header="false"
    @row-dblclick="topSongkiss"
     >
        <el-table-column
      prop=""
      label=""
      width="15">
    </el-table-column>
    <el-table-column
      prop="name"
      label=""
      width="700">
    </el-table-column>
    <el-table-column
      prop="dt"
      label=""
      width="100"
      >
    </el-table-column>
  </el-table>
  <div class="allshow"> 
    <div @click="toplogoquan" v-show="showall">查看全部50首歌曲</div>
    </div>
       </div>
    </div>
    <!-- 其他专辑 -->
    <div class="singerHits" v-for="infos in singerAlbumlist" :key="infos.id">
       <div class="singerHitsimg"><img v-lazy="infos[0].al.picUrl" alt=""></div>
       <div>
           <div class="hot50">{{infos[0].al.name}}</div>
         <el-table
    :data="infos"
    stripe
    style="width: 100%"
    :show-header="false"
    @row-dblclick="bottomau"
     >
    <el-table-column
      prop="name"
      label=""
      width="700">
    </el-table-column>
    <el-table-column
      prop="dt"
      label=""
      width="100"
      >
    </el-table-column>
  </el-table>
       </div>
       <!-- 其他的专辑 -->
    </div>
  </div>
</template>

<script>
import {top50,singerAlbum,album} from '../../network/app'
import {handleMusicTime} from '../../plugins/ulits'
export default {
  name:'singerab',
    data() {
      return {
        tableDatasong:[],
        singerAlbum:[],
        showall:true,
        singerAlbumlist:[],
       albumInformationid:[],
      }
    },
    created(){
   top50({id:this.signerid}).then(res=>{
    this.tableDatasong=res.data.songs.slice(0,10);
     // 处理播放时间
      this.tableDatasong.forEach((item, index) => {
        this.tableDatasong[index].dt = handleMusicTime( item.dt);
      });

   });
   //获取专辑id
   singerAlbum({id:this.signerid}).then(res=>{
       let au=res.data.hotAlbums;
      //  console.log(au,'专辑信息');
      // this.albumInformation=au;
      // console.log(res.data.hotAlbums,'专辑id');
       au.forEach(item=>{
         album({id:item.id}).then(rest=>{
         this.albumInformationid.push(item)
          // console.log(this.albumInformationid,'专辑id');
      let songs = rest.data.songs;
      // 处理歌单中歌曲的时间
      songs.forEach((item, index) => {
        songs[index].dt = handleMusicTime(item.dt);
      });
      this.singerAlbumlist.push(songs);
      })
       })
   })

   //获取歌手
   },
   methods:{
     //双击top50歌曲
     topSongkiss(row){
       this.$store.commit("updatemusicId", row.id);
        if(this.$store.state.musicList!=this.tableDatasong){
       //修改vue中的musilistcid
       this.$store.commit("updatamusicList", this.tableDatasong);
       let musicindx=this.tableDatasong.findIndex((item)=>
         item.id==this.$store.state.musicId
       )
      if(musicindx!=-1){
        let Rowcount = document.querySelector('.singerHits').querySelector('.el-table');
        Rowcount.querySelector('.el-table__row').children[musicindx].querySelector('.cell').innerHTML="<i class='iconfont icon-yinliang' style='color:#ff4e4e'></i>"
      }
      }
      else{
        // alert('111');
      }
     },
     //点击查看全部
     toplogoquan(){
      top50({id:this.signerid}).then(res=>{
    this.tableDatasong=res.data.songs;
     // 处理播放时间
      this.tableDatasong.forEach((item, index) => {
        this.tableDatasong[index].dt = handleMusicTime( item.dt);
      });
      this.showall=false;
      this.$store.commit('updatamusicList',this.tableDatasong);
   });
    
     },
     //点击其他专辑
     bottomau(row){
         this.$store.commit("updatemusicId", row.id);
          let ids=this.albumInformationid;
          console.log(row,'rowss');
           let musicListIndex = this.singerAlbumlist.findIndex(
          (item,index) =>row.al.id==item[0].al.id
         );
        //  alert(musicListIndex);
         let amblist=this.singerAlbumlist[musicListIndex];
       this.$store.commit("updatamusicList",amblist);
        // console.log(musicListIndex,'musicListIndex');
        // console.log(this.singerAlbumlist[0],'this.singerAlbumlist.al.name');
      //   this.$nextTick(()=>{
      //   if(this.$store.state.musicList!=this.singerAlbumlist){
      //  //修改vue中的musilistcid
        
      //  this.$store.commit("updatamusicList", this.singerAlbumlist);
      //   // this.$store.commit('updatamusicListId',this.albumInformationid[0]);
      //  console.log(this.singerAlbumlist,'this.singerAlbumlist');
      //  console.log(this.albumInformationid,'专辑id');
      // //  let musicListid=this.
      // }
      //   })
  

     },
      
   },
      computed:{
      signerid(){
      return this.$route.params.id
   },
 
   },
   
 }


</script>
<style scoped>
.singerHits{
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin-top: 20px;
}
.singerHitsimg img{
  width: 200px;
  height: 200px;
  border-radius: 10px;
}
.hot50{
  padding: 5px 5px 10px 0;
  font-weight: 800;
  font-size: 18px;
}
.el-table__row :nth-child(2){
float: right;
}
.allshow{
  text-align: right;
  width: 800px;
  padding: 10px;
}
</style>
