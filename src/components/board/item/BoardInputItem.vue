<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="userid-group"
          label="작성자:"
          label-for="userid"
          description="작성자를 입력하세요."
        >
          <b-form-input
            id="userid"
            disabled
            v-model="notice.userId"
            type="text"
            required
            placeholder="작성자 입력..."
            ref="userId"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="subject-group"
          label="제목:"
          label-for="subject"
          description="제목을 입력하세요."
        >
          <b-form-input
            id="subject"
            v-model="notice.subject"
            type="text"
            required
            placeholder="제목 입력..."
            ref="subject"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="content-group" label="내용:" label-for="content">
          <b-form-textarea
            id="content"
            v-model="notice.content"
            placeholder="내용 입력..."
            rows="10"
            max-rows="15"
            ref="content"
          ></b-form-textarea>
        </b-form-group>

        <b-button type="submit" variant="primary" class="m-1" v-if="this.type === 'register'"
          >글작성</b-button
        >
        <b-button type="submit" variant="primary" class="m-1" v-else>글수정</b-button>
        <b-button type="reset" variant="danger" class="m-1">초기화</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "BoardInputItem",
  data() {
    return {
      isUserid: true,
      notice: {
        userId: "",
        subject: "",
        content: "",
        aritcleNo: "",
      },
    };
  },
  props: {
    type: { type: String },
  },
  created() {
    console.log(this.type);
    if (this.type != "modify") {
      console.log(this.userinfo.userId);
      this.notice.userId = this.userinfo.userId;
    } else {
      this.notice.articleNo = this.article.articleNo;
      this.notice.userId = this.article.userId;
      this.notice.subject = this.article.subject;
      this.notice.content = this.article.content;
    }
  },
  computed: {
    ...mapState(["ok", "userinfo", "article"]),
  },
  watch: {
    ok: function () {
      if (this.ok == true) {
        this.CLEAR_OK();
        this.moveList();
      }
    },
  },
  methods: {
    ...mapActions(["updateArticle", "addArticle"]),
    ...mapMutations(["CLEAR_OK"]),
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";
      !this.notice.userId &&
        ((msg = "작성자 입력해주세요"), (err = false), this.$refs.userId.focus());
      err &&
        !this.notice.subject &&
        ((msg = "제목 입력해주세요"), (err = false), this.$refs.subject.focus());
      err &&
        !this.notice.content &&
        ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());

      if (!err) alert(msg);
      else this.type === "register" ? this.regist() : this.modify();
    },
    onReset(event) {
      event.preventDefault();
      this.notice.articleNo = 0;
      this.notice.subject = "";
      this.notice.content = "";
    },
    regist() {
      let param = {
        userId: this.notice.userId,
        subject: this.notice.subject,
        content: this.notice.content,
      };
      this.addArticle(param);
    },
    modify() {
      let param = {
        articleNo: this.article.articleNo,
        userId: this.notice.userId,
        subject: this.notice.subject,
        content: this.notice.content,
      };
      this.updateArticle(param);
    },
    moveList() {
      this.$router.push({ name: "boardlist" });
    },
  },
};
</script>

<style></style>
