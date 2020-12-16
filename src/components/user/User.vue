<template>
  <div>
    <!-- 面包屑区域 -->

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--  卡片视图区域 -->

    <el-card class="box-card">
     
      <el-row :gutter="199">
        <el-col :span="8">
             
              <el-input placeholder="请输入内容">
             <el-button slot="append" icon="el-icon-search"></el-button>
               </el-input>


        </el-col>
        <el-col :span="6">

          <el-button>添加用户</el-button>

        </el-col>
        
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "User",
};
</script>

<style lang = "less" scoped>
.el-card {
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
}
</style>