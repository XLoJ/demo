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
          <div v-if="lastSubmission" class="mt-4">
            <RealtimeSubmission
              :problem-link="{
                name: 'Polygon',
                params: { id: lastSubmission.problem }
              }"
              :submission="lastSubmission"
              :testcase-num="testcaseNum"
              :user="user"
              :problem-name="`${problem.parent}. ${problem.title}`"
            ></RealtimeSubmission>
          </div>
        </div>
      </div>
    </b-collapse>

    <div class="test-judge mt-6">
      <b-table :data="allSubmissions" bordered>
        <b-table-column v-slot="props" centered label="#" width="5em">
          <a
            class="has-text-weight-bold"
            @click="showSubmission(props.row.id)"
            >{{ props.row.id }}</a
          >
        </b-table-column>
        <b-table-column v-slot="props" centered label="提交时间" width="12em">
          <span>{{ parseTime(props.row.createTime) }}</span>
        </b-table-column>
        <b-table-column centered label="用户">
          <router-link :to="{ name: 'Profile' }"
            >{{ user.nickname }}
          </router-link>
        </b-table-column>
        <b-table-column centered label="题目">
          <router-link :to="{ name: 'Polygon', params: { id: problem.parent } }"
            >{{ problem.parent }}. {{ problem.title }}
          </router-link>
        </b-table-column>
        <b-table-column v-slot="props" centered label="语言" width="7em">
          <Language :lang="props.row.language"></Language>
        </b-table-column>
        <b-table-column v-slot="props" centered label="评测结果" width="15em">
          <Verdict :verdict="props.row.verdict"></Verdict>
        </b-table-column>
        <b-table-column v-slot="props" centered label="用时" width="8em"
          >{{ props.row.time }} ms
        </b-table-column>
        <b-table-column v-slot="props" centered label="内存" width="8em"
          >{{ props.row.memory }} MB
        </b-table-column>
        <b-table-column v-slot="props" centered label="评测机" width="8em"
          >{{ props.row.from }}
        </b-table-column>
      </b-table>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs';

import { defineComponent, reactive, ref } from '@vue/composition-api';
import { useLocalStorage } from '@vueuse/core';
import Editor from '@/components/Editor.vue';
import DisplayVerdict from '@/components/Verdict.vue';
import Language from '@/components/Language.vue';
import RealtimeSubmission from '../Problem/RealtimeSubmission.vue';
import { LangList } from '@/constants';
import {
  getDetailTestJudgeSubmission,
  getProblemInfo,
  getTestJudgeSubmissions,
  submitTestJudge
} from '@/service/polygon';
import { b64decode, useSnackbar } from '@/utils';
import { useUser } from '@/service/user';

import { isFinishVerdict, Verdict } from '../../verdict';

const parseTime = (timestamp: string) => {
  return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
};

export default defineComponent({
  name: 'TestJudge',
  components: {
    Editor,
    Verdict: DisplayVerdict,
    Language,
    RealtimeSubmission
  },
  props: {
    problem: Object
  },
  setup(props: any) {
    const snackbar = useSnackbar();
    const { user } = useUser();

    const testcaseNum = ref(props.problem.testcaseNum);

    getProblemInfo(props.problem.parent).then((data) => {
      testcaseNum.value = data.testcaseNum;
    });

    const isOpen = ref(true);

    const submission = useLocalStorage(
      `polygon/history/editor/${props.problem.parent}`,
      { body: '', language: 'cpp' }
    );

    const lastSubmission = ref();
    const runUpdate = (submission: any) => {
      if ('messages' in submission && Array.isArray(submission.messages)) {
        if (submission.messages.length > 0) {
          const lastVerdict =
            submission.messages[submission.messages.length - 1].verdict;
          if (isFinishVerdict(lastVerdict)) {
            return;
          }
        }
      }
      const ev = setInterval(async () => {
        const data = await getDetailTestJudgeSubmission(
          props.problem.parent,
          submission.id
        );
        const messages = data.messages;
        lastSubmission.value.time = data.time;
        lastSubmission.value.memory = data.memory;
        lastSubmission.value.verdict = data.verdict;
        lastSubmission.value.pass = data.pass;
        lastSubmission.value.from = data.from;
        for (
          let i = lastSubmission!.value.messages.length;
          i < messages.length;
          i++
        ) {
          lastSubmission!.value.messages.push(messages[i]);
        }
        console.log(messages);
        if (messages.length > 0) {
          const lastVerdict = messages[messages.length - 1].verdict;
          if (isFinishVerdict(lastVerdict)) {
            clearInterval(ev);
          }
        }
      }, 500);
    };

    const showSubmission = async (submissionId: number) => {
      const data = await getDetailTestJudgeSubmission(
        props.problem.parent,
        submissionId
      );
      submission.value.body = b64decode(data.body);
      submission.value.language = data.language;
      lastSubmission.value = data;
    };

    const lastSubmissionId = useLocalStorage(
      `polygon/history/submission/${props.problem.parent}`,
      -1
    );
    if (lastSubmissionId.value !== -1) {
      getDetailTestJudgeSubmission(
        props.problem.parent,
        lastSubmissionId.value
      ).then((data) => {
        lastSubmission.value = data;
        runUpdate(lastSubmission.value);
      });
    }

    const allSubmissions = reactive([] as any);

    const submit = async () => {
      try {
        const data = await submitTestJudge(
          props.problem.parent,
          submission.value.body,
          submission.value.language
        );
        data.messages = [];
        snackbar.open(`评测 ${data.id}. 提交成功`);

        lastSubmissionId.value = data.id;
        lastSubmission.value = data;
        allSubmissions.unshift(data);
        runUpdate(lastSubmission.value);
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
      showSubmission,
      submit,
      allSubmissions,
      lastSubmission,
      testcaseNum,
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
