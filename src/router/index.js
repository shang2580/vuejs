import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from "../components/Home.vue"

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  
  {
    path:"/home",
    component:Home
  }
  
]

const router = new VueRouter({
  mode: 'history',
  // base:URL,
  routes
})
// 挂载路由导航守卫
 router.beforeEach((to,from,next)=>{

  // to 想要访问的页面
  // from   从那个页面来
  //  next   是一个函数 放行 next("/login") 强制跳转
  if(to.path == "login") return next();
  // 获取token
   const tokenStr = window.sessionStorage.getItem("token");
   // 如果 token 令牌不存在  返回登录页面
    if(!tokenStr){

      return  next("/login")
    }else{
      next()
    }

 })





export default router
