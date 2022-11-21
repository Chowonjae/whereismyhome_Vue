<template>
  <div id="app">
    <header>
      <div class="nav d-flex justify-content-between align-items-center mt-2 mb-2">
        <div class="logo justify-content-start ms-5">
          <router-link class="text-decoration-none display-5 font-weight-bold" to="/">FIND HOME</router-link>
        </div>
        <div v-if="userInfo" class="nav justify-content-end logined">
          <div class="logined-info me-3 align-middle">
            <strong>{{ userInfo.userName }}</strong> ({{ userInfo.userId }})님 안녕하세요.
          </div>
          <router-link class="hospital-btn btn me-3" id="btn-hospital" to="/hospital"> Hospital </router-link>
          <router-link class="corona-btn btn me-3" id="btn-corona" to="/corona">Corona</router-link>
          <router-link class="mvsearch-btn btn me-3" id="btn-homesearch" to="/house"> HomeSearch </router-link>
          <router-link class="notice-btn btn me-3" id="btn-notice" to="/board">Notice</router-link>
          <router-link class="notice-btn btn me-3" id="btn-notice" to="/qna">QnA</router-link>
          <router-link class="mypage-btn btn me-3" id="btn-mypage" to="/mypage">MyPage</router-link>
          <b-button class="logout-btn btn me-3" id="btn-logout" @click.prevent="logout">Logout</b-button>
        </div>

        <div v-else class="nav justify-content-end">
          <div class="login-area me-3">
            <div class="dropdown login-pop">
              <router-link id="btn-mv-join" class="join-btn btn me-3" to="/join">Join</router-link>
              <b-alert show variant="danger" v-if="isLoginError">아이디 또는 비밀번호를 확인하세요.</b-alert>
              <b-dropdown id="dropdownMenu" text="Login" right>
                <b-dropdown-form style="width: 250px">
                  <b-form-group label="ID" label-for="dropdown-form-id" @submit.stop.prevent>
                    <b-form-input id="dropdown-form-id" size="sm" placeholder="ID..." v-model="user.userId" @keyup.enter="login"></b-form-input>
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
                  <b-button @click="findpwd">비밀번호 찾기</b-button>
                  <div v-if="msg.length">
                    <b-alert v-model="msg" variant="danger" dismissible>
                      {{ msg }}
                    </b-alert>
                  </div>
                </b-dropdown-form>
              </b-dropdown>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

const memberStore = "memberStore";

export default {
  data() {
    return {
      users: [],
      user:{
        userId: null,
        userPwd: null,
      },
      msg: "",
      idck: "",
    };
  },
  computed:{
    // ...mapState(["error"]),
    ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo"]),
    ...mapGetters(["checkUserInfo"]),
  },
  methods: {
    // ...mapActions(["userlogin","userlogout"]),
    ...mapActions(memberStore, ["userConfirm", "getUserInfo", "userLogout"]),
    logout() {
      this.userLogout(this.userInfo.userId);
      sessionStorage.removeItem("access-token")
      sessionStorage.removeItem("refresh-token");
      if (this.$route.path != "/") this.$router.push({ name: "home" });
    },
    async login() {
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      if(this.isLogin){
        await this.getUserInfo(token);
        console.log(this.userInfo);
        if (this.$route.path != "/") this.$router.push({ name: "home" });
      }
    },
    // getUserList() {
    //   let userList = JSON.parse(localStorage.getItem("userList"));

    //   if (userList) {
    //     this.users = userList;
    //   }
    // },
    findpwd() {
      this.$router.push("/user/findpwd");
    },
  },
};
</script>

<style>
.logined-info{
  height: 40px;
  line-height: 40px;
  text-align: center;
}
  </style>
