<template>
  <div>
      <div class="musictabs">
  <div v-for="nav in navBarData" :key="nav.name"
  @click="btnnav(nav.name,nav.path)"
  :class="nav.path==$route.path?'musictabsactive':''"
  >{{nav.name }}</div>
  </div>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
    </div>
</template>

<script> 
export default { 
 name:'hotsearch',
 data(){
   return{
       navBarData: [
        { name: "单曲", path: "/home/hotsearch/singlehot/"+this.$route.params.id},
        { name: "歌手", path: "/home/hotsearch/singerhot" },
        { name: "专辑", path: "/home/hotsearch/theAlbumhot" },
        { name: "视频", path: "/home/hotsearch/videohot" },
        { name: "歌单", path: "/home/hotsearch/playlisthot" },
      ],
   }
 },
     methods: {
    btnnav(names,path){
    // this.activeNames=name;
    //  this.$store.commit("updatatabke", names);
    this.$router.push(path);
    // console.log(this.$route.path);

    }
    },
}

</script>
<style scoped>
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