<template>
  <div>
    <div class="thesonglist">
       <el-table
    :data="albumlistson.songs"
    stripe
    style="width: 100%"
    class="thesong"
    @row-dblclick="andclick"
     highlight-current-row
     :row-key="
              (row) => {
                return row.id;
              }
          "
     >
     <el-table-column
      prop=""
      label=""
      width="40"
      type="index"
     >
    </el-table-column>
    <el-table-column
      prop="name"
      label="音乐标题"
      width="300">
    </el-table-column>
    <el-table-column
      prop="ar[0].name"
      label="歌手"
      width="300"
     >
    </el-table-column>
     <el-table-column
      prop="al.name"
      label="专辑"
      width="300">
    </el-table-column>
      <el-table-column
      prop="dt"
      label="时间"
     >
    </el-table-column>
  </el-table>
  </div>
  <div class="loginmoreAndMore" v-if="$store.state.loginuser==false">登录查看更多</div>
  </div>
</template>

<script>
import { handleMusicTime } from "../../plugins/ulits"
import {album,musicUrl} from '../../network/app'
export default {
 name:'albumListson',
  data(){
      return{
        albumlistson:[],
        musicListDetail:[]
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
          // console.log(res.data.data[0].url);
        this.$store.commit("updatemusicurl", res.data.data[0].url);
      //  console.log(id,'5555555555555');
      });
      
      },
     contentOfTheAlbum()
     {
      album({id:this.$route.params.id}).then(res=>{
           res.data.songs.forEach((item, index) => {
        res.data.songs[index].dt = handleMusicTime(item.dt);
      });
        this.albumlistson=res.data;
        this.$store.commit("updatamusicList", this.albumlistson.songs);
        this.$store.commit("updataalbumId",this.$route.params.id);
        
      })
     },
      //点击播放时改变样式
         handleDOM(current, last) {
            this.musicListDetail =this.albumlistson;
      if (document.querySelector(".thesonglist")) {
        let tableRows = document
          .querySelector(".thesonglist")
          .querySelectorAll(".el-table__row");
        // // 遍历当前musicList 找到当前播放的index的行进行渲染
      //  console.log(this.musicListDetail,'xxxxxxxx');
        let index = this.musicListDetail.tracks.findIndex(
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
          let lastIndex = this.musicListDetail.tracks.findIndex(
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
    },
    filters:{
      fl(timer){
        	let cont=	Math.floor(Math.round(timer/1000)/60);
				let conts= Math.round(timer/1000)%60;
        let ti=(cont<10?'0'+cont:cont)+ ':'+ (conts<10?'0'+conts:conts);
        return ti;
      }
    },
   created(){
  this.contentOfTheAlbum();  
  },
   watch:{
"$store.state.musicId"(current, last) {
  // console.log(current,last,'这是什么');
      this.handleDOM(current, last);
    },
"$store.state.albumId"(current, last){
    this.contentOfTheAlbum();
    }
   },
}
</script>

<style>
.el-tabs__content .cell{
  text-align: left;
  max-width: 300;
  overflow: hidden;
  white-space: nowrap;  /* 设置文字在一行显示不能换行） */
  text-overflow: ellipsis; /* （规定当文本溢出时显示省略符号来代表被修剪的文本）*/
}
.loginmoreAndMore{
 height: 100px;
 text-align: center;
 padding: 30px;
}
</style> 