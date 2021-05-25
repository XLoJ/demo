<template>
  <router-link :to="{ name: 'Profile' }">{{ user.nickname }}</router-link>
</template>

<script>
export default {
  name: 'UserLink',
  props: {
    user: Object
  }
};
</script>

<style scoped></style>
