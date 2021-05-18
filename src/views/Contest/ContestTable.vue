<template>
  <b-table :data="data" class="mb-4">
    <b-table-column v-slot="props" field="name" label="名称" width="750">
      <router-link :to="{ name: 'Contest', params: { id: props.row.id } }">{{
        props.row.name
      }}</router-link>
    </b-table-column>
    <b-table-column v-slot="props" field="start_time" label="开始时间">
      <span>{{ props.row.start_time }}</span>
    </b-table-column>
    <b-table-column centered v-slot="props" field="length" label="持续时间">
      <span>{{ props.row.length }}</span>
    </b-table-column>
    <b-table-column v-slot="props" field="writers" label="出题人">
      <span v-for="(writer, index) in props.row.writers" :key="index">{{
        writer
      }}</span>
    </b-table-column>
    <b-table-column label="榜单">
      <router-link :to="{ name: 'Contest' }">10 人</router-link>
    </b-table-column>
  </b-table>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'ContestTable',
  props: {
    data: Array
  }
});
</script>

<style scoped></style>
