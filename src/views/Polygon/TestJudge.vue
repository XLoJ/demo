<template>
  <div>
    <b-collapse animation="slide" class="card" :open="isOpen">
      <template #trigger="props">
        <div
          aria-controls="contentIdForA11y3"
          class="card-header"
          role="button"
        >
          <p class="card-header-title">提交评测</p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
          </a>
        </div>
      </template>

      <div class="card-content">
        <div class="content">
          <div class="mb-4 buttons">
            <b-select v-model="submission.language" placeholder="选择语言">
              <option
                v-for="option in LangList"
                :key="option.id"
                :value="option.value"
              >
                {{ option.id }}
              </option>
            </b-select>
            <b-button class="mb-0 ml-2" type="is-success" @click="submit"
              >提交</b-button
            >
          </div>
          <div style="height: 500px">
            <Editor
              v-model="submission.body"
              :lang="submission.language"
            ></Editor>
          </div>
          <div>
            <b-button class="mt-4" type="is-success" @click="submit"
              >提交</b-button
            >
          </div>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { useLocalStorage } from '@vueuse/core';
import Editor from '@/components/Editor.vue';
import { LangList } from '@/constants';
import { submitTestJudge } from '@/service/polygon';
import { useSnackbar } from '@/utils';

export default defineComponent({
  name: 'TestJudge',
  components: {
    Editor
  },
  props: {
    problem: Object
  },
  setup(props: any) {
    const snackbar = useSnackbar();

    const isOpen = ref(true);

    const submission = useLocalStorage(
      `polygon/history/judge/${props.problem.parent}`,
      { body: '', language: 'cpp' }
    );

    const submit = async () => {
      try {
        const data = await submitTestJudge(
          props.problem.parent,
          submission.value.body,
          submission.value.language
        );
        snackbar.open(`评测 ${data.submissionId}. 提交成功`);
        isOpen.value = false;
      } catch (err) {
        snackbar.open({
          message: err.message,
          type: 'is-danger'
        });
      }
    };

    return {
      LangList,
      isOpen,
      submission,
      submit
    };
  }
});
</script>

<style scoped></style>
