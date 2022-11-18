<template>
  <b-tr style="height: 50px; border-bottom: 1px solid whitesmoke" v-if="isShow">
    <b-td colspan="2" class="align-middle">{{ reply.user_id }}</b-td>
    <b-td colspan="7" class="align-middle" v-html="enterToBr(reply.comment)"></b-td>
    <b-td colspan="2" class="align-middle">{{ reply.memo_time }}</b-td>
    <b-td
      colspan="1"
      class="align-middle"
      v-if="userinfo.userId == reply.user_id || userinfo.userId === 'admin'"
    >
      <b-button
        size="sm"
        pill
        variant="outline-warning"
        class="me-2"
        @click="mvModify"
        v-if="userinfo.userId == reply.user_id"
        >수정</b-button
      >
      <b-button size="sm" pill variant="outline-danger" @click="deleteReply">삭제</b-button>
    </b-td>
    <b-td cols="1" v-else> </b-td>
  </b-tr>
  <b-tr style="height: 50px; border-bottom: 1px solid whitesmoke" v-else>
    <b-td colspan="2" class="align-middle">{{ reply.user_id }}</b-td>
    <b-td colspan="7" class="align-middle text-left"
      ><b-form-textarea v-model="modifyReply.comment"></b-form-textarea
    ></b-td>
    <b-td colspan="2" class="align-middle">{{ reply.memo_time }}</b-td>
    <b-td colspan="1" class="align-middle" v-if="userinfo.userId == reply.user_id">
      <b-button size="sm" pill variant="outline-warning" class="me-2" @click="replyModify"
        >수정</b-button
      >
      <b-button size="sm" pill variant="outline-danger" @click="cancel">취소</b-button>
    </b-td>
    <b-td cols="1" v-else> </b-td>
  </b-tr>
</template>

<script>
// import moment from "moment";
import { mapState, mapActions } from "vuex";
export default {
  name: "QnaReplyItem",
  data() {
    return {
      isShow: true,
      modifyReply: {
        comment: "",
        memo_no: "",
      },
    };
  },
  computed: {
    ...mapState(["userinfo"]),
  },
  props: {
    reply: Object,
  },
  filters: {
    dateFormat(regtime) {
      return regtime;
      // return moment(new Date(regtime)).format("YY.MM.DD");
    },
  },
  created() {},
  methods: {
    ...mapActions(["updateReply", "removeReply"]),
    enterToBr(str) {
      return str.replace(/(\n|\r\n)/g, "<br>");
    },
    mvModify() {
      this.isShow = false;
      this.modifyReply.memo_no = this.reply.memo_no;
      this.modifyReply.comment = this.reply.comment;
    },

    deleteReply() {
      if (confirm("댓글을 삭제하시겠습니까?")) {
        let param = {
          QnAno: this.reply.article_no,
          Replyno: this.reply.memo_no,
        };
        console.log(param);
        this.removeReply(param);
      }
    },
    cancel() {
      this.isShow = true;
    },
    replyModify() {
      let param = {
        memo_no: this.modifyReply.memo_no,
        comment: this.modifyReply.comment,
        article_no: this.reply.article_no,
      };
      this.updateReply(param);
      this.isShow = true;
    },
  },
};
</script>

<style>
.show {
  display: none;
}
</style>
