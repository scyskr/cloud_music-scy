<template>
  <div class="singerDesc">
    {{singerSimilar.briefDesc}}
  </div>
</template>

<script>
import {singerdetail} from '../../network/app'
export default {
  name:'similarToSinger',
  data(){
    return{
      singerSimilar:[]
    }
  },
  created(){
    singerdetail({id:this.$store.state.singerId}).then(res=>{
     this.singerSimilar=res.data.data.artist;
    })
  }
}

</script>
<style scoped>
.singerDesc {
  margin-top: 10px;
  font-size: 16px;
  color: #373737;
  line-height: 25px;
  letter-spacing: 0.5px;
  text-indent: 2em;
}
</style>
