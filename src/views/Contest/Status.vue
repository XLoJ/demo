<template>
  <div class="status">
    <b-table :data="data" bordered>
      <b-table-column label="#" centered v-slot="props">
        <router-link :to="{ name: 'Contest' }">{{ props.row.sid }}</router-link>
      </b-table-column>
      <b-table-column label="题目" centered v-slot="props">
        <router-link :to="{ name: 'Contest' }">{{ props.row.pid }}</router-link>
      </b-table-column>
      <b-table-column label="时间" centered v-slot="props">
        <span>{{ props.row.create_time }}</span>
      </b-table-column>
      <b-table-column label="送交者" centered v-slot="props">
        <router-link :to="{ name: 'Contest' }">{{
          props.row.writer
        }}</router-link>
      </b-table-column>
      <b-table-column label="语言" centered v-slot="props">
        <span>{{ props.row.lang }}</span>
      </b-table-column>
      <b-table-column label="评测结果" centered v-slot="props">
        <span>{{ props.row.verdict }}</span>
      </b-table-column>
      <b-table-column label="耗时" centered v-slot="props">
        <span>{{ props.row.time }} ms</span>
      </b-table-column>
      <b-table-column label="内存" centered v-slot="props">
        <span>{{ props.row.memory }} MB</span>
      </b-table-column>
    </b-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api';

export default defineComponent({
  name: 'Status',
  setup() {
    const data = reactive([
      {
        sid: 1,
        create_time: '2010-12-12 09:30',
        writer: 'XLor',
        pid: 1,
        lang: 'C++',
        verdict: 'Accepted',
        time: 100,
        memory: 10
      },
      {
        sid: 1,
        create_time: '2010-12-12 09:30',
        writer: 'XLor',
        pid: 1,
        lang: 'C++',
        verdict: 'Accepted',
        time: 100,
        memory: 10
      },
      {
        sid: 1,
        create_time: '2010-12-12 09:30',
        writer: 'XLor',
        pid: 1,
        lang: 'C++',
        verdict: 'Accepted',
        time: 100,
        memory: 10
      }
    ]);
    return {
      data
    };
  }
});
</script>

<style scoped></style>
