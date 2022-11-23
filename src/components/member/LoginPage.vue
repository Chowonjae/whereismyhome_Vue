<template>
  <b-form class="text-center">
    <b-form-group label="ID" label-for="dropdown-form-id" @submit.stop.prevent>
      <b-form-input
        id="dropdown-form-id"
        size="sm"
        placeholder="ID..."
        v-model="user.userId"
        @keyup.enter="login"
      ></b-form-input>
    </b-form-group>

    <b-form-group label="PW" label-for="dropdown-form-password">
      <b-form-input
        id="dropdown-form-password"
        type="password"
        size="sm"
        placeholder="PW..."
        v-model="user.userPwd"
        @keyup.enter="login"
      ></b-form-input>
    </b-form-group>

    <b-form-checkbox class="mb-3">아이디 저장</b-form-checkbox>
    <b-button variant="primary" @click="login">Login</b-button>
    <br/>

    <b-button @click="changeModal('join')">Join</b-button>
    <b-button @click="changeModal('findpwd')">비밀번호 찾기</b-button>
  </b-form>
</template>

<script>
import { mapMutations,mapState,mapActions } from "vuex";
const memberStore = "memberStore";
export default {
  name: "LoginPage",

  data() {
    return {
      user: {
        userId: null,
        userPwd: null,
      },
      msg: "",
      idck: "",

    }
  },
  computed: {
    // ...mapState(["error"]),
    ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo", "modalName"]),
  },
  methods: {
    // ...mapActions(["userlogin","userlogout"]),
    ...mapActions(memberStore, ["userConfirm", "getUserInfo", "userLogout"]),
    ...mapMutations(memberStore, ["SET_IS_LOGIN_ERROR", "CLEAR_IS_LOGIN", "SET_MODAL_NAME"]),
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
    changeModal(name) {
      this.SET_MODAL_NAME(name);
    },
    loginOpen(){
      this.SET_MODAL_NAME("login");
      this.$refs["myModal"].show();
    },
    async login() {
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      if (this.isLogin) {
        await this.getUserInfo(token);
        console.log(this.userInfo);
        if (this.$route.path != "/") this.$router.push({ name: "home" });
        this.user.userId = "";
        this.user.userPwd = "";
      }
    },
    close() {
      this.$refs["myModal"].hide();
    },
  },
  watch: {
    isLoginError: function () {
      if (this.isLoginError == true) {
        this.makeToast("아이디 또는 비밀번호를 확인하세요.");
        this.SET_IS_LOGIN_ERROR(false);
      }
    },
    userInfo:function(){
      if(this.userInfo != null){
        this.$emit("close");
      }
    }
  },
};
</script>

<style></style>
