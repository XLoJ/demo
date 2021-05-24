<template>
  <div>
    <b-collapse :open="isOpen" animation="slide" class="card">
      <template #trigger="props">
        <div
          aria-controls="contentIdForA11y3"
          class="card-header"
          role="button"
        >
          <p class="card-header-title">提交评测</p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
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
              >提交
            </b-button>
          </div>
          <div style="height: 500px">
            <Editor
              v-model="submission.body"
              :lang="submission.language"
            ></Editor>
          </div>
          <div>
            <b-button class="mt-4" type="is-success" @click="submit"
              >提交
            </b-button>
          </div>
        </div>
      </div>
    </b-collapse>

    <div class="test-judge mt-6">
      <b-table :data="allSubmissions" bordered>
        <b-table-column v-slot="props" centered label="#" width="5em">
          <span class="has-text-weight-bold">{{ props.row.id }}</span>
        </b-table-column>
        <b-table-column v-slot="props" centered label="提交时间" width="12em">
          <span>{{ parseTime(props.row.createTime) }}</span>
        </b-table-column>
        <b-table-column centered label="用户">
          <router-link :to="{ name: 'Profile' }">{{
            user.nickname
          }}</router-link>
        </b-table-column>
        <b-table-column centered label="题目">
          <router-link :to="{ name: 'Polygon', params: { id: problem.parent } }"
            >{{ problem.parent }}. {{ problem.title }}
          </router-link>
        </b-table-column>
        <b-table-column v-slot="props" centered label="语言" width="7em"
          ><Language :lang="props.row.language"></Language
        ></b-table-column>
        <b-table-column v-slot="props" centered label="评测结果" width="15em">
          <Verdict :verdict="props.row.verdict"></Verdict>
        </b-table-column>
        <b-table-column v-slot="props" centered label="用时" width="8em"
          >{{ props.row.time }} ms</b-table-column
        >
        <b-table-column v-slot="props" centered label="内存" width="8em"
          >{{ props.row.memory }} MB</b-table-column
        >
        <b-table-column v-slot="props" centered label="评测机" width="8em">{{
          props.row.from
        }}</b-table-column>
      </b-table>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs';

import { defineComponent, reactive, ref } from '@vue/composition-api';
import { useLocalStorage } from '@vueuse/core';
import Editor from '@/components/Editor.vue';
import Verdict from '@/components/Verdict.vue';
import Language from '@/components/Language.vue';
import { LangList } from '@/constants';
import { getTestJudgeSubmissions, submitTestJudge } from '@/service/polygon';
import { useSnackbar } from '@/utils';
import { useUser } from '@/service/user';

const parseTime = (timestamp: string) => {
  return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
};

export default defineComponent({
  name: 'TestJudge',
  components: {
    Editor,
    Verdict,
    Language
  },
  props: {
    problem: Object
  },
  setup(props: any) {
    const snackbar = useSnackbar();
    const { user } = useUser();

    const isOpen = ref(true);

    const submission = useLocalStorage(
      `polygon/history/judge/${props.problem.parent}`,
      { body: '', language: 'cpp' }
    );

    const allSubmissions = reactive([] as any);

    const submit = async () => {
      try {
        const data = await submitTestJudge(
          props.problem.parent,
          submission.value.body,
          submission.value.language
        );
        snackbar.open(`评测 ${data.id}. 提交成功`);
        allSubmissions.unshift(data);
        isOpen.value = false;
      } catch (err) {
        snackbar.open({
          message: err.message,
          type: 'is-danger'
        });
      }
    };

    getTestJudgeSubmissions(props.problem.parent).then((data) => {
      allSubmissions.push(...data);
    });

    return {
      LangList,
      user,
      isOpen,
      submission,
      submit,
      allSubmissions,
      parseTime
    };
  }
});
</script>

<style>
.test-judge .table thead {
  background-color: rgb(249, 250, 251) !important;
}
</style>
