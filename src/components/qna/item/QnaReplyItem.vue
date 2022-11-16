<!-- <template>
  <b-tr>
    <b-td>{{ articleno }}</b-td>
    <b-th class="text-left">{{ subject }}</b-th>
    <b-td>{{ hit }}</b-td>
    <b-td>{{ user_id }}</b-td>
    <b-td>{{ regtime | dateFormat }}</b-td>
  </b-tr>
</template>

<script>
// import moment from "moment";

export default {
  name: "QnaReplyItem",
  data() {
    return {
      articles: [],
      fields: [
        { key: "article_no", label: "글번호", tdClass: "tdClass" },
        { key: "subject", label: "제목", tdClass: "tdSubject" },
        { key: "userId", label: "작성자", tdClass: "tdClass" },
        { key: "registerTime", label: "작성일", tdClass: "tdClass" },
        { key: "hit", label: "조회수", tdClass: "tdClass" },
      ],
      perPage: 5,
      currentPage: 1,
    };
  },
  props: {
    article_no: Number,
    user_id: String,
    comment: String,
    memo_time: String,
    memo_no: Number,
  },
  filters: {
    dateFormat(regtime) {
      return regtime;
      // return moment(new Date(regtime)).format("YY.MM.DD");
    },
  },
  created() {
    http.get(`/qna/repl/${this.articleNo}`).then(({ data }) => {
      this.articles = data;
    });
  },
};
</script>

<style>

</style> -->