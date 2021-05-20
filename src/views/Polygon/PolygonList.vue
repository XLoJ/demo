<template>
  <div>
    <h4 class="title is-4">Polygon</h4>
    <div class="mb-4">
      <router-link
        class="button is-success"
        :to="{ name: 'PolygonCreateProblem' }"
      >
        <b-icon icon="upload"></b-icon>
        <span>创建题目</span>
      </router-link>
    </div>
    <div>
      <b-table :data="problems">
        <b-table-column v-slot="props" centered label="#" width="64">
          <span>{{ props.row.id }}</span>
        </b-table-column>
        <b-table-column v-slot="props" label="名称">
          <router-link :to="{ name: 'Polygon', params: { id: props.row.id } }"
            >{{ props.row.title }}
          </router-link>
        </b-table-column>
        <b-table-column label="操作" centered width="80">
          <b-button
            size="is-small"
            icon-left="delete"
            type="is-danger"
          ></b-button>
        </b-table-column>
      </b-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api';
import { getPolygonList } from '@/service/user';

export default defineComponent({
  name: 'PolygonList',
  setup() {
    const problems = reactive([] as any[]);

    getPolygonList().then((data: any[]) => {
      problems.push(...data);
    });

    return {
      problems
    };
  }
});
</script>

<style scoped></style>
