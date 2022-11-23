<template>
  <span>
    <!-- <GoogleLogin class="big-button" :params="param" :onSuccess="GoogleLoginSuccess" :onFailure="GoogleLoginFailure"
      >구글 로그인</GoogleLogin
    >
    <input class="big-button" type="button" value="구글 로그아웃" @click="GoogleLogout()" /> -->
    <img
      class="google_btn"
      src="@/assets/login/google_logo.png"
      @click="loginWithGoogle"
      style="width: 50px; cursor: pointer"
    />
    <div
      id="g_id_onload"
      data-client_id="YOUR_CLIENT_ID"
      data-callback="handleCredentialResponse"
    ></div>
    <div class="g_id_signin" data-type="icon" data-shape="circle"></div>
    <!-- <b-container id="my-signin2" style="display:none;"></b-container> -->
  </span>
</template>

<script>
export default {
  name: "LoginKakao",
  data() {
    return {};
  },
  methods: {
    loginWithGoogle() {
      this.$gAuth
        .signIn()
        .then((GoogleUser) => {
          //on success do something
          console.log("GoogleUser", GoogleUser);
        })
        .catch((error) => {
          //on fail do something
          console.log(error);
        });
    },
  },
};
</script>
