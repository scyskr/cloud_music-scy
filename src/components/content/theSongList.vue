<template>
  <div>
       <el-table
    :data="tableData"
    stripe
    style="width: 100%">
     <el-table-column
      prop="id"
      label=""
      width="40">
    </el-table-column>
    <el-table-column
      prop="date"
      label="操作"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="标题"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="歌手">
    </el-table-column>
     <el-table-column
      prop="address"
      label="专辑">
    </el-table-column>
      <el-table-column
      prop="address"
      label="时间">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  name:'thesong',
  data() {
      return {
        tableData: [{
          id:1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
             id:3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
             id:4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
}

</script>
<style>
</style>