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
    <b-input-group class="mt-3">
      <b-form-input v-model="replyComment" placeholder="내용 입력..."></b-form-input>
      <b-input-group-append>
        <b-button variant="info" @click="registReply">댓글 작성</b-button>
      </b-input-group-append>
    </b-input-group>
    <b-table
          :items="articles"
          :per-page="perPage"
          :current-page="currentPage"
          id="my-table"
          :fields="fields"
          thead-class="d-none"
        >
          <template #cell(show_details)="row" v-if="checkReply()">
            <b-button size="sm" @click="row.toggleDetails" class="mr-2">
              수정
            </b-button>
            &nbsp;
            <b-button size="sm" @click="deleteReply" class="mr-2">
              삭제
            </b-button>
          </template>
        </b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          align="center"
          aria-controls="my-table"
        ></b-pagination>
  </b-container>
</template>

<script>
// import moment from "moment";
import http from "@/api/http";
// import QnaReplyItem from "./item/QnaReplyItem.vue";

export default {
  name: "QnaDetail",
  data() {
    return {
      sortBy: 'memo_time',
      sortDesc: false,
      article: {},
      articles: [],
      fields: [
        { key: "user_id", label: "작성자", sortable: false },
        { key: "comment", label: "내용", sortable: false },
        { key: "memo_time", label: "작성시간", sortable: true },
        { key: "show_details", label: "show_details" }
      ],
      perPage: 5,
      currentPage: 1,
      replyComment: '',
    };
  },
  computed: {
    message() {
      if (this.article.content) return this.article.content.split("\n").join("<br>");
      return "";
    },
    rows() {
      return this.articles.length;
    },
  },
  created() {
    http.get(`/qna/${this.$route.params.articleNo}`).then(({ data }) => {
      this.article = data;
    });
    http.get(`/qna/repl/${this.$route.params.articleNo}`).then(({ data }) => {
      this.articles = data;
    });
  },
  methods: {
    checkqna() {
      let data = sessionStorage.getItem("userinfo");
      data = JSON.parse(data);
      let replyId = this.article.userId;
      // console.log("id : " + data.userId);
      // console.log("r : " + replyId);
      if (data.userId === replyId) return true;
      else return false;
    },
    checkReply() {
      let data = sessionStorage.getItem("userinfo");
      data = JSON.parse(data);
      let replyId = this.article.userId;
      // console.log("id : " + data.userId);
      // console.log("r : " + replyId);
      if (data.userId === replyId) return true;
      else return false;
    },
    deleteReply() {
      http.delete()
    },
    registReply() {
      let data = sessionStorage.getItem("userinfo");
      data = JSON.parse(data);
      console.log(data);
      http
        .post(`/qna/repl`, {
          user_id: data.userId,
          comment: this.replyComment,
          article_no: this.article.articleNo,
        })
        .then(({ data }) => {
          console.log(data);
          if (data === "fail") {
            let msg = "등록 처리시 문제가 발생했습니다..";
            alert(msg);
          }
          this.reload();
        });
    },
    moveModifyArticle() {
      this.$router.push({ path: `/qna/modify/${this.article.articleNo}` });
    },
    deleteArticle() {
      if (confirm("정말로 삭제?")) {
        this.$router.push({ path: `/qna/delete/${this.article.articleNo}` });
      }
    },
    reload() {
      this.$router.go();
    },
    moveList() {
      // view/:articleNo
      this.$router.push({ name: "qnalist" });
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
