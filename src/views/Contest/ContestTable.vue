<template>
  <b-table :data="data" class="mb-4">
    <b-table-column v-slot="props" centered label="#" width="3em">
      <span class="has-text-weight-bold">{{ props.row.id }} </span>
    </b-table-column>
    <b-table-column v-slot="props" field="name" label="名称">
      <router-link :to="{ name: 'Contest', params: { id: props.row.id } }"
        >{{ props.row.name }}
      </router-link>
    </b-table-column>

    <b-table-column
      v-if="creator"
      centered
      label="创建者"
      v-slot="props"
      width="5em"
    >
      <UserLink :user="props.row.creator"></UserLink>
    </b-table-column>

    <b-table-column
      centered
      v-slot="props"
      field="start_time"
      label="开始时间"
      width="10em"
    >
      <span>{{ formatStartTime(props.row.startTime) }}</span>
    </b-table-column>
    <b-table-column
      centered
      v-slot="props"
      field="length"
      label="持续时间"
      width="6em"
    >
      <span>{{ formatDuration(props.row.duration) }}</span>
    </b-table-column>
    <b-table-column
      v-slot="props"
      centered
      field="writers"
      label="出题人"
      width="10em"
    >
      <UserLink
        v-for="(writer, index) in props.row.writers"
        :key="index"
        :user="writer"
        class="mr-1 mb-1"
      ></UserLink>
    </b-table-column>
    <b-table-column label="榜单" v-slot="props" width="5em">
      <router-link :to="{ name: 'Contest', params: { id: props.row.id } }"
        >10 人
      </router-link>
    </b-table-column>

    <template #empty>
      <div class="has-text-weight-bold has-text-centered">没有比赛</div>
    </template>
  </b-table>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { formatDuration, formatStartTime } from '@/views/Contest/utils';
import UserLink from '@/components/UserLink.vue';

export default defineComponent({
  name: 'ContestTable',
  props: {
    data: Array,
    creator: {
      type: Boolean,
      default: false
    }
  },
  components: {
    UserLink
  },
  methods: {
    formatStartTime,
    formatDuration
  }
});
</script>

<style scoped></style>
