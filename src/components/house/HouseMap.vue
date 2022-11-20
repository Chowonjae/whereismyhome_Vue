<template>
  <b-container id="map"> </b-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HouseMap",
  data() {
    return {
      markers: [],
      customs: [],
    };
  },
  computed: {
    ...mapState(["houses"]),
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=915cffed372954b7b44804ed422b9cf0&libraries=services";
      document.head.appendChild(script);
    }
  },
  methods: {
    showDetail(h) {
      this.$emit("houseDetail", h);
    },
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };
      this.map = new kakao.maps.Map(container, options);
    },
  },
  watch: {
    houses: function () {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }
      if (this.houses.length > 0) {
        const imageSrc = require("@/assets/home.png"); // 마커이미지의 주소입니다
        let imageSize = new kakao.maps.Size(20, 21); // 마커이미지의 크기입니다
        let imageOption = { offset: new kakao.maps.Point(0, 0) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
        // 주소-좌표 변환 객체를 생성합니다
        const bounds = new kakao.maps.LatLngBounds();
        this.houses.forEach((house) => {
          var coords;
          coords = new kakao.maps.LatLng(house.lat, house.lng);
          const marker = new kakao.maps.Marker({
            map: this.map,
            position: coords,
            image: markerImage,
            clickable: true,
          });
          var infoWindow = new kakao.maps.InfoWindow({
            content: `<div style="width:100%; padding:5px;font-size:12px;">${house.apartmentName}</div>`,
            position: coords,
          });
          kakao.maps.event.addListener(marker, "mouseover", () => {
            infoWindow.open(this.map, marker);
          });
          kakao.maps.event.addListener(marker, "mouseout", () => {
            infoWindow.close();
          });
          kakao.maps.event.addListener(marker, "click", () => {
            this.showDetail(house);
          });

          this.markers.push(marker);
          bounds.extend(coords);
          this.map.setBounds(bounds);
        });
      }
    },
  },
};
</script>

<style>
#map {
  height: 500px;
  border: 1px #a8a8a8 solid;
}
</style>
