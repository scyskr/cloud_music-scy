<template>
  <div>
    <!-- 分类 -->
      <div class="selectTheMv">
        <div class="selectorItem">
        <div class="title">地区：</div>
        <div class="navBar secondNavBar">
            <div class="barItem"
            v-for="(areas,index) in areaList" :key="index"
            @click="passared(areas.name)"
            :class="area==areas.name?'activemv':''">
            {{areas.name}}
            </div>
        </div>
      </div>
        <div class="selectorItem">
        <div class="title">类型:</div>
        <div class="navBar secondNavBar">
            <div class="barItem"
            v-for="(typeList,index) in typeList" :key="index"
            @click="passtyoe(typeList.name)"
             :class="type==typeList.name?'activemv':''">
            {{typeList.name}}
            </div>
        </div>
      </div>
          <div class="selectorItem">
        <div class="title">排序:</div>
        <div class="navBar secondNavBar">
            <div class="barItem"
            v-for="(orderList,index) in orderList" :key="index"
            @click="passorder(orderList.name)"
             :class="order==orderList.name?'activemv':''">
            {{orderList.name}}
            </div>
        </div>
      </div>
      </div>
      <!-- mv -->
      <div class="cardList">
      <div class="videoListCard">
       <div class="cardItem" v-for="(mvlists,index) in mvList" :key="index"
       @click="passvideomv(mvlists.id)">
         <div class="videoCover">
          <img :src="mvlists.cover+'?param=280y143'" alt="">
          <div class="playCount">
            <i class="iconfont icon-shipin">{{mvlists.playCount | handleNum}} </i>
          </div>
         </div>
         <div class="videoTitles">{{mvlists.name}}</div>
         <div class="singers">{{mvlists.artistName}}</div>
       </div>
      </div>
      </div>
  </div>
</template>

<script>
import {mvall} from '../../network/app'
import { handleNum } from "../../plugins/ulits";
export default {
name:'videoMV',
 data() {
    return {
      // mv 地区
      areaList: [
        { name: "全部", path: "" },
        { name: "内地", path: "内地" },
        { name: "港台", path: "港台" },
        { name: "欧美", path: "欧美" },
        { name: "日本", path: "日本" },
        { name: "韩国", path: "韩国" },
      ],
      // mv 类型
      typeList: [
        { name: "全部", path: "" },
        { name: "官方版", path: "官方版" },
        { name: "原生", path: "原生" },
        { name: "现场版", path: "现场版" },
        { name: "网易出品", path: "网易出品" },
      ],
      // 排序
      orderList: [
        { name: "上升最快", path: "" },
        { name: "最热", path: "最热" },
        { name: "最新", path: "最新" },
      ],
        // 当前地区
      area: "全部",
      // 当前类型
      type: "全部",
      // 当前排序
      order: "上升最快",
      mvList:[]
      }
    },
    methods:{
      getallmv(){
        mvall({area:this.area,type:this.type,order:this.order}).then(res=>{
         this.mvList=res.data.data;
         console.log( this.mvList);
      })
      },
      passared(name){
        this.area=name;
       this.getallmv();
      },
      passtyoe(name){
        this.type=name;
       this.getallmv();
      },
      passorder(name){
        this.order=name;
       this.getallmv();
      },
     passvideomv(id){
       this.$store.commit('videotype','mv');
       this.$router.push('/home/videodetail/'+id)
     }
    },
  created(){
    this.getallmv();
  },
  filters:{
   handleNum
  }
}

</script>
<style>
.selectTheMv{
  padding: 0px 25px;
    transform: translateY(-10px);
    margin-top: 30px;
}
.selectorItem{
  display: flex;
  align-items: center;
}
.selectorItem .title{
  font-size: 15px;
    width: 60px;
    /* line-height: 33px; */
}
.navBar{
display: flex;
 flex-wrap: wrap;
} 
.secondNavBar{
  width: calc(100% - 60px);
}
.barItem{
width: 65px;
    margin: 4px -2px;
    padding: 6px 10px;
    font-size: 16px;
    text-align: center;
    box-sizing: content-box;
    transform: scale(0.9, 0.9);
    cursor: pointer
} 
.activemv{
      background-color: #fdf5f5;
       color: #ec4747;
      border-radius: 11px;
}
.videoListCard{
  width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    justify-content: center;
    margin-top: 20px;
}
.cardList{
  overflow-y: scroll;
    height: calc(80vh - 265px);
}
.cardItem{
  max-width: 270px;
    width: 18.64vw;
    margin-right: 1%;
    margin-left: 1%;
    margin-bottom: 20px;
    cursor: pointer;
}
.videoCover{
  position: relative;
    height: 9.28vw;
    width: 100%;
    max-height: 144px;
    overflow: hidden;
    border-radius: 10px;
    display: flex;
    align-items: center;
    background-color: black;
}
.playCount{
  font-size: 12px;
    color: white;
    position: absolute;
    top: 0;
    right: 5px;
    transform: scale(0.9);
}
.videoTitles{
      margin-top: 8px;
    font-size: 16px;
    line-height: 16px;
    color: rgb(32, 32, 32);
    word-break: break-all;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
}
.singers{
  font-size: 16px;
    transform: scale(0.9) translateX(-5%);
    margin: 1px 0 0 -1px;
    padding: 0;
}
</style>