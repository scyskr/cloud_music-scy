<template>
  <div class="listOfLadder">
          <!-- 飙升榜 -->
    <div>
      <div class="listofladdertit">官方榜</div>
      <div class="listOfLaddercontent">
          <div><img :src="tableDatakey.coverImgUrl" alt="111"></div>
          <div>
  <el-table
    :data="tableDatakeyall"
    :show-header="istableth"
    stripe
    style="width: 100%"
    @row-dblclick="Datakeybiao">
    <el-table-column
      prop="name"
      width="650"
    >
    </el-table-column>
    <el-table-column
      prop="ar[0].name"
      width="180">
    </el-table-column>
  </el-table>     <div class="lookAtAlllist" @click="tableDatakeyallkiss">查看全部     <i class="icon-arrow-right-bold iconfont "></i></div>
     </div>
      </div>
    </div>
    <!-- 新歌榜 -->
      <div>
      <div class="listofladdertit"></div>
      <div class="listOfLaddercontent">
          <div><img :src="aNewSongListkey.coverImgUrl" alt="111"></div>
          <div>
  <el-table
    :data="aNewSongList"
    :show-header="istableth"
    stripe
    style="width: 100%"
    @row-dblclick="aNewSongListkiss">
    <el-table-column
      prop="name"
      width="650"
    >
    </el-table-column>
    <el-table-column
      prop="ar[0].name"
      width="180">
    </el-table-column>
  </el-table>     <div class="lookAtAlllist" @click="aNewSongxin">查看全部     <i class="icon-arrow-right-bold iconfont "></i></div>
     </div>
      </div>
    </div>
       <!-- 原创榜 -->
      <div>
      <div class="listofladdertit"></div>
      <div class="listOfLaddercontent">
          <div><img src="https://p2.music.126.net/iFZ_nw2V86IFk90dc50kdQ==/109951166961388699.jpg" alt="111"></div>
          <div>
  <el-table
    :data="theOriginalList"
    :show-header="istableth"
    stripe
    style="width: 100%"
    @row-dblclick="theOriginalListuyuan"
    >
    <el-table-column
      prop="name"
      width="650"
    >
    </el-table-column>
    <el-table-column
      prop="ar[0].name"
      width="180">
    </el-table-column>
  </el-table>     <div class="lookAtAlllist" @click="theOriginalLiskiss">查看全部     <i class="icon-arrow-right-bold iconfont "></i></div>
     </div>
      </div>
    </div>
       <!-- 热歌榜 -->
      <div>
      <div class="listofladdertit"></div>
      <div class="listOfLaddercontent">
          <div><img src="https://p2.music.126.net/ZyUjc7K_GDpD8MO1-GQkmA==/109951166952706664.jpg" alt="111"></div>
          <div>
  <el-table
    :data="hotSongList"
    :show-header="istableth"
    stripe
    style="width: 100%"
    @row-dblclick="hotSongListre">
    <el-table-column
      prop="name"
      width="650"
    >
    </el-table-column>
    <el-table-column
      prop="ar[0].name"
      width="180">
    </el-table-column>
  </el-table>     <div class="lookAtAlllist" @click="hotSongListkiss">查看全部     <i class="icon-arrow-right-bold iconfont "></i></div>
     </div>
      </div>
    </div>
    <div>
       <div class="listofladdertit">全球榜</div>
       <global-playlist></global-playlist>
       </div>
      </div>
