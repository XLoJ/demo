<template>
  <div>
    <section>
      <b-field label="时间限制（单位：ms）">
        <b-numberinput
          v-model="timeLimit"
          type="is-light"
          min="1000"
          max="15000"
          step="1000"
        ></b-numberinput>
      </b-field>
      <b-field label="空间限制（单位：MB）">
        <b-numberinput
          v-model="memoryLimit"
          type="is-light"
          min="32"
          max="1024"
        ></b-numberinput>
      </b-field>
      <b-field label="标签">
        <b-taginput
          v-model="tags"
          placeholder="添加标签"
          aria-close-label="删除标签"
        >
        </b-taginput>
      </b-field>
      <b-button type="is-success" @click="submit">更新</b-button>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { updateProblemInfo } from '@/service/polygon';
import { useSnackbar } from '@/utils';

export default defineComponent({
  name: 'ProblemInfo',
  props: {
    problem: Object
  },
  setup(props) {
    const problem = props.problem!;
    const timeLimit = ref(problem.timeLimit);
    const memoryLimit = ref(problem.memoryLimit);
    const tags = ref(problem.tags);

    const snackbar = useSnackbar();

    const submit = async () => {
      try {
        await updateProblemInfo(problem.parent, {
          timeLimit: timeLimit.value,
          memoryLimit: memoryLimit.value,
          tags: tags.value
        });
        snackbar.open(`题目 ${problem.parent} 更新成功`);
      } catch (err) {
        snackbar.open({
          message: err.message,
          type: 'is-danger'
        });
      }
    };

    return {
      timeLimit,
      memoryLimit,
      tags,
      submit
    };
  }
});
</script>

<style scoped></style>
