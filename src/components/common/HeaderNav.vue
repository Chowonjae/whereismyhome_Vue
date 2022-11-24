<template>
  <div id="app">
    <header style="">
      <div class="nav d-flex justify-content-between align-items-center mt-2 mb-2">
        <div class="logo justify-content-start ms-5">
          <router-link class="text-decoration-none display-5 font-weight-bold ml-5" to="/"
            >FIND HOME</router-link
          >
        </div>
        <b-nav v-if="userInfo != null" class="nav justify-content-end logined">
          <router-link class="hospital-btn btn me-3" id="btn-hospital" to="/hospital">
            Hospital
          </router-link>
          <router-link class="corona-btn btn me-3" id="btn-corona" to="/corona">Corona</router-link>
          <router-link class="mvsearch-btn btn me-3" id="btn-homesearch" to="/house">
            HomeSearch
          </router-link>
          <router-link class="notice-btn btn me-3" id="btn-notice" to="/board">Notice</router-link>
          <router-link class="notice-btn btn me-3" id="btn-qna" to="/qna">QnA</router-link>
          <router-link class="news-btn btn me-3" id="btn-news" to="/news">News</router-link>
        </b-nav>
        <b-dropdown
          v-if="userInfo != null"
          right
          variant="link"
          no-caret
          toggle-class="text-decoration-none"
        >
          <template #button-content>
            <b-avatar class="mr-4" v-if="userInfo.type == 'kakao'" :src="kakaoImg"></b-avatar>
            <b-avatar v-else class="mr-4" variant="primary"></b-avatar>
          </template>
          <b-dropdown-item class="text-center">
            <strong>{{ userInfo.userName }}</strong> ({{ userInfo.userId }})님
          </b-dropdown-item>
          <hr />
          <b-dropdown-item href="/mypage">MyPage</b-dropdown-item>
          <b-dropdown-item @click.prevent="logout">Logout</b-dropdown-item>
        </b-dropdown>

        <b-navbar-nav v-else class="nav justify-content-end mr-4" @click="loginOpen">
          <b-avatar variant="secondary"></b-avatar>
        </b-navbar-nav>
        <b-modal centered ref="myModal" hide-footer hide-header>
          <login-page v-on:close="close" v-if="'login' === modalName"></login-page>
          <join-page v-on:close="close" v-else-if="'join' === modalName"></join-page>
          <find-pwd-page v-on:close="close" v-else-if="'findpwd' === modalName"></find-pwd-page>
        </b-modal>
      </div>
    </header>
  </div>
</template>

<script>
import JoinPage from "@/components/member/JoinPage.vue";
import FindPwdPage from "@/components/member/FindPwdPage.vue";
import LoginPage from "@/components/member/LoginPage.vue";

import { mapState, mapMutations, mapActions } from "vuex";
const memberStore = "memberStore";

export default {
  data() {
    return {
      kakaoImg: require("@/assets/login/kakaotalk_logo.png"),
      showDrop: false,
    };
  },
  components: {
    JoinPage,
    FindPwdPage,
    LoginPage,
  },
  computed: {
    // ...mapState(["error"]),

    ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo", "modalName"]),
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo", "userLogout", "socialLogout"]),
    ...mapMutations(memberStore, ["SET_MODAL_NAME"]),
    moveMyPage() {
      console.log("clicked");
      this.$router.go("/mypage");
    },
    makeToast(msg) {
      this.$bvToast.toast(msg, {
        title: "알림",
        autoHideDelay: 1000,
        appendToast: true,
        variant: "warning",
      });
    },
    logout() {
      if (this.userInfo.type == "default") {
        this.userLogout(this.userInfo.userId);
        sessionStorage.removeItem("access-token");
        sessionStorage.removeItem("refresh-token");
      } else {
        if (this.userInfo.type == "kakao") {
          window.Kakao.Auth.logout((res) => {
            if (!res) console.log("kakao logout");
          });
        }
        this.socialLogout();
      }
      if (this.$route.path != "/") this.$router.push({ name: "home" });
    },

    loginOpen() {
      this.SET_MODAL_NAME("login");
      this.$refs["myModal"].show();
    },
    close() {
      this.SET_MODAL_NAME("");
      this.$refs["myModal"].hide();
    },
    changeModal(name) {
      this.SET_MODAL_NAME(name);
    },
  },
};
</script>

<style>
.logined-info {
  height: 40px;
  line-height: 40px;
  text-align: center;
}
</style>
