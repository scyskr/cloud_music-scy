<template>
  <div>
    <div class="onedaytop">
        <div><img src="../../assets/img/recommendMusic.png" alt=""></div>
        <div>
            <div class="onetitle">每日歌曲推荐</div>
            <div>根据你的音乐口味生成，每天6.00更新</div>
        </div>
    </div>
    <div class="onebutton">
          <div class="allplay"><i class="iconfont icon-bofang"></i> 播放全部</div>
          <div class="collectionall"><i class="icon-xihuan iconfont"></i> 收藏全部</div>
    </div>
    <!-- 表格 -->
    <div class="tableone">
        <div class="thesonglist">
       <el-table
    :data="musicListDetailone"
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
    </div>
  
  </div>
</template>

<script>
import {handleMusicTime} from '../../plugins/ulits'
import {onesongs,musicUrl} from '../../network/app'
export default {
name:'oneday',
  data() {
      return {
      musicListDetail:[],
      musicListDetailone:[]
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
         this.$store.commit("updatamusicList", this.musicListDetailone);
      //  console.log(id,'5555555555555');
      });
      
      },
      //点击播放时改变样式
         handleDOM(current, last) {
            this.musicListDetail =this.musicListDetailone;
      if (document.querySelector(".thesonglist")) {
        let tableRows = document
          .querySelector(".thesonglist")
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
    },
    created(){
    onesongs().then(res=>{
        this.musicListDetailone=res.data.data.dailySongs;
         // 处理时间
      this.musicListDetailone.forEach((item, index) => {
        this.musicListDetailone[index].dt = handleMusicTime(item.dt);
      });
    })
    },
    watch:{
"$store.state.musicId"(current, last) {
  // console.log(current,last,'这是什么');
      this.handleDOM(current, last);
    },
   },
}

</script>
<style scoped>
.onedaytop{
    display: flex;
    align-items: center;
    gap: 18px;
}
.onetitle{
    font-size: 24px;
    font-weight: 800;
}
.onebutton{
    display: flex;
    gap: 24px;
}
.onebutton div{
    padding: 10px;
    border-radius: 20px;
    text-align: center;
    margin-left: 20px;
}
.allplay{
    background-color: #ec4141;
    color: aliceblue;
}
.collectionall{
    background-color: rgb(240, 238, 238);
}
.tableone{
    margin-top: 20px;
}
</style>