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
    return {
      params: {
        client_id: process.env.VUE_APP_KAKAO_JAVASCRIPT_KEY,
      },
    };
  },
  methods: {
    // GoogleLoginSuccess(googleUser){
    //     if(sessionStorage.getItem("JWT_token")) return alert("이미 로그인되어있습니다.");
    //     Google.GoogleLoginSuccess(googleUser);
    // },
    // GoogleLoginFailure(){
    //     Google.GoogleLoginFailure();
    // },
    loginWithGoogle(googleUser) {
      const profile = googleUser.getBasicProfile();
      console.log(googleUser.getAuthResponse().id_token);
      console.log(profile.getId());
      console.log(profile.getName());
      console.log(profile.getImageUrl());
      console.log(profile.getEmail());
    },
    handleCredentialResponse(response) {
      // decodeJwtResponse() is a custom function defined by you
      // to decode the credential response.
      const responsePayload = this.parseJwt(response.credential);

      console.log("ID: " + responsePayload.sub);
      console.log("Full Name: " + responsePayload.name);
      console.log("Given Name: " + responsePayload.given_name);
      console.log("Family Name: " + responsePayload.family_name);
      console.log("Image URL: " + responsePayload.picture);
      console.log("Email: " + responsePayload.email);
    },
    parseJwt(token) {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    },
  },
};
</script>
