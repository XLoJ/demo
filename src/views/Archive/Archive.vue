<template>
  <div>
    <b-table :data="problems">
      <b-table-column v-slot="props" centered label="#" width="64">
        <router-link :to="{ name: 'Contest' }"
          >{{ props.row.pid }}
        </router-link>
      </b-table-column>
      <b-table-column v-slot="props" label="标题">
        <router-link :to="{ name: 'Contest' }"
          >{{ props.row.name }}
        </router-link>
      </b-table-column>
      <b-table-column centered label="解出人数" width="100">
        <span>10</span>
      </b-table-column>
    </b-table>
  </div>
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
