<template>
  <b-tabs v-model="activeTab">
    <b-tab-item label="本地">
      <b-table :data="problems" bordered>
        <b-table-column label="#" centered width="64" v-slot="props">
          <router-link :to="{ name: 'Contest' }">{{
            props.row.pid
          }}</router-link>
        </b-table-column>
        <b-table-column label="标题" v-slot="props">
          <router-link :to="{ name: 'Contest' }">{{
            props.row.name
          }}</router-link>
        </b-table-column>
        <b-table-column label="解出人数" centered width="100">
          <span>10</span>
        </b-table-column>
      </b-table>
    </b-tab-item>

    <b-tab-item label="HDu"> </b-tab-item>

    <b-tab-item label="PKu"> </b-tab-item>
  </b-tabs>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'Archive',
  setup() {
    const activeTab = ref(0);
    const problems = reactive([
      {
        pid: 1,
        name: 'A + B'
      },
      {
        pid: 2,
        name: 'A - B'
      }
    ]);

    return {
      activeTab,
      problems
    };
  }
});
</script>

<style scoped></style>
