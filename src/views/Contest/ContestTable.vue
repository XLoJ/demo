<template>
  <b-table :data="data" class="mb-4">
    <b-table-column v-slot="props" field="name" label="名称" width="750">
      <router-link :to="{ name: 'Contest', params: { id: props.row.id } }"
        >{{ props.row.name }}
      </router-link>
    </b-table-column>
    <b-table-column centered v-slot="props" field="start_time" label="开始时间">
      <span>{{ formatTime(props.row.startTime) }}</span>
    </b-table-column>
    <b-table-column centered v-slot="props" field="length" label="持续时间">
      <span>{{ formatDuration(props.row.duration) }}</span>
    </b-table-column>
    <b-table-column v-slot="props" field="writers" label="出题人">
      <span v-for="(writer, index) in props.row.writers" :key="index">{{
        writer
      }}</span>
    </b-table-column>
    <b-table-column label="榜单" v-slot="props">
      <router-link :to="{ name: 'Contest', params: { id: props.row.id } }"
        >10 人
      </router-link>
    </b-table-column>
  </b-table>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { formatTime } from '@/utils';
import dayjs from 'dayjs';

export default defineComponent({
  name: 'ContestTable',
  props: {
    data: Array
  },
  methods: {
    formatTime,
    formatDuration(duration: number) {
      const t = dayjs().hour(0).minute(0).add(duration, 'minute');
      return t.format('H:mm');
    }
  }
});
</script>

<style scoped></style>
