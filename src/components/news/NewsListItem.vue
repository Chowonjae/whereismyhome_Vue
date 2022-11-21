<template>
  <b-card
    :title="ne.title"
    :img-src="ne.imgUrl"
    tag="article"
    style="max-width: 20rem"
    class="mb-2"
    img-height="200"
  >
    <b-card-text>
      {{ ne.content }}
    </b-card-text>
    <b-button :href="ne.url" variant="outline-secondary">뉴스 보러가기</b-button>
    <div class="mt-2">
      <span class="text-left" style="font-size: 12px; float: left">
        {{ ne.brand }}
      </span>
      <span class="text-secondary" style="font-size: 12px; float: right">
        {{ ne.date }}
      </span>
    </div>
  </b-card>
</template>

<script>
export default {
  name: "NewsListItem",
  data() {
    return {};
  },
  props: {
    ne: Object,
  },
};
</script>

<style>
.card-img-top {
  height: 15rem;
  object-fit: cover;
}
</style>
