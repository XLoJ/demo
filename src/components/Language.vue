<template>
  <span>{{ value }}</span>
</template>

<script>
import { LangList } from '@/constants';

export default {
  name: 'Language',
  props: {
    lang: String
  },
  computed: {
    value() {
      for (const { id, value } of LangList) {
        if (this.lang === value) {
          return id;
        }
      }
      return 'Unknwon';
    }
  }
};
</script>

<style scoped></style>
