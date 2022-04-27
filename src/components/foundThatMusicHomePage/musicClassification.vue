<template>
 <div class="mcfindex">
  <el-popover
  placement="bottom"
  width="400"
  trigger="click"
  v-model="isshowpopover"
>
  <div class="mcfclassification macfmaxhei" ref="mcfitemmcf">
    <div v-if="mcfclassification.length==0">....正在加载....</div>
    <div class="mcfitem " v-for="itemmcf in mcfclassification" 
     :class="itemmcf.name==ismcfitem?'active':''" :key="itemmcf.name"
      @click="btnmcfmfc(itemmcf.name)">{{itemmcf.name}}</div>
  </div>
  <el-button slot="reference"  class="mcfbtnshow">{{ismcfitem}} 
    <i class="icon-arrow-right-bold iconfont "></i></el-button>
</el-popover>
<div class="selectedPlaylistsright">
       <div class="selectedPlaylistsrightitem1"
        @click="mcfbtnright(itemmcfrig.name)" v-for="itemmcfrig in playlisthothot"
         :key="itemmcfrig.id" :class="itemmcfrig.name==ismcfitem?'selectedPlaylistsrightitem':''">{{itemmcfrig.name}}</div>
</div>
</div>

</template>

<script>
import {songSingleClassification,playlisthot} from '../../network/app'
export default {
  name:'mcf',
   data() {
      return {
       mcfclassification:[],
       //默认华语
       ismcfitem:'华语',
       //是否显示分类框
       isshowpopover:false,
       //热门分类
      playlisthothot:[],
      //  //默认右边热门分类是华语
      //  ismcfitemfigth:'华语'
      };
    },
    created(){
      songSingleClassification({}).then(res=>{
        this.mcfclassification=res.data.sub;
        //  console.log(res.data.sub);
      }),
      //获取热门分类
       playlisthot({}).then(res=>{
       this.playlisthothot=res.data.tags;
      //  console.log(res.data.tags);
   })
    },
    methods:{
      //点击分类
  btnmcfmfc(name){
  this.ismcfitem=name;
  //子组件向父组件传递分类类型
   this.$emit('mcfclick',name);
   this.$store.commit('updataclassicSongSing',name);
   this.isshowpopover=false;
  },
  //点击右侧的热门分类
  mcfbtnright(name){
      this.ismcfitem=name;
       this.$emit('mcfclick',name);
       this.$store.commit('updataclassicSongSing',name)
  }
    },
    components:{
     
    }
}
</script>

<style>
.mcfindex{
  display: grid;
  grid-template-columns: 1fr 2fr;
    align-content: center;
}
.mcfclassification{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  text-align: center;
    cursor: pointer;
    column-gap: 12px;
    row-gap: 12px;
 
}
.mcfitem{
  padding: 5px;
  border-radius: 40px;
}
.mcfitem:hover{
 color: #F56C6C;
}
.mcfactive{
  background-color: #F2F6FC;
  color: #F56C6C;
}
.macfmaxhei{
  max-height: 400px;
  overflow: hidden;
  overflow-y: scroll;
}
.mcfbtnshow{
  margin-top: 20px;
  padding: 7px 16px;
  border-radius: 20px;
}
.selectedPlaylistsright{
    text-align: right;
}
.selectedPlaylistsright{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ;
  align-content: center;

}
.selectedPlaylistsrightitem1{
    margin-top: 20px;
      text-align: center;
}
.selectedPlaylistsrightitem{
  background-color: rgb(253, 243, 244);
  color: #F56C6C;
  border-radius: 15px;
}
</style>