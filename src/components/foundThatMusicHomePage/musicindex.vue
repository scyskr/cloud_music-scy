<template>
<div>
<div >
     <keep-alive>
  <div class="musciindexkiss">
  <div class="musictabs">
  <div v-for="nav in navBarData" :key="nav.name"
  @click="btnnav(nav.name,nav.path)"
  :class="nav.path==$route.path?'musictabsactive':''"
  >{{nav.name }}</div>
  </div>
  </div>
   </keep-alive>
   <keep-alive>
    <router-view></router-view>
    </keep-alive>
   <!-- <el-tabs v-model="activeName" >
    <el-tab-pane label="个性推荐" name="first" ><router-view></router-view></el-tab-pane>
    <el-tab-pane label="专属定制" name="second" ><exclus></exclus></el-tab-pane>
    <el-tab-pane label="歌单" name="third"><seethe></seethe></el-tab-pane>
    <el-tab-pane label="排行榜" name="fourth"><listofladder></listofladder></el-tab-pane>
    <el-tab-pane label="歌手" name="singer"><singer></singer></el-tab-pane>
    <el-tab-pane label="最新音乐" name="theLatestMusic">最新音乐</el-tab-pane>
  </el-tabs> -->
  </div>
  </div>
</template>
       
<script>
export default {
   name:'foutthat',
    data() {
      return {
        activeName: 'first',
        activeNames:'个性推荐',
         navBarData: [
        { name: "个性推荐", path: "/home/foutthat/recomm" },
        { name: "专属定制", path: "/home/foutthat/exclus" },
        { name: "歌单", path: "/home/foutthat/seethe" },
        { name: "排行榜", path: "/home/foutthat/listofladder" },
        { name: "歌手", path: "/home/foutthat/singer" },
      ],
      };
    },
    methods: {
    btnnav(names,path){
    // this.activeNames=name;
     this.$store.commit("updatatabke", names);
      this.$router.push(path);
    // console.log(this.$route.path);

    }
    },
    components:{
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