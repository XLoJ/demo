<template>
  <div>排行榜</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Standings',
  props: {
    contest: Object,
    id: [Number, String]
  }
});
</script>

<style scoped></style>
