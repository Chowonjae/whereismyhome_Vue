<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="moveList">목록</b-button>
      </b-col>
      <b-col class="text-right" v-if="isok">
        <b-button variant="outline-info" size="sm" @click="moveModifyArticle" class="mr-2">글수정</b-button>
        <b-button variant="outline-danger" size="sm" @click="deleteArticle">글삭제</b-button>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${article.articleNo}.
          ${article.subject} [${article.hit}]</h3><div><h6>${article.userId}</div><div>${article.registerTime}</h6></div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <div v-html="message"></div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import moment from "moment";
import { mapState, mapActions, mapMutations } from "vuex";
const memberStore = "memberStore";
export default {
  name: "BoardDetail",
  data() {
    return {
      isok: false,
    };
  },
  computed: {
    message() {
      if (this.article.content) return this.article.content.split("\n").join("<br>");
      return "";
    },
    ...mapState(["ok", "article"]),
    ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo"]),
  },
  watch: {
    article: function () {
      let articleId = this.article.userId;
      console.log(articleId, this.userInfo.userId);
      console.log(this.userInfo);
      if (this.userInfo.userId === articleId) this.isok = true;
      else this.isok = false;
    },
    ok: function () {
      if (this.ok) {
        this.CLEAR_OK();
        this.moveList();
      }
    },
  },
  created() {
    let articleno = this.$route.params.articleNo;
    console.log("게시글번호", articleno);
    this.searchArticle(articleno);
  },
  methods: {
    ...mapActions(["searchArticle", "removeArticle"]),
    ...mapMutations(["CLEAR_OK"]),
    moveModifyArticle() {
      this.$router.replace({
        name: "boardmodify",
        params: { articleNo: this.article.articleNo },
      });
    },
    deleteArticle() {
      // if (confirm("정말로 삭제?")) {
      //   this.removeArticle(this.article.articleNo);
      // }
      this.$swal({
        title: "정말 삭제하시겠습니까?",
        icon: "error",
        dangerMode: true,
        buttons: true,
      })
        .then((value) => {
          if (value) {
            this.removeArticle(this.article.articleNo);
            this.$swal("삭제완료!", "삭제에 성공했습니다.", "success");
            this.$router.push({ path: "/board" });
          }
        })
        .catch((error) => {
          this.$swal("서버에 문제가 발생했습니다. 죄송합니다.", { icon: "error" });
          console.log(error);
        });
    },
    moveList() {
      this.$router.go(-1);
    },
  },
};
</script>

<style></style>
