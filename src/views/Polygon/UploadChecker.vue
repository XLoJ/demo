<template>
  <EditCode :problem="problem" type="checker"></EditCode>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import EditCode from './EditCode.vue';

export default defineComponent({
  name: 'UploadChecker',
  props: {
    problem: Object
  },
  components: {
    EditCode
  }
});
</script>
