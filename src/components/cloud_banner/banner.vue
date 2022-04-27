<template>
  <div id="banner">
    <el-row :gutter="10">
  <el-col :span="6">
    <div class="grid-content bg-purple">
         <slot name="logos"><logo></logo></slot>
      </div></el-col>
  <el-col :span="9">
    <div class="grid-content bg-purple">
        <slot name="logos"><inmofct></inmofct></slot>
      </div></el-col>
  <el-col :span="9">
    <div class="grid-content bg-purple">
        <slot name="logos"><login></login></slot>
      </div></el-col>
    </el-row>
  </div>
</template>

<script>
import inmofct from "../common/header-content/inmofct.vue"
import  logo from '../common/header-left/logoslot.vue'
import login from '../common/header-rigth/login.vue'
export default {
    name:"banner",
    components:{
      logo,
      inmofct,
      login
    }
}

</script>
<style lang="scss">
 #banner{
     width: 100%;
     background-color: #ec4141;
    //  height: 20%;
    position: fixed;
    z-index: 10;
 }
  .el-row {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    // background: #99a9bf;
  }
  .bg-purple {
   //background: #d3dce6;
   display: flex;
   align-items: center;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>