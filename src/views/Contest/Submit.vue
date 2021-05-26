<template>
  <div class="box" @keypress.ctrl.enter="submit">
    <div class="is-flex is-align-items-center">
      <SelectLanguage v-model="lang"></SelectLanguage>
      <b-button type="is-success" class="ml-4" @click="submit">提交</b-button>
    </div>
    <div class="mt-4" style="height: 500px">
      <Editor v-model="code"></Editor>
    </div>
    <div class="mt-4">
      <b-button type="is-success" @click="submit">提交</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api';
import Editor from '@/components/Editor.vue';
import SelectLanguage from '@/components/SelectLanguage.vue';
import { toRefs, useLocalStorage } from '@vueuse/core';
import { useSnackbar } from '@/utils';
import { submitCode } from '@/service/contest';

export default defineComponent({
  name: 'Submit',
  components: {
    Editor,
    SelectLanguage
  },
  props: {
    contestId: Number,
    contestProblemId: Number
  },
  setup(props) {
    const { contestId, contestProblemId } = toRefs(props);

    const snackbar = useSnackbar();

    const lang = useLocalStorage('submit/language', 'cpp');
    const code = useLocalStorage(`submit/code/${contestProblemId}`, '');

    const submit = async () => {
      try {
        const data = await submitCode(
          contestId.value,
          contestProblemId.value,
          code.value,
          lang.value
        );
        snackbar.open('提交成功');
      } catch (err) {
        snackbar.open({
          message: err.message,
          type: 'is-danger'
        });
      }
    };

    return {
      lang,
      code,
      submit
    };
  }
});
</script>

<style scoped></style>
