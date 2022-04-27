<template>
<div>
   <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="个性推荐" name="first"><router-view></router-view></el-tab-pane>
    <el-tab-pane label="专属定制" name="second"><exclus></exclus></el-tab-pane>
    <el-tab-pane label="歌单" name="third"><seethe></seethe></el-tab-pane>
    <el-tab-pane label="排行榜" name="fourth"><listofladder></listofladder></el-tab-pane>
    <el-tab-pane label="歌手" name="singer">歌手</el-tab-pane>
    <el-tab-pane label="最新音乐" name="theLatestMusic">最新音乐</el-tab-pane>
  </el-tabs>
  </div>
</template>
       
<script>
import exclus from './exclusiveCustom.vue'
import seethe from './seeThePlaylist.vue'
import listofladder from './listOfLadder.vue'
export default {
   name:'foutthat',
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
    components:{
      exclus,
      seethe,
      listofladder
    }
}
</script>

<style>
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
</style>