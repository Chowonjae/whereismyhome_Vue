<template>
  <b-container class="bv-example-row mt-3">
    <div class="mb-1">
      <b-input-group class="mt-3">
        <b-button class="text-left" variant="outline-primary" @click="moveWrite()">글쓰기</b-button>
        <b-form-select v-model="key">
          <b-form-select-option value="" disabled>검색기준</b-form-select-option>
          <b-form-select-option value="subject">제목</b-form-select-option>
          <b-form-select-option value="userId">작성자</b-form-select-option>
        </b-form-select>
        <b-form-input type="text" v-model="word" size="sm" style="height: 38px"></b-form-input>
        <b-button variant="outline-primary" @click="searchList">검색</b-button>
      </b-input-group>
    </div>
    <div v-if="rows > 0">
      <b-table
        striped
        hover
        :items="qnas"
        :per-page="perPage"
        :current-page="currentPage"
        id="my-table"
        :fields="fields"
        @row-clicked="viewArticle"
      >
        <template #cell(subject)="data">
          <router-link :to="{ name: 'qnaview', params: { articleNo: data.item.articleNo } }">
            {{ data.item.subject }}
          </router-link>
        </template>
      </b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        align="center"
        aria-controls="my-table"
      ></b-pagination>
    </div>
    <b-col v-else align-self="center" class="mt-2">게시글이 존재하지 않습니다.</b-col>
    <!-- <b-row>
      <b-col v-if="rows > 0">
        <b-table
          striped
          hover
          :items="qnas"
          :per-page="perPage"
          :current-page="currentPage"
          id="my-table"
          :fields="fields"
          @row-clicked="viewArticle"
        >
          <template #cell(subject)="data">
            <router-link :to="{ name: 'qnaview', params: { articleNo: data.item.articleNo } }">
              {{ data.item.subject }}
            </router-link>
          </template>
        </b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          align="center"
          aria-controls="my-table"
        ></b-pagination>
      </b-col>
      <b-col v-else align-self="center" class="mt-2">게시글이 존재하지 않습니다.</b-col>
    </b-row> -->
  </b-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "QnaList",
  data() {
    return {
      fields: [
        { key: "articleNo", label: "글번호", tdClass: "tdClass" },
        { key: "subject", label: "제목", tdClass: "tdSubject" },
        { key: "userId", label: "작성자", tdClass: "tdClass" },
        { key: "registerTime", label: "작성일", tdClass: "tdClass" },
        { key: "hit", label: "조회수", tdClass: "tdClass" },
      ],
      perPage: 8,
      currentPage: 1,
      key: null,
      word: "",
    };
  },
  created() {
    let param = {
      pg: 1,
      spp: 20,
      key: null,
      word: null,
    };
    this.CLEAR_QNA();
    this.getQnAList(param);
    this.confirmQuery();
  },
  methods: {
    ...mapActions(["getQnAList", "searchQnAList"]),
    ...mapMutations(["CLEAR_QNA"]),
    searchList() {
      let key = this.key;
      let word = this.word;
      this.$router.push({ name: "qnalist", query: { key, word } });
    },
    moveWrite() {
      this.$router.push({ name: "qnawrite" });
    },
    viewArticle(article) {
      this.$router.push({
        name: "qnaview",
        params: { articleNo: article.articleNo },
      });
    },
    confirmQuery() {
      let key = this.$route.query.key;
      let word = this.$route.query.word;
      if (key == null || key === "") {
        this.key = "";
        this.word = "";
      } else {
        this.key = key;
      }
      this.word = word;
      if (this.word === "") {
        let param = {
          pg: 1,
          spp: 20,
          key: null,
          word: null,
        };
        this.getQnAList(param);
      } else {
        this.word = word;
        if (key != null) {
          let param = { key, word };
          this.searchQnAList(param);
        }
      }
    },
  },
  computed: {
    ...mapState(["qnas"]),
    rows() {
      return this.qnas.length;
    },
  },
  watch: {
    $route() {
      this.confirmQuery();
    },
  },
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
}
</style>
