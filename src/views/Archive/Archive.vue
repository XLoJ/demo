<template>
  <b-tabs v-model="activeTab">
    <b-tab-item label="本地">
      <b-table :data="data" bordered>
        <b-table-column label="#" centered width="80" v-slot="props">
          <router-link :to="{ name: 'Contest' }">{{
            props.row.sid
          }}</router-link>
        </b-table-column>
        <b-table-column label="标题" centered v-slot="props">
          <router-link :to="{ name: 'Contest' }">{{
            props.row.writer
          }}</router-link>
        </b-table-column>
        <b-table-column label="解出人数" centered width="200" v-slot="props">
          <span>{{ props.row.create_time }}</span>
        </b-table-column>
      </b-table>
    </b-tab-item>

    <b-tab-item label="HDu"> </b-tab-item>

    <b-tab-item label="PKu"> </b-tab-item>
  </b-tabs>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'Archive',
  setup() {
    const activeTab = ref(0);
    return {
      activeTab
    };
  }
});
</script>

<style scoped></style>
