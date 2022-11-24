<template>
  <div id="app">
    <header-nav :user="user" @logout="logout"></header-nav>
    <router-view @login="login"></router-view>
    <footer-view></footer-view>
  </div>
</template>
<script>
import FooterView from "./components/common/FooterView.vue";
import HeaderNav from "./components/common/HeaderNav.vue";
import { mapActions } from "vuex";
export default {
  name: "App",
  components: {
    HeaderNav,
    FooterView,
  },
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.getStarbucks();
    this.getMetros();
  },
  methods: {
    ...mapActions(["getStarbucks", "getMetros"]),
    logout() {
      this.user = null;
      localStorage.removeItem("loginUser");
    },
    login(user) {
      let userList = JSON.parse(localStorage.getItem("userList"));

      let matched = false;

      for (let i = 0; i < userList.length; i++) {
        if (user.id === userList[i].id && user.password === userList[i].password) {
          matched = true;
          break;
        }
      }
      if (matched) {
        localStorage.setItem("loginUser", JSON.stringify(user));
        this.user = user;
        this.makeToast("로그인 성공", "success");
        this.$router.push("/");
      } else {
        this.makeToast("로그인 실패", "danger");
      }
    },
  },
  makeToast(msg, status) {
    this.$bvToast.toast(msg, {
      title: "알림",
      autoHideDelay: 1000,
      appendToast: true,
      variant: status,
    });
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
a {
  text-decoration: none;
}
</style>
