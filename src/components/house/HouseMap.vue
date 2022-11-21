<template>
  <b-container>
    <b-input-group class="mt-3">
      <b-form-checkbox-group
        id="checkbox-group-1"
        v-model="sel"
        :options="options"
        :aria-describedby="ariaDescribedby"
        name="flavour-1"
      ></b-form-checkbox-group>
      <b-form-input v-model="keyword"></b-form-input>
      <b-input-group-append>
        <b-button variant="outline-primary" @click="searchByKeyword">search</b-button>
      </b-input-group-append>
    </b-input-group>
    <b-container id="map"> </b-container>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HouseMap",
  data() {
    return {
      keyword:"",
      sel: [],
      options: [
        { text: "Starbucks", value: "coffee" },
        { text: "지하철", value: "metro" },
      ],
      keymarkers: [],
      markers: [],
      coffee: [],
      subway: [],
      edu:[],
      customs: [],
    };
  },
  computed: {
    ...mapState(["houses", "starbucks", "metros","schools"]),
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
    searchByKeyword() {
      this.keymarkers.forEach((m) => {
        m.setMap(null);
      });
      if (this.keyword != "") {
        var ps = new kakao.maps.services.Places();

        // 키워드로 장소를 검색합니다
        ps.keywordSearch(this.keyword, this.placesSearchCB);
      }
    },
    placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        for (var i = 0; i < data.length; i++) {
          this.displayMarker(data[i]);
        }
      }
    },
    displayMarker(place) {
      let coords = new kakao.maps.LatLng(place.y, place.x);
      // 마커를 생성하고 지도에 표시합니다
        let imageSrc = require("@/assets/keyword.png"); // 마커이미지의 주소입니다
        let imageSize = new kakao.maps.Size(20, 21); // 마커이미지의 크기입니다
        let imageOption = { offset: new kakao.maps.Point(0, 0) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

var marker = new kakao.maps.Marker({
        map: this.map,
        position: coords,
        image: markerImage,
      });
      this.keymarkers.push(marker);
      let infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`,
        position: coords,
      });
      kakao.maps.event.addListener(marker, "mouseover", () => {
        infowindow.open(this.map, marker);
      });
      kakao.maps.event.addListener(marker, "mouseout", () => {
        infowindow.close();
      });
    },
    showDetail(h) {
      this.$emit("houseDetail", h);
    },
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
        draggable:true
      };
      this.map = new kakao.maps.Map(container, options);
    },
  },
  watch: {
    houses: function () {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }
      if (this.houses != null && this.houses.length > 0) {
        let imageSrc = require("@/assets/home.png"); // 마커이미지의 주소입니다
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
    sel: function () {
      console.log(this.sel);
      console.log(this.starbucks);
      if (this.sel.includes("coffee")) {
        let imageSrc = require("@/assets/coffee.png"); // 마커이미지의 주소입니다
        let imageSize = new kakao.maps.Size(15, 16); // 마커이미지의 크기입니다
        let imageOption = { offset: new kakao.maps.Point(0, 0) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
        this.starbucks.forEach((star) => {
          var coords;
          coords = new kakao.maps.LatLng(star.lat, star.lng);
          const marker = new kakao.maps.Marker({
            map: this.map,
            position: coords,
            image: markerImage,
            clickable: true,
          });
          var infoWindow = new kakao.maps.InfoWindow({
            content: `<div style="width:100%; padding:5px;font-size:12px;">${star.name}점</div>`,
            position: coords,
          });
          kakao.maps.event.addListener(marker, "mouseover", () => {
            infoWindow.open(this.map, marker);
          });
          kakao.maps.event.addListener(marker, "mouseout", () => {
            infoWindow.close();
          });

          this.coffee.push(marker);
        });
      } else {
        this.coffee.forEach((c) => {
          c.setMap(null);
        });
      }
      if (this.sel.includes("metro")) {
        let imageSrc = require("@/assets/subway.png"); // 마커이미지의 주소입니다
        let imageSize = new kakao.maps.Size(20, 21); // 마커이미지의 크기입니다
        let imageOption = { offset: new kakao.maps.Point(0, 0) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
        this.metros.forEach((sub) => {
          var coords;
          coords = new kakao.maps.LatLng(sub.lat, sub.lng);
          const marker = new kakao.maps.Marker({
            map: this.map,
            position: coords,
            image: markerImage,
            clickable: true,
          });
          var infoWindow = new kakao.maps.InfoWindow({
            content: `<div style="width:100%; padding:5px;font-size:12px;">${sub.name}</div>`,
            position: coords,
          });
          kakao.maps.event.addListener(marker, "mouseover", () => {
            infoWindow.open(this.map, marker);
          });
          kakao.maps.event.addListener(marker, "mouseout", () => {
            infoWindow.close();
          });

          this.subway.push(marker);
        });
      } else {
        this.subway.forEach((s) => {
          s.setMap(null);
        });
      }

      if (this.sel.includes("edu")) {
        let imageSrc = require("@/assets/school.png"); // 마커이미지의 주소입니다
        let imageSize = new kakao.maps.Size(20, 21); // 마커이미지의 크기입니다
        let imageOption = { offset: new kakao.maps.Point(0, 0) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
        this.schools.forEach((sh) => {
          var coords;
          coords = new kakao.maps.LatLng(sh.lat, sh.lng);
          const marker = new kakao.maps.Marker({
            map: this.map,
            position: coords,
            image: markerImage,
            clickable: true,
          });
          var infoWindow = new kakao.maps.InfoWindow({
            content: `<div style="width:100%; padding:5px;font-size:12px;">${sh.name}</div>`,
            position: coords,
          });
          kakao.maps.event.addListener(marker, "mouseover", () => {
            infoWindow.open(this.map, marker);
          });
          kakao.maps.event.addListener(marker, "mouseout", () => {
            infoWindow.close();
          });

          this.edu.push(marker);
        });
      } else {
        this.edu.forEach((s) => {
          s.setMap(null);
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
