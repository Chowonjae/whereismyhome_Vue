<template>
  <div id="app">
    <header-nav></header-nav>
    <router-view></router-view>
    <footer-view></footer-view>
  </div>
</template>
<script>
import FooterView from "./components/common/FooterView.vue"
import HeaderNav from "./components/common/HeaderNav.vue"

export default {
  name:"App",
  components:{
    HeaderNav,
    FooterView,
  }
}
</script>
<style>
*{
  margin: 0;
  padding: 0;
  list-style: none;
}
a{
  text-decoration: none;
}
</style>
