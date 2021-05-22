<template>
  <div class="columns">
    <div class="column">
      <slot></slot>
    </div>
    <div class="column has-text-right is-family-monospace">
      <span><span class="has-text-weight-bold">评测机</span> {{ from }}</span>
      <span class="ml-4"
        ><span class="has-text-weight-bold">时间</span>
        {{ parseTime(timestamp) }}</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import dayjs from 'dayjs';

export default defineComponent({
  name: 'MessageViewHeader',
  props: {
    from: String,
    timestamp: String
  },
  methods: {
    parseTime(timestamp: string) {
      return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
    }
  }
});
</script>
