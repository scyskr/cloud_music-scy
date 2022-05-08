<template>
  <div class="singer">
       <el-backtop target=".singer" ></el-backtop>
      <div class="languages">
        <div>语种:</div>
        <div @click="languageskey(lang.id)"
         v-for="lang in languages" :key="lang.name" 
         class="languagesbox"
         :class="theDefaultLanguage==lang.id?'theDefaultLanguage':''"
         >{{lang.name}}</div>
      </div>
   <div class="classification">
        <div>分类:</div>
        <div  v-for="langclass in classification"
         :key="langclass.name"
        :class="theDefaultClassification==langclass.id?'theDefaultLanguage':''"
        @click="classificationkey(langclass.id)"
         >{{langclass.name}}</div>
   </div>  
   <div class="screening">
       <div class="serrone">筛选:</div>
       <div class="screeningson">
       <div v-for="scree in screening" :key="scree" 
       class="screebox"
       :class="theDefaultSelection==scree?'theDefaultLanguage':''"
         @click="theDefaultSelectionyes(scree)"
       >{{scree}}</div>
       </div>   
   </div>
   <div class="showing" v-infinite-scroll infinite-scroll-immediate>
       <div v-for="singer in singerList"
        :key="singer.name" 
        class="showingson"
        @click="singerclicks(singer.id)">
           <div><img :src="singer.img1v1Url" alt=""></div>
           <div>{{singer.name}}</div>
       </div>
   </div>
  </div>
</template>

<script>
import {singer} from '../../network/app'
export default {
    name:"singer",
    data(){
        return{
       languages:[{id:-1,name:'全部'},{id:7,name:'华语'},{id:96,name:'欧美'},{id:8,name:'日本'},{id:16,name:'韩国'},{id:0,name:'其他'}],
       classification:[{id:-1,name:'全部'},{id:1,name:'男歌手'},{id:2,name:'女歌手'},{id:3,name:'乐队组合'}],
       screening:['热门','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O'
       ,'P','Q','R','X','T','U','V','W','S','Y','Z','#'],
       singerList:[],
       //默认语种
       theDefaultLanguage:-1,
       //默认分类
      theDefaultClassification:-1,
       //默认筛选
       theDefaultSelection:'热门',
       types:-1,
       area:-1,
       initial:-1
        }
    },
    created(){
      singer({type:-1,area:-1,initial:-1,limit:100}).then(res=>{
        //   console.log(res.data.artists,'歌手');
          this.singerList=res.data.artists;
      })
    },
    methods:{
        languageskey(id){
         this.theDefaultLanguage=id;
         this.area=id;
         singer({type:this.types,area:this.area,initial:this.initial}).then(res=>{
             this.singerList=res.data.artists;
             console.log( this.singerList,'wssss');
         })
        },
        classificationkey(id){
         this.theDefaultClassification=id;
         this.types=id;
         singer({type:this.types,area:this.area,initial:this.initial}).then(res=>{
             this.singerList=res.data.artists;
         })
        },
        theDefaultSelectionyes(name){
            this.theDefaultSelection=name;
            if(name=='热门'){
              this.initial=-1;
            singer({type:this.types,area:this.area,initial:this.initial}).then(res=>{
             this.singerList=res.data.artists;
              })
            }
            else{
             this.initial=name;
            singer({type:this.types,area:this.area,initial:this.initial}).then(res=>{
             this.singerList=res.data.artists;
              })
            }
        
        
        },
        singerclicks(ids){
         this.$router.push('/home/singerView/singerab/'+ids);
         this.$store.commit('updatasingerId',ids);
        }
    } 
}
</script>

<style>
/* Chrome Safari */
/* .singer::-webkit-scrollbar {
  display: none; 
} */
.singer{
    overflow-y: scroll;
    height: 800px;
}
.languages{
    display: flex;
    justify-content:left;
    flex-wrap: wrap;
    gap: 30px;
    padding: 5px;
} 
.classification{
    display: flex; 
    justify-content:left;
    flex-wrap: wrap;
    gap: 30px;
    padding: 5px;
} 
.screening{
    display: flex;
    padding: 5px;
}
.screeningson{
   display: flex;
   justify-content:left;
   flex-wrap: wrap;
   gap: 31px;
} 
.serrone{
    width: 67px;
    padding: 2px 28px 0 9px;
}
.showing{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    column-gap: 10px;
    row-gap: 24px;
}
.showing img{
    width: 188px;
    height:188px;
    border-radius: 10px;
}
.showingson{
    margin-top: 20px;
}
.theDefaultLanguage{
    background-color: rgb(244, 219, 223);
    color: #F56C6C;;
    border-radius: 10px;
    }
.languages div,.classification div{
  padding: 2px 8px;
    }
.screening .screeningson div{
     padding: 2px 8px;
}
    
</style>