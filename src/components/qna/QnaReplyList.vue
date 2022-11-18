<template>
  <b-container>
    <b-table-simple responsive>
      <b-thead>
        <b-tr>
          <b-th colspan="2">작성자</b-th>
          <b-th colspan="7">내용</b-th>
          <b-th colspan="2">작성시간</b-th>
          <b-th colspan="1"> </b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <qna-reply-item
          v-for="(reply, index) in replies.slice(
            (currentPage - 1) * perPage,
            currentPage * perPage
          )"
          :key="index"
          :reply="reply"
        ></qna-reply-item>
      </b-tbody>
    </b-table-simple>
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
import { mapState } from "vuex";
import QnaReplyItem from "./item/QnaReplyItem";
export default {
  components: { QnaReplyItem },
  data() {
    return {
      sortBy: "memo_time",
      sortDesc: false,
      fields: [
        { key: "user_id", label: "작성자", sortable: false },
        { key: "comment", label: "내용", sortable: false },
        { key: "memo_time", label: "작성시간", sortable: false },
        { label: "" },
      ],
      perPage: 5,
      currentPage: 1,
    };
  },
  computed: {
    ...mapState(["replies", "userinfo"]),
    rows() {
      return this.replies.length;
    },
  },
  methods: {},
};
</script>

<style></style>