</template>
<script> 
import {toplist,thePlaylist,toplistall,playlist} from '../../network/app'
import globalPlaylist from './listOfPlayliststheGlobal.vue'
import {handleMusicTime} from '../../plugins/ulits'
export default {
     name:'listofladder',
 data() {
      return {
        //飙升榜
        tableDatakey:[],
        //飙升榜精确 
        tableDatakeyaccurate:[],
        //飙升榜前五
        tableDatakeyallkk:[],
        tableDatakeyall:[],
        istableth:false,
         //新歌榜榜前五
        aNewSongListkey:[],
        aNewSongList:[],
         //原创榜前五
       theOriginalListkk:[],
       theOriginalList:[],
         //热歌榜前五
         hotSongListkkk:[],
        hotSongList:[],
        ones:1,
      }
    },
    created(){
      //飙升榜前五
        playlist({id:19723756}).then(res=>{
           let arr1=res.data.playlist.tracks[0];
           let arr2=res.data.playlist.tracks[1];
           let arr3=res.data.playlist.tracks[2];
           let arr4=res.data.playlist.tracks[3];
           let arr5=res.data.playlist.tracks[4];
           const arr=[arr1,arr2,arr3,arr4,arr5];
          this.tableDatakeyall=arr;
          this.tableDatakey=res.data.playlist;
        }); 
  
        // toplist({id:19723756}).then(res=>{
        //   this.tableDatakey=res.data.playlist;
        //   // console.log(res,"111");
        // });
        // toplistall({}).then(res=>{
        // // this.tableDatakeyall=res.data.playlist;
        //       console.log(res.data.list[0].id,"222");
        // });
        //      toplistallcontent({id:3779629}).then(res=>{
        //    this.tableDatakeyall=res.data.list[0].tracks;
        //     //  console.log(res.data,"333");
        // });
         //获新歌榜榜单前五
       playlist({id:3779629}).then(res=>{
           let arr1=res.data.playlist.tracks[0];
           let arr2=res.data.playlist.tracks[1];
           let arr3=res.data.playlist.tracks[2];
           let arr4=res.data.playlist.tracks[3];
           let arr5=res.data.playlist.tracks[4];
           const arr=[arr1,arr2,arr3,arr4,arr5];
               this.aNewSongList=arr;
               this.aNewSongListkey=res.data.playlist;
        });
        //原创榜前五
         playlist({id:2884035}).then(res=>{
           let arr1=res.data.playlist.tracks[0];
           let arr2=res.data.playlist.tracks[1];
           let arr3=res.data.playlist.tracks[2];
           let arr4=res.data.playlist.tracks[3];
           let arr5=res.data.playlist.tracks[4];
           const arr=[arr1,arr2,arr3,arr4,arr5];
               this.theOriginalList=arr;
        });
        //热歌榜前五
          playlist({id:3778678}).then(res=>{
           let arr1=res.data.playlist.tracks[6];
           let arr2=res.data.playlist.tracks[7];
           let arr3=res.data.playlist.tracks[8];
           let arr4=res.data.playlist.tracks[9];
           let arr5=res.data.playlist.tracks[10];
           const arr=[arr1,arr2,arr3,arr4,arr5];
               this.hotSongList=arr;
        });
    },
    components:{
      globalPlaylist
    },
    methods:{
      //查看全部飙升榜
      tableDatakeyallkiss(){
          this.$router.push('/home/playlist/'+19723756); 
      },
      //点击飙升榜里的歌曲飙升榜
      Datakeybiao(row){
      thePlaylist({id:19723756}).then(res=>{
       this.tableDatakeyaccurate=res.data.playlist.tracks;
              // 处理播放时间
            this.$store.commit("updatemusicId", row.id); 
        this.tableDatakeyaccurate.forEach((item, index) => {
        this.tableDatakeyaccurate[index].dt = handleMusicTime( item.dt);
        //  this.ones=2;
      });
        //修改vue中的musilistcid
       this.$store.commit("updatamusicList", this.tableDatakeyaccurate);
        })
    
      },
     //点击新歌榜里的歌曲
      aNewSongListkiss(row){
       thePlaylist({id:3779629}).then(res=>{
       this.tableDatakeyallkk=res.data.playlist.tracks;
        this.$store.commit("updatemusicId", row.id);
         // 处理播放时间
      this.tableDatakeyallkk.forEach((item, index) => {
        this.tableDatakeyallkk[index].dt = handleMusicTime( item.dt);
      });
       //修改vue中的musilistcid
       this.$store.commit("updatamusicList", this.tableDatakeyallkk);
        })
      },
        //查看全部新歌榜
      aNewSongxin(){
    this.$router.push('/home/playlist/'+3779629); 
      },
      //点击原创榜里的歌曲
      theOriginalListuyuan(row){
     thePlaylist({id:2884035}).then(res=>{
       this.theOriginalListkk=res.data.playlist.tracks;
          this.$store.commit("updatemusicId", row.id);
           // 处理播放时间
      this.theOriginalListkk.forEach((item, index) => {
        this.theOriginalListkk[index].dt = handleMusicTime( item.dt);
      });
       //修改vue中的musilistcid
       this.$store.commit("updatamusicList", this.theOriginalListkk);
        })
      },
      //点击查看全部原创榜
      theOriginalLiskiss(){
          this.$router.push('/home/playlist/'+2884035); 
      },
      //点击热歌榜里的歌曲
      hotSongListre(row){
         thePlaylist({id:3778678}).then(res=>{
       this.hotSongListkkk=res.data.playlist.tracks;
       this.$store.commit("updatemusicId", row.id);
         // 处理播放时间
      this.hotSongListkkk.forEach((item, index) => {
        this.hotSongListkkk[index].dt = handleMusicTime( item.dt);
      });
       //修改vue中的musilistcid
       this.$store.commit("updatamusicList", this.hotSongListkkk);
        })
      },
      //点击查看全部热歌榜
      hotSongListkiss(){
          this.$router.push('/home/playlist/'+3778678); 
      }
    } 
  
        
}
</script>

<style>
.listofladdertit{
  font-family: "微软雅黑";
  font-size: 24px;
  padding: 10px;
}
.listOfLaddercontent{
    display: grid;
    grid-template-columns: 2fr 5fr;
}
.listOfLaddercontent img{
    width: 300px;
    height: 240px;
    border-radius: 10px;
}
.el-table__row :nth-child(2){
   text-align: right;
 }
 .lookAtAlllist{
      text-align: left;
      padding: 10px}
</style>