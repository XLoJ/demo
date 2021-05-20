<template>
  <EditCode :problem="problem" type="validator"></EditCode>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import EditCode from './EditCode.vue';

export default defineComponent({
  name: 'UploadValidator',
  props: {
    problem: Object
  },
  components: {
    EditCode
  }
});
</script>
