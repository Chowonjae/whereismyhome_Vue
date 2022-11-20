<template>
  <b-container v-if="house != null">
    <div class="mb-2" style="font-size: 20px; font-weight: bold">{{ house.apartmentName }}</div>
    <div id="roadview" style="width: 100%; height: 200px"></div>
    <div>
      <span v-if="starbuck != null" style="font-size: 12px" class="text-success">
        <b-img :src="coffeeImg" width="20" height="20" class="icon"></b-img>{{ starbuck.name }}
        {{ starbuck.dist }}m
      </span>
      <span v-else style="font-size: 12px" class="text-success">
        <b-img :src="coffeeImg" width="20" height="20" class="icon"></b-img> 1km 이내에 없음
      </span>
      <span v-if="metro != null" style="font-size: 12px">
        <b-img :src="metroImg" width="20" height="20" class="icon"></b-img>
        {{ metro.name }} {{ metro.dist }}m
      </span>
      <span v-else style="font-size: 12px"
        ><b-img :src="metroImg" width="20" height="20" class="icon"></b-img> 1km 이내에 없음</span
      >
    </div>
    <div class="apt-date text-left">건축년도: {{ house.buildYear }}</div>
    <LineChartGenerator
      :chart-options="chartOptions"
      :chart-data="deals"
      :plugins="plugins"
      style="height: 250px"
    />
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
// const moveChart = {
//   id: "moveChart",

//   afterEvent(chart, args) {
//     const {
//       ctx,
//       canvas,
//       chartArea: { left, right, top, bottom, width, height },
//     } = chart;

//     canvas.addEventListener("mousemove", (event) => {
//       const x = args.event.x;
//       const y = args.event.y;

//       if (
//         x >= left - 15 &&
//         x <= left + 15 &&
//         y >= height / 2 + top - 15 &&
//         y <= height / 2 + top + 15
//       ) {
//         canvas.style.cursor = "pointer";
//       } else if (
//         x >= right - 15 &&
//         x <= right + 15 &&
//         y >= height / 2 + top - 15 &&
//         y <= height / 2 + top + 15
//       ) {
//         canvas.style.cursor = "pointer";
//       } else {
//         canvas.style.cursor = "default";
//       }
//     });
//   },
//   afterDraw(chart, args, pluginOptions) {
//     const {
//       ctx,
//       chartArea: { left, right, top, bottom, width, height },
//     } = chart;

//     const angle = Math.PI / 180;

//     class CircleChevron {
//       draw(ctx, x1, pixel) {
//         ctx.beginPath();
//         ctx.lineWidth = 3;
//         ctx.strokeStyle = "rgba(102,102,102,0.5)";
//         ctx.fillStyle = "white";
//         ctx.arc(x1, height / 2 + top, 15, angle * 0, angle * 360, false);
//         ctx.stroke();
//         ctx.fill();
//         ctx.closePath();

//         ctx.startPath();
//         ctx.lineWidth = 3;
//         ctx.strokeStyle = "rgba(255,26,104,1)";
//         ctx.moveTo(x1 + pixel, height / 2 + top - 7.5);
//         ctx.lineTo(x1 - pixel, height / 2 + top);
//         ctx.moveTo(x1 + pixel, height / 2 + top + 7.5);
//         ctx.stroke();
//         ctx.closePath();
//       }
//     }

//     let drawCircleLeft = new CircleChevron();
//     drawCircleLeft.draw(ctx, left, 5);

//     let drawCircleRight = new CircleChevron();
//     drawCircleRight.draw(ctx, right, -5);

//     console.log(chart);
//   },
// };

export default {
  name: "HouseInfo",
  components: { LineChartGenerator },
  data() {
    return {
      coffeeImg: require("@/assets/coffee.png"),
      metroImg: require("@/assets/metro.png"),
      chartOptions: {
        layout: {
          padding: {
            right: 18,
          },
        },
        scales: {
          x: {
            min: 0,
            max: 8,
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
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=915cffed372954b7b44804ed422b9cf0&libraries=services";
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
      default: 400,
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
      console.log(this.house);
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
      }
    },
  },
  methods: {
    ...mapMutations(["CLEAR_DEAL_LIST"]),
  },
  computed: {
    ...mapState(["deals", "starbuck", "metro", "house"]),
  },
};

// function moveScroll() {
//   const {
//     ctx,
//     canvas,
//     chartArea: { left, right, top, bottom, width, height },
//   } = myChart;
//   canvas.addEventListener("click", (event) => {
//     const rect = canvas.getBoundingClientRect();

//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;

//     if (
//       x >= left - 15 &&
//       x <= left + 15 &&
//       y >= height / 2 + top - 15 &&
//       y <= height / 2 + top + 15
//     ) {
//       myChart.options.scales.x.min = myChart.options.scales.x.min + 8;
//       myChart.options.scales.x.max = myChart.options.scales.x.max + 8;
//       if (myChart.options.scales.x.min <= 0) {
//         mychart.options.scales.x.min = 0;
//         mychart.options.scales.x.max = 7;
//       }
//     }
//     if (
//       x >= right - 15 &&
//       x <= right + 15 &&
//       y >= height / 2 + top - 15 &&
//       y <= height / 2 + top + 15
//     ) {
//       myChart.options.scales.x.min = myChart.options.scales.x.min + 8;
//       myChart.options.scales.x.max = myChart.options.scales.x.max + 8;
//       if (myChart.options.scales.x.max >= this.deals.datasets[0].data.length) {
//         mychart.options.scales.x.min = this.deals.datasets[0].data.length - 8;
//         mychart.options.scales.x.max = this.deals.datasets[0].data.length;
//       }
//     }
//     myChart.update();
//   });
// }
// myChart.ctx.onclick = moveScroll();
</script>

<style></style>
