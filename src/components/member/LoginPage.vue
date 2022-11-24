<template>
  <b-form class="text-left">
    <div class="mb-3">
      <label for="userid" class="form-label">아이디</label>
      <!-- <b-form-group label="ID" label-for="dropdown-form-id" @submit.stop.prevent> -->
      <b-form-input
        id="dropdown-form-id"
        size="sm"
        placeholder="ID..."
        v-model="user.userId"
        @keyup.enter="login"
      ></b-form-input>
      <!-- </b-form-group> -->
    </div>

    <!-- <b-form-group label="PW" label-for="dropdown-form-password"> -->
    <div class="mb-3">
      <label for="userpwd" class="form-label">비밀번호</label>
      <b-form-input
        id="dropdown-form-password"
        type="password"
        size="sm"
        placeholder="PW..."
        v-model="user.userPwd"
        @keyup.enter="login"
      ></b-form-input>
    </div>
    <!-- </b-form-group> -->
    <b-form-checkbox
      class="mb-3 idck"
      v-model="idck"
      value="remember"
      unchecked-value="not_remember"
      >아이디 저장</b-form-checkbox
    >
    <div class="mb-3">
      <b-button class="loginbtn" size="sm" variant="primary" @click="login">로그인</b-button>
    </div>
    <!-- <br/> -->
    <div class="mb-3">
      <label class="join-label" @click="changeModal('join')">회원가입</label>
    </div>
    <div class="mb-3">
      <label class="findpw-label" @click="changeModal('findpwd')">비밀번호 찾기</label>
    </div>
    <hr />
    <b-container>
      <login-kakao :close="close"></login-kakao>
    </b-container>
  </b-form>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import LoginKakao from "@/components/login/LoginKakao.vue";

const memberStore = "memberStore";
export default {
  name: "LoginPage",
  components: {
    LoginKakao,
    // LoginNaver,
    // LoginGoogle,
  },

  data() {
    return {
      user: {
        userId: null,
        userPwd: null,
      },
      msg: "",
      idck: "not_remember",
    };
  },
  created() {
    if (this.$cookies.get("useridcookie")) {
      this.idck = "remember";
      this.user.userId = this.$cookies.get("useridcookie");
    } else {
      this.idck = "not_remember";
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
    loginOpen() {
      this.SET_MODAL_NAME("login");
      this.$refs["myModal"].show();
    },
    async login() {
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      if (this.isLogin) {
        await this.getUserInfo(token);
        this.checkRememberId();
        if (this.$route.path != "/") this.$router.push({ name: "home" });
        this.user.userId = "";
        this.user.userPwd = "";
      }
    },
    checkRememberId() {
      if (this.idck == "not_remember") {
        this.$cookies.remove("useridcookie");
      } else {
        this.$cookies.set("useridcookie", this.user.userId);
      }
    },
    close() {
      this.$emit("close");
    },
  },
  watch: {
    isLoginError: function () {
      if (this.isLoginError == true) {
        this.makeToast("아이디 또는 비밀번호를 확인하세요.");
        this.SET_IS_LOGIN_ERROR(false);
      }
    },
    userInfo: function () {
      if (this.userInfo != null) {
        this.$emit("close");
      }
    },
  },
};
</script>

<style scoped>
.idck {
  float: left;
  left: 0;
  margin-right: 55%;
}
.loginbtn {
  right: 0;
  width: 21%;
}
.join-label {
  float: left;
  left: 0;
  padding-right: 295px;
}
.findpw-label {
  right: 0;
}
</style>
