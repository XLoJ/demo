<template>
  <b-select v-model="value" placeholder="选择语言">
    <option v-for="option in LangList" :value="option.value" :key="option.id">
      {{ option.id }}
    </option>
  </b-select>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { LangList } from '../constants';

export default defineComponent({
  name: 'SelectLanguage',
  props: {
    language: String
  },
  model: {
    prop: 'language',
    event: 'change'
  },
  data() {
    return {
      value: this.language,
      LangList
    };
  },
  watch: {
    language(nV, oV) {
      if (nV !== oV) {
        this.value = nV;
      }
    },
    value(nV, oV) {
      if (nV !== oV) {
        this.$emit('change', nV);
      }
    }
  }
});
</script>

<style scoped></style>
