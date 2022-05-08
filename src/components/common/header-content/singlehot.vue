<template>
  <div class="thesonglist1">
    <div class="tips">找到{{singerCount}}首单曲</div>
    <div class="theBestMatch">最佳匹配</div>
    <div class="aMatchObjectlist">
    <div class="aMatchObject" v-for="(machsinger,index) in matchTheSinger" :key="index" @click="singerindexs(machsinger.id)">
      <div class="amimg"><img :src="machsinger.picUrl" alt=""></div>
      <div class="aMasinger">歌手：{{machsinger.name}}
       <div class="aMafans">粉丝:{{machsinger.fansSize}},<span>音乐数量:{{machsinger.musicSize}}</span></div>
      </div>
    </div>
     <div class="aMatchObject" v-for="(machsinger,index) in matchThePlaylist" :key="index">
      <div class="amimg"><img :src="machsinger.coverImgUrl" alt="" class="amings"></div>
      <div class="aMasinger">歌单:{{machsinger.name}}
       <div class="aMafans">歌曲:{{machsinger.trackCount}},<span>播放:{{machsinger.playCount}}</span></div>
      </div>
    </div>
    </div>
     <div>
       <el-table
    :data="searchSingerList"
    stripe
    style="width: 100%"
     @row-dblclick="andclick"
     highlight-current-row
     :row-key="
              (row) => {
                return row.id;
              }
          ">
    <el-table-column
      prop=""
      label=""
      width="40"
      type="index">
    </el-table-column>
    <el-table-column
      prop="name"
      label="音乐标题"
      width="300">
    </el-table-column>
    <el-table-column
      prop="ar[0].name"
      label="歌手"
      width="300">
    </el-table-column>
    <el-table-column
      prop="al.name"
      label="专辑"
      width="300">
    </el-table-column>
    <el-table-column
      prop="dt"
      label="时长">
    </el-table-column>  
  </el-table>
     </div>
  </div>
</template>

<script>
import {cloudsearch,searchcloudsearch,musicUrl} from '../../../network/app'
import {handleMusicTime} from '../../../plugins/ulits'
export default {
 name:"singlehot",
 data(){
   return{
        singerCount:[],
        searchSingerList:[],
        matchTheSinger:[],
        matchThePlaylist:[],
        musicListDetail:null
   }
 },
  methods:{
      //点击获取音乐id 并更新vuex的数据
      andclick(id){
          // console.log(id.id,"444");
      musicUrl({id:id.id}).then(res=>{
        //更新musciid
          this.$store.commit("updatemusicId", id.id);
          //更新musciurl
        this.$store.commit("updatemusicurl", res.data.data[0].url);
      //  console.log(id,'5555555555555');
      });
      
      },
      //点击播放时改变样式
         handleDOM(current, last) {
             this.musicListDetail =this.searchSingerList;
      if (document.querySelector(".thesonglist1")) {
        let tableRows = document
          .querySelector(".thesonglist1")
          .querySelectorAll(".el-table__row");
        // // 遍历当前musicList 找到当前播放的index的行进行渲染
      //  console.log(this.musicListDetail,'xxxxxxxx');
        let index = this.musicListDetail.findIndex(
          (item) => item.id == current
        );
        // console.log(index,'得到的下标');
        if (index != -1) {
          // 直接修改dom样式的颜色无效  可能是因为第三方组件的原故
          // 通过引入全局样式解决
          // 将正在播放的音乐前面的索引换成小喇叭
          tableRows[index].children[0].querySelector(
            ".cell"
          ).innerHTML = `<div><i class="iconfont icon-yinliang"></i></div>`;
          tableRows[index].children[0]
            .querySelector(".iconfont")
            .classList.add("currentRow");
          tableRows[index].children[2]
            .querySelector(".cell")
            .classList.add("currentRow");
        }
        // 清除上一首的样式
        if (last != -1) {
          let lastIndex = this.musicListDetail.findIndex(
            (item) => item.id == last
          );
          if (lastIndex != -1) {
            // 将上一个播放的dom的小喇叭换回索引
            tableRows[lastIndex].children[0].querySelector(
              ".cell"
            ).innerHTML = `<div>${
              lastIndex + 1 < 10 ? "0" + (lastIndex + 1) : lastIndex + 1
            }</div>`;

            // 将上一首的类名删掉  小喇叭的html已经被替换了，不需要再还原
            tableRows[lastIndex].children[2]
              .querySelector(".cell")
              .classList.remove("currentRow");
          }
        }
      }
    },
    singerindexs(id){
        this.$store.commit('updatasingerId',id);
      this.$router.push('/home/singerView/singerab/'+id);
    }
    },
       watch:{
"$store.state.musicId"(current, last) {
  // console.log(current,last,'这是什么');
      this.handleDOM(current, last);
    },
   },
 created(){
   cloudsearch({keywords:this.$route.params.id}).then(res=>{
  this.singerCount = res.data.result.songCount;
      this.searchSingerList = res.data.result.songs;
      this.$store.commit('updatamusicList', this.searchSingerList)
      // this.musicListDetail=res.data.result.artists;
        // 对数据的音乐时长进行处理
      this.searchSingerList.forEach((item, index) => {
        this.searchSingerList[index].dt = handleMusicTime(item.dt);
      });
      this.$store.commit('updatatheQuery',this.$route.params.id)
   });
    searchcloudsearch({keywords:this.$route.params.id}).then(res=>{
      this.matchTheSinger=res.data.result.artist;
      this.matchThePlaylist=res.data.result.playlist;
   })
 },


}

</script>
<style scoped>
.tips{
  font-size: 24px;
  font-weight: 800;
  padding: 10px;
}
.theBestMatch{
padding: 0px 0 10px 10px;
}
.aMatchObject{
display: flex;
    align-items: center;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    background-color: #f4f4f4;
    width: 270px;
    height: 65px;
    margin-bottom: 20px;
    cursor: pointer;
    margin-left: 6px;
}
.amimg img{
    border-radius: 5px;
    vertical-align: middle;
    margin-left: 2px;
    width: 48px;
    height: 48px;
}
.aMasinger{
  padding: 5px;
  font-size: 16px;
}
.aMafans{
  font-size: 14px;
  color: rgb(172, 172, 172);
}
.aMatchObjectlist{
  display: flex;
}
.amings{
  border-radius: 50%;
    width: 60px;
    height: 60px;
    vertical-align: middle;
}
</style>