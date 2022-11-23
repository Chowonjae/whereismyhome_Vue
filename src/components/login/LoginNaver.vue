<template>
  <img
    class="naver_btn"
    src="@/assets/login/naver_logo.png"
    href="https://nid.naver.com/oauth2.0/authorize?response_type=code"
    style="width: 50px; cursor: pointer"
  />
</template>

<script>
export default {
  name: "LoginNaver",
  data() {
    return {
      CLIENT_ID: "xo1knK4MoTJOuWkbnS5C",
    };
  },
  methods: {
    loginWithNaver() {
      const params = {
        redirectUri: "http://localhost:8080",
      };
      window.Kakao.Auth.authorize(params);
    },
  },
};
</script>
