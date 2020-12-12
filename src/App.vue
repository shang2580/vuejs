<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import Login from './components/Login';

export default {
  name: 'App',
  components: {
   Login
  }
}
</script>
<style>
   #app{
     height: 100%;
   }
</style>
