<template>
  <div>
    <div class="content dashboard">
      <b-table
        :data="problems"
        :row-class="(row) => !row.visible && 'has-background-light'"
        bordered
      >
        <b-table-column v-slot="props" centered label="#" width="48">
          <span class="has-text-weight-bold">{{ props.row.index + 1 }}</span>
        </b-table-column>
        <b-table-column v-slot="props" label="名称">
          <router-link
            :to="{ name: 'ArchiveProblem', params: { index: props.row.index } }"
            >{{ props.row.problem.title }}
          </router-link>
        </b-table-column>
        <b-table-column v-slot="props" centered label="操作" width="6em">
          <div class="buttons">
            <b-button
              :icon-left="props.row.visible ? 'eye-off' : 'eye'"
              :type="props.row.visible ? 'is-danger' : 'is-success'"
              size="is-small"
              @click="updateVisible(props.index)"
            />
            <b-button
              icon-left="delete"
              size="is-small"
              type="is-danger"
              @click="removeProblem(props.index)"
            />
          </div>
        </b-table-column>

        <template #empty>
          <div class="has-text-weight-bold has-text-centered">没有题目</div>
        </template>
      </b-table>

      <b-field class="mt-4" label="题目编号">
        <b-input v-model="problemId"></b-input>
      </b-field>
      <b-button expanded type="is-success" @click="pushProblem">添加 </b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { useSnackbar } from '@/utils';
import {
  pushContestProblem,
  removeContestProblem,
  setContestProblemVisible,
  useContestInfo
} from '@/service/contest';
import { numberToIndex } from '@/views/Contest/utils';
import { LocalContestId } from '@/constants';

export default defineComponent({
  name: 'EditArchive',
  setup() {
    const contest = useContestInfo(LocalContestId);
    const snackbar = useSnackbar();
    const problems = computed(() => {
      if (contest.value) {
        return contest.value.problems;
      } else {
        return [];
      }
    });
    const problemId = ref('');
    const pushProblem = async () => {
      if (problemId.value && /^\d+$/.test(problemId.value.trim())) {
        const id = +problemId.value.trim();
        try {
          const data = await pushContestProblem(LocalContestId, id);
          snackbar.open(
            `题目 ${data.problem.id}. ${data.problem.title} 添加成功`
          );
          contest.value.problems.push(data);
          contest.value.problems.sort(
            (lhs: any, rhs: any) => lhs.index - rhs.index
          );
        } catch (err) {
          snackbar.open({
            message: err.message,
            type: 'is-danger'
          });
        }
      }
      problemId.value = '';
    };
    const updateVisible = async (index: number) => {
      const id = problems.value[index].id;
      const visible = !problems.value[index].visible;
      try {
        await setContestProblemVisible(LocalContestId, id, visible);
        snackbar.open(`题目 ${problems.value[index].problem.id}. 更新成功`);
        problems.value[index].visible = visible;
      } catch (err) {
        snackbar.open({
          message: err.message,
          type: 'is-danger'
        });
      }
    };
    const removeProblem = async (index: number) => {
      const id = problems.value[index].id;
      try {
        await removeContestProblem(LocalContestId, id);
        snackbar.open(`题目 ${problems.value[index].problem.id}. 删除成功`);
        problems.value.splice(index, 1);
      } catch (err) {
        snackbar.open({
          message: err.message,
          type: 'is-danger'
        });
      }
    };

    return {
      problems,
      numberToIndex,
      problemId,
      pushProblem,
      updateVisible,
      removeProblem
    };
  }
});
</script>

<style scoped></style>
