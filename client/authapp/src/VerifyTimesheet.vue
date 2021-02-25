<template>
  <div>
    <div class="nav-bar">
      <img src="./assets/logo-white.png">
      <p class="back-btn">Back</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VerifyTimesheet'
};
</script>

<style scoped>
.nav-bar {
  margin: -8px;
  margin-top: 0px;
  margin-top: -90px;
  background-color: #4365e2;
  display: flex;
}

.back-btn {
  color: white;
  font-size: 2.25rem;
  position: absolute;
  right: 0;
  margin-right: 1.5rem;
  margin-top: 2rem; 
  cursor: pointer;
}
</style>