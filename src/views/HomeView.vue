<template>
  <div class="home">
      <section class="container-fluid main-banner p-5">
        <div class="banner-title-box">
           <div class="banner-title display-3 text-center p-5 text-white border-bottom border-2">
            FIND HOME
          </div>
        </div>
      </section>    
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'HomeView',
  components: {
  }
}
</script>

<style>
.main-banner{
  background-image: linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url("https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyamin-mellish-186077.jpg&fm=jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  height:700px;
}  
</style>
