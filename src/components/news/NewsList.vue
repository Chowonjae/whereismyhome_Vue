<template>
  <b-container v-if="news.length == 0" style="width: 100%; height: 500px"
    >지역을 검색해주세요</b-container
  >
  <b-container v-else>
    <b-card-group deck>
      <news-list-item
        v-for="(ne, index) in news.slice(start, end)"
        :key="index"
        :ne="ne"
      ></news-list-item>
    </b-card-group>
    <b-button-group size="sm" class="btn-block">
      <b-button variant="outline-secondary" @click="rangeDown">&#60;</b-button>
      <b-button variant="outline-secondary" @click="rangeUp">&#62;</b-button>
    </b-button-group>
  </b-container>
</template>

<script>
import NewsListItem from "@/components/news/NewsListItem";
import { mapState } from "vuex";
export default {
  name: "NewsList",
  components: {
    NewsListItem,
  },
  data() {
    return {
      start: 0,
      end: 4,
    };
  },
  methods: {
    rangeUp() {
      this.start += 4;
      this.end += 4;
      if (this.end > this.news.length) {
        this.start = this.news.length - 4;
        this.end = this.news.length;
      }
    },
    rangeDown() {
      this.start -= 4;
      this.end -= 4;
      if (this.start < 0) {
        this.start = 0;
        this.end = 4;
      }
    },
  },
  computed: {
    ...mapState(["news"]),
  },
};
</script>

<style></style>
