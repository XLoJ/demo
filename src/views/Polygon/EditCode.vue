<template>
  <div>
    <div class="mb-4 buttons">
      <b-select v-model="lang" placeholder="选择语言">
        <option
          v-for="option in LangList"
          :value="option.value"
          :key="option.id"
        >
          {{ option.id }}
        </option>
      </b-select>
      <b-button class="mb-0 ml-2" type="is-success" @click="submit"
        >上传
      </b-button>
    </div>
    <div style="min-height: 500px; height: 500px">
      <Editor v-model="code" :lang="lang"></Editor>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import Editor from '@/components/Editor.vue';
import { uploadProblemCode } from '@/service/polygon';
import { b64decode, useSnackbar } from '@/utils';
import { LangList } from '@/constants';

export default defineComponent({
  name: 'EditCode.vue',
  props: {
    problem: Object,
    type: String
  },
  components: {
    Editor
  },
  setup(props) {
    const problem = props.problem!;
    const type = props.type!;

    const code = ref('');
    const lang = ref('cpp');

    if (type === 'validator' && problem.validator) {
      code.value = b64decode(problem.validator.body);
      lang.value = problem.validator.language;
    }
    if (type === 'checker' && problem.checker) {
      code.value = b64decode(problem.checker.body);
      lang.value = problem.solution.language;
    }
    if (type === 'solution' && problem.solution) {
      code.value = b64decode(problem.solution.body);
      lang.value = problem.solution.language;
    }

    const snackbar = useSnackbar();
    const submit = async () => {
      try {
        problem[type] = await uploadProblemCode(
          problem.parent,
          type,
          code.value,
          lang.value
        );
        snackbar.open(`题目 ${problem.parent} 的 ${type} 上传成功`);
      } catch (err) {
        snackbar.open({
          message: err.message,
          type: 'is-danger'
        });
      }
    };

    return {
      code,
      lang,
      submit,
      LangList
    };
  }
});
</script>

<style scoped></style>
