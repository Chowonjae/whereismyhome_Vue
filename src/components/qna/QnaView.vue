<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="moveList">목록</b-button>
      </b-col>
      <b-col class="text-right" v-if="checkqna()">
        <b-button variant="outline-info" size="sm" @click="moveModifyArticle" class="mr-2">글수정</b-button>
        <b-button variant="outline-danger" size="sm" @click="deleteArticle">글삭제</b-button>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${qna.articleNo}.
          ${qna.subject} [${qna.hit}]</h3><div><h6>${qna.userId}</div><div>${qna.registerTime}</h6></div>`"
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
    <b-input-group class="mt-3">
      <b-form-textarea v-model="replyComment" placeholder="내용 입력...(100자 이내)" maxlength="100"></b-form-textarea>
      <b-input-group-append>
        <b-button variant="info" @click="registReply">댓글 작성</b-button>
      </b-input-group-append>
    </b-input-group>

    <qna-reply-list></qna-reply-list>
  </b-container>
</template>

<script>
// import moment from "moment";
import QnaReplyList from "./QnaReplyList";
import { mapState, mapActions, mapMutations } from "vuex";
const memberStore = "memberStore";

export default {
  name: "QnaDetail",
  components: {
    QnaReplyList,
  },
  data() {
    return {
      replyComment: "",
    };
  },
  computed: {
    ...mapState(["qna", "replies", "ok", "qnakey", "qnaword"]),
    ...mapState(memberStore, ["userInfo"]),
    message() {
      if (this.qna.content) return this.qna.content.split("\n").join("<br>");
      return "";
    },
  },
  watch: {
    ok: function () {
      if (this.ok) {
        this.CLEAR_OK();
        this.moveList();
      }
    },
  },
  created() {
    this.replyComment = "";
    let articleno = this.$route.params.articleNo;
    this.searchQnA(articleno);
    this.searchReplies(articleno);
  },
  methods: {
    ...mapActions(["searchQnA", "searchReplies", "addReply", "removeQnA"]),
    ...mapMutations(["CLEAR_OK"]),
    checkqna() {
      let replyId = this.qna.userId;

      if (this.userInfo.userId === replyId || this.userInfo.userId === "admin") return true;
      else return false;
    },
    registReply() {
      if (this.replyComment == "") alert("댓글을 입력해주세요.");
      else {
        let param = {
          user_id: this.userInfo.userId,
          comment: this.replyComment,
          article_no: this.qna.articleNo,
        };
        this.addReply(param);
        this.replyComment = "";
      }
    },
    moveModifyArticle() {
      this.$router.push({ path: `/qna/modify/${this.qna.articleNo}` });
    },
    deleteArticle() {
      if (confirm("정말로 삭제?")) {
        this.removeQnA(this.qna.articleNo);
      }
    },
    reload() {
      this.$router.go();
    },
    moveList() {
      // view/:articleNo
      this.$router.go(-1);
      // this.$router.push({ name: "qnalist" });
    },
  },
  // filters: {
  //   dateFormat(regtime) {
  //     return moment(new Date(regtime)).format("YY.MM.DD hh:mm:ss");
  //   },
  // },
};
</script>

<style></style>
