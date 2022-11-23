<template>
  <img
    class="kakao_btn"
    src="@/assets/login/naver_logo.png"
    href="https://nid.naver.com/oauth2.0/authorize?response_type=code"
    style="width: 50px; cursor: pointer"
  />
</template>

<script>
export default {
  name: "LoginKakao",
  data() {
    return {
      CLIENT_ID: "xo1knK4MoTJOuWkbnS5C",
    };
  },
  methods: {
    loginWithKakao() {
      const params = {
        redirectUri: "http://localhost:8080",
      };
      window.Kakao.Auth.authorize(params);
    },
  },
};
</script>
