<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1">
      <b-input-group class="mt-3">
        <b-button v-if="userinfo.userId == 'admin'" class="text-left" variant="outline-primary" @click="moveWrite()">글쓰기</b-button>
        <b-form-select v-model="key">
          <b-form-select-option value="">검색기준</b-form-select-option>
          <b-form-select-option value="subject">제목</b-form-select-option>
          <b-form-select-option value="userId">작성자</b-form-select-option>
        </b-form-select>
        <b-form-input type="text" v-model="word" size="sm" style="width:10px;"></b-form-input>
        <b-button variant="outline-primary" @click="searchList">검색</b-button>
      </b-input-group>
    </b-row>
    <b-row>
      <b-col>
        <b-table
          striped
          hover
          :items="articles"
          :per-page="perPage"
          :current-page="currentPage"
          id="my-table"
          :fields="fields"
          @row-clicked="viewArticle"
        >
          <template #cell(subject)="data">
            <router-link :to="{ name: 'boardview', params: { articleNo: data.item.articleNo } }">
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
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "BoardList",
  computed:{
    ...mapState(["userinfo","articles"]),
    rows() {
      return this.articles.length;
    },
  },
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
      key: "",
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
    this.getArticleList(param);

  },
  methods: {
    ...mapActions(["getArticleList","searchArticleList"]),
    searchList() {
      if(this.key!=null){
        let param = {key:this.key, word: this.word};
        this.searchArticleList(param);
      }
    },
    moveWrite() {
      this.$router.push({ name: "boardwrite" });
    },
    viewArticle(article) {
      this.$router.push({
        name: "boardview",
        params: { articleNo: article.articleNo },
      });
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
