<template>
  <el-container>
    <!-- // 头部区域 -->
    <el-header>
      <div class="logo">
        <img src="../assets/55368255.jpg" alt="" />
        <span> 电商后台管理系统 </span>
      </div>

      <el-button type="info" v-on:click="logout">退出</el-button></el-header
    >

    <!-- 内容主体区域 -->
    <el-container>
      <!-- // 左侧菜单栏区域 -->

      <el-aside width="200px">
        <!-- 侧边栏菜单区域 -->

        
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-location"></i>
              <!-- 文本
               -->
              <span>导航一</span>
            </template>
            <!-- 二级菜单 -->
               <el-menu-item index="1-4-1">
                  
                  <i class="el-icon-location"></i>
                   <span>导航一</span>
               </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 右侧内容展示区 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  created:{

    },
  methods: {
    
    logout() {
      // 清空sessionStorage 存储的token
      window.sessionStorage.clear();
      this.$router.push("/login");
    }, 
   async getmenuList(){

    const {data: res} = await this.$http.get("menus") 
      console.log(res)
    }
  },
};
</script>

<style lang = "less" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: grid;
  grid-template-columns: 18vw 3.6vw;
  grid-template-rows: 100%;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
}
.logo {
  height: 100%;
  display: grid;
  grid-template-columns: 3fr 8fr;
  grid-template-rows: 100%;
  /* 设置单元 两端对齐 */
  justify-content: start;
  /* 内容上下居中 左右居中 */
  align-items: center;
  justify-items: center;
}
.logo img {
  height: 100%;
  border-radius: 25%;
}
.logo span {
  /* margin-left:0.5vw; */
  font-size: 1.3vw;
  color: rgb(245, 238, 238);
}

.el-aside {
  background-color: #333744;
}
</style>