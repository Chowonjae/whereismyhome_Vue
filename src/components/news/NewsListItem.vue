<template>
  <b-card
    :title="ne.title"
    :img-src="ne.imgUrl"
    tag="article"
    style="max-width: 20rem"
    class="mb-2"
  >
    <b-card-text>
      {{ ne.content }}
    </b-card-text>

    <b-button :href="ne.url" variant="outline-secondary">뉴스 보러가기</b-button>
  </b-card>
</template>

<script>
export default {
  name: "NewsListItem",
  props: {
    ne: Object,
  },
};
</script>

<style></style>
