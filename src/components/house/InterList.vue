<template>
  <b-container v-if="inters && inters.length != 0" class="bv-example-row mt-3 mb-3">
    <b-container>
      <b-button-toolbar key-nav justify aria-label="Toolbar with button groups">
        <b-button-group class="mx-1">
          <b-button @click="currentPage = 1">&laquo;</b-button>
          <b-button @click="currentPage -= 1">&lsaquo;</b-button>
        </b-button-group>
        <b-button-group class="mx-1" size="3">
          <b-button
            v-for="(inter, index) in inters.slice(
              (currentPage - 1) * perPage,
              currentPage * perPage
            )"
            :key="index"
            @mousedown.right.once="deleteInter(inter.userId, inter.dongCode)"
            @mousedown.left="getApt(inter.dongCode)"
            @contextmenu.prevent="deleteInter(inter.userId, inter.dongCode)"
            >{{ inter.dongName }}</b-button
          >
        </b-button-group>
        <b-button-group class="mx-1">
          <b-button @click="currentPage += 1">&rsaquo;</b-button>
          <b-button @click="currentPage = rows / perPage + 1">&raquo;</b-button>
        </b-button-group>
      </b-button-toolbar>
    </b-container>
  </b-container>
  <b-container v-else class="bv-example-row mt-3">
    <b-row>
      <b-col><b-alert variant="primary" show>관심목록이 없습니다.</b-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
const memberStore = "memberStore";
export default {
  name: "InterList",
  components: {},
  data() {
    return {
      perPage: 3,
      currentPage: 1,
    };
  },
  computed: {
    ...mapState(["inters"]),
    ...mapState(memberStore, ["userInfo"]),
    rows() {
      return this.inters.length;
    },
  },
  watch: {
    currentPage: function () {
      this.currentPage =
        this.currentPage < 1
          ? 1
          : this.currentPage > Math.ceil(this.rows / this.perPage)
          ? Math.ceil(this.rows / this.perPage)
          : this.currentPage;
    },
  },
  created() {
    this.CLEAR_INTER_LIST();
    this.getInter(this.userInfo.userId);
  },
  methods: {
    getApt(dongCode) {
      this.getHouseList(dongCode);
      this.getSchoolList(dongCode);
    },
    deleteInter(userId, dongCode) {
      console.log(dongCode);
      let query = {
        userId,
        dongCode: dongCode,
      };
      this.delInter(query);
    },
    ctxStop: function () {
      console.log("우클릭방지");
    },
    ...mapMutations(["CLEAR_INTER_LIST"]),
    ...mapActions(["getInter", "delInter", "getHouseList","getSchoolList"]),
  },
};
</script>

<style></style>
