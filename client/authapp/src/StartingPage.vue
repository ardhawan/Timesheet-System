<template>
  <div>
    <router-link class="routerLink" to="/app"><p class ="starting-text">Welcome to the website</p></router-link>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.starting-text
{
  text-align: center;
  font-size: 40px;
  margin-top: -6px;
  color: #4365e2;
}

.routerLink{
  text-decoration: none;
}
</style>