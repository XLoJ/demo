<template>
  <EditCode :problem="problem" type="solution"></EditCode>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import EditCode from './EditCode.vue';

export default defineComponent({
  name: 'UploadSolution',
  props: {
    problem: Object
  },
  components: {
    EditCode
  }
});
</script>
