<template>
  <b-container v-if="house != null">
    <div class="mb-2" style="font-size: 20px; font-weight: bold">{{ house.apartmentName }}</div>

    <div id="roadview" style="width: 100%; height: 250px"></div>
    <hr />
    <div class="text-left" style="padding-left: 10px">
      <div
        v-if="starbuck != null && starbuck != ''"
        style="font-size: 12px"
        class="margin-left:10px;"
      >
        <b-img :src="coffeeImg" width="20" height="20" class="icon"></b-img>&nbsp;&nbsp;&nbsp;{{
          starbuck.name
        }}&nbsp;{{ starbuck.dist }}m
      </div>
      <div v-else style="font-size: 12px; margin-top: 5px" class="text-success">
        <b-img :src="coffeeImg" width="20" height="20" class="icon"></b-img>&nbsp; 1km 이내에 없음
      </div>
      <div v-if="metro != null && metro != ''" style="font-size: 12px; margin-top: 5px">
        <b-img :src="metroImg" width="20" height="20" class="icon"></b-img>&nbsp; &nbsp;{{
          metro.name
        }}
        {{ metro.dist }}m
      </div>
      <div v-else style="font-size: 12px; margin-top: 5px">
        <b-img :src="metroImg" width="20" height="20" class="icon"></b-img>&nbsp;1km 이내에 없음
      </div>
      <div v-if="school != null && school != ''" style="font-size: 12px; margin-top: 5px">
        <b-img :src="schoolImg" width="20" height="20" class="icon"></b-img>&nbsp;&nbsp;
        {{ school.name }} {{ school.dist }}m
      </div>
      <div v-else style="font-size: 12px; margin-top: 5px">
        <b-img :src="schoolImg" width="20" height="20" class="icon"></b-img>&nbsp;1km 이내에 없음
      </div>
    </div>
    <hr />
    <div class="apt-date text-center small text-muted">건축년도: {{ house.buildYear }}</div>
    <hr />
    <LineChartGenerator
      :chart-options="chartOptions"
      :chart-data="deals"
      :plugins="plugins"
      style="height: 250px"
    />
    <b-button-group size="sm" class="btn-block">
      <b-button variant="outline-info" @click="rangeDown">&#60;</b-button>
      <b-button variant="outline-info" @click="rangeUp">&#62;</b-button>
    </b-button-group>
  </b-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { Line as LineChartGenerator } from "vue-chartjs/legacy";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";
ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement);

export default {
  name: "HouseInfo",
  components: { LineChartGenerator },
  title() {
    if (this.house != null) {
      return this.house.name;
    }
  },
  data() {
    return {
      coffeeImg: require("@/assets/coffee.png"),
      metroImg: require("@/assets/metro.png"),
      schoolImg: require("@/assets/school.png"),
      chartOptions: {
        layout: {
          padding: {
            right: 18,
          },
        },
        scales: {
          x: {
            min: 0,
            max: 5,
          },
          y: {
            beginAtZero: true,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAO_JAVASCRIPT_KEY}&libraries=services`;
      document.head.appendChild(script);
    }
  },
  props: {
    chartId: {
      type: String,
      default: "line-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 100,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    house: function () {
      if (this.house != null) {
        console.log("inside");
        var roadviewContainer = document.getElementById("roadview"); //로드뷰를 표시할 div
        var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
        var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

        var position = new kakao.maps.LatLng(this.house.lat, this.house.lng);

        // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
        roadviewClient.getNearestPanoId(position, 50, function (panoId) {
          roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
        });
        this.chartOptions.scales.x.min = 0;
        this.chartOptions.scales.x.max = 5;
      }
    },
  },
  methods: {
    ...mapMutations(["CLEAR_DEAL_LIST"]),
    rangeUp() {
      this.chartOptions.scales.x.min += 6;
      this.chartOptions.scales.x.max += 6;
      if (this.chartOptions.scales.x.max >= this.deals.labels.length) {
        this.chartOptions.scales.x.min = this.deals.labels.length - 6;
        this.chartOptions.scales.x.max = this.deals.labels.length - 1;
      }
    },
    rangeDown() {
      this.chartOptions.scales.x.min -= 6;
      this.chartOptions.scales.x.max -= 6;
      if (this.chartOptions.scales.x.min < 0) {
        this.chartOptions.scales.x.min = 0;
        this.chartOptions.scales.x.max = 5;
      }
    },
  },
  computed: {
    ...mapState(["deals", "starbuck", "metro", "house", "school"]),
  },
};
</script>

<style></style>
