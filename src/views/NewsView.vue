<template>
  <b-container class="bv-example-row mt-3 text-center">
    <b-row>
      <b-col>
        <news-search></news-search>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <news-list></news-list>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import NewsList from "@/components/news/NewsList.vue";
import NewsSearch from "@/components/news/NewsSearch.vue";
export default {
  components: { NewsSearch, NewsList },
};
</script>

<style></style>
