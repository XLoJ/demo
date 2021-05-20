<template>
  <section>
    <b-field label="标题">
      <b-input v-model="title"></b-input>
    </b-field>
    <b-field label="题面">
      <b-input v-model="legend" type="textarea"></b-input>
    </b-field>
    <b-field label="输入描述">
      <b-input v-model="inputFormat" type="textarea"></b-input>
    </b-field>
    <b-field label="输出描述">
      <b-input v-model="outputFormat" type="textarea"></b-input>
    </b-field>
    <b-field label="提示">
      <b-input v-model="notes" type="textarea"></b-input>
    </b-field>
    <div class="buttons">
      <b-button type="is-success" @click="submit">更新</b-button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { updateProblemInfo } from '@/service/polygon';
import { useSnackbar } from '@/utils';

export default defineComponent({
  name: 'EditStatement',
  props: {
    problem: Object
  },
  setup(props) {
    const problem = props.problem!;

    const title = ref(problem.title);
    const legend = ref(problem.legend);
    const inputFormat = ref(problem.inputFormat);
    const outputFormat = ref(problem.outputFormat);
    const notes = ref(problem.notes);

    const snackbar = useSnackbar();
    const submit = async () => {
      try {
        await updateProblemInfo(problem.parent, {
          title: title.value,
          legend: legend.value,
          inputFormat: inputFormat.value,
          outputFormat: outputFormat.value,
          notes: notes.value
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
      title,
      legend,
      inputFormat,
      outputFormat,
      notes,
      submit
    };
  }
});
</script>

<style scoped></style>
