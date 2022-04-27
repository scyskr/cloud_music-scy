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
    style="width: 100%">
    <el-table-column
      prop="name"
      width="650"
    >
    </el-table-column>
    <el-table-column
      prop="alia"
      width="180">
    </el-table-column>
  </el-table>     <div class="lookAtAlllist">查看全部     <i class="icon-arrow-right-bold iconfont "></i></div>
     </div>
      </div>
    </div>
    <!-- 新歌榜 -->
      <div>
      <div class="listofladdertit"></div>
      <div class="listOfLaddercontent">
          <div><img src="https://p2.music.126.net/wVmyNS6b_0Nn-y6AX8UbpQ==/109951166952686384.jpg" alt="111"></div>
          <div>
  <el-table
    :data="aNewSongList"
    :show-header="istableth"
    stripe
    style="width: 100%">
    <el-table-column
      prop="name"
      width="650"
    >
    </el-table-column>
    <el-table-column
      prop="alia"
      width="180">
    </el-table-column>
  </el-table>     <div class="lookAtAlllist">查看全部     <i class="icon-arrow-right-bold iconfont "></i></div>
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
    style="width: 100%">
    <el-table-column
      prop="name"
      width="650"
    >
    </el-table-column>
    <el-table-column
      prop="alia"
      width="180">
    </el-table-column>
  </el-table>     <div class="lookAtAlllist">查看全部     <i class="icon-arrow-right-bold iconfont "></i></div>
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
    style="width: 100%">
    <el-table-column
      prop="name"
      width="650"
    >
    </el-table-column>
    <el-table-column
      prop="alia"
      width="180">
    </el-table-column>
  </el-table>     <div class="lookAtAlllist">查看全部     <i class="icon-arrow-right-bold iconfont "></i></div>
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
import {toplist,thePlaylist,toplistall} from '../../network/app'
import globalPlaylist from './listOfPlayliststheGlobal.vue'
export default {
     name:'listofladder',
 data() {
      return {
        //飙升榜
        tableDatakey:[],
        //飙升榜前五
        tableDatakeyall:[],
        istableth:false,
         //新歌榜榜前五
        aNewSongList:[],
         //原创榜前五
       theOriginalList:[],
         //热歌榜前五
        hotSongList:[],
      }
    },
    created(){
        toplist({id:19723756}).then(res=>{
          this.tableDatakey=res.data.playlist;
          // console.log(res,"111");
        });
        toplistall({}).then(res=>{
        // this.tableDatakeyall=res.data.playlist;
              console.log(res,"222");
        });
        //      toplistallcontent({id:3779629}).then(res=>{
        //    this.tableDatakeyall=res.data.list[0].tracks;
        //     //  console.log(res.data,"333");
        // });
        //获取飙升单前五的歌曲
        toplist({id:19723756}).then(res=>{
           let arr1=res.data.playlist.tracks[0];
           let arr2=res.data.playlist.tracks[1];
           let arr3=res.data.playlist.tracks[2];
           let arr4=res.data.playlist.tracks[3];
           let arr5=res.data.playlist.tracks[4];
           const arr=[arr1,arr2,arr3,arr4,arr5];
               this.tableDatakeyall=arr;
        });
         //获新歌榜榜单前五
       toplist({id:3779629}).then(res=>{
           let arr1=res.data.playlist.tracks[0];
           let arr2=res.data.playlist.tracks[1];
           let arr3=res.data.playlist.tracks[2];
           let arr4=res.data.playlist.tracks[3];
           let arr5=res.data.playlist.tracks[4];
           const arr=[arr1,arr2,arr3,arr4,arr5];
               this.aNewSongList=arr;
        });
        //原创榜前五
               toplist({id:2884035}).then(res=>{
           let arr1=res.data.playlist.tracks[0];
           let arr2=res.data.playlist.tracks[1];
           let arr3=res.data.playlist.tracks[2];
           let arr4=res.data.playlist.tracks[3];
           let arr5=res.data.playlist.tracks[4];
           const arr=[arr1,arr2,arr3,arr4,arr5];
               this.theOriginalList=arr;
        });
        //热歌榜前五
          toplist({id:2884035}).then(res=>{
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