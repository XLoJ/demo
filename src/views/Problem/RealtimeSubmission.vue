<template>
  <div class="real-time-submission">
    <div class="b-table">
      <div class="table-wrapper has-mobile-cards">
        <table
          class="table is-bordered"
          style="table-layout: fixed; width: 100%"
        >
          <thead>
            <tr>
              <th class="" draggable="false" style="width: 5em">
                <div class="th-wrap is-centered">
                  <span class="is-relative">
                    #
                    <span class="icon sort-icon is-small is-invisible"
                      ><i class="mdi mdi-arrow-up"></i></span
                  ></span>
                </div>
              </th>
              <th class="" draggable="false" style="width: 12em">
                <div class="th-wrap is-centered">
                  <span class="is-relative">
                    提交时间
                    <span class="icon sort-icon is-small is-invisible"
                      ><i class="mdi mdi-arrow-up"></i></span
                  ></span>
                </div>
              </th>
              <th class="" draggable="false">
                <div class="th-wrap is-centered">
                  <span class="is-relative">
                    用户
                    <span class="icon sort-icon is-small is-invisible"
                      ><i class="mdi mdi-arrow-up"></i></span
                  ></span>
                </div>
              </th>
              <th class="" draggable="false">
                <div class="th-wrap is-centered">
                  <span class="is-relative">
                    题目
                    <span class="icon sort-icon is-small is-invisible"
                      ><i class="mdi mdi-arrow-up"></i></span
                  ></span>
                </div>
              </th>
              <th class="" draggable="false" style="width: 6em">
                <div class="th-wrap is-centered">
                  <span class="is-relative">
                    语言
                    <span class="icon sort-icon is-small is-invisible"
                      ><i class="mdi mdi-arrow-up"></i></span
                  ></span>
                </div>
              </th>
              <th class="" draggable="false" style="width: 8em">
                <div class="th-wrap is-centered">
                  <span class="is-relative">
                    评测结果
                    <span class="icon sort-icon is-small is-invisible"
                      ><i class="mdi mdi-arrow-up"></i></span
                  ></span>
                </div>
              </th>
              <th class="" draggable="false" style="width: 5em">
                <div class="th-wrap is-centered">
                  <span class="is-relative">
                    用时
                    <span class="icon sort-icon is-small is-invisible"
                      ><i class="mdi mdi-arrow-up"></i></span
                  ></span>
                </div>
              </th>
              <th class="" draggable="false" style="width: 5em">
                <div class="th-wrap is-centered">
                  <span class="is-relative">
                    内存
                    <span class="icon sort-icon is-small is-invisible"
                      ><i class="mdi mdi-arrow-up"></i></span
                  ></span>
                </div>
              </th>
              <th class="" draggable="false" style="width: 5em">
                <div class="th-wrap is-centered">
                  <span class="is-relative">
                    评测机
                    <span class="icon sort-icon is-small is-invisible"
                      ><i class="mdi mdi-arrow-up"></i></span
                  ></span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th
                class="has-text-centered"
                data-label="#"
                rowspan="2"
                style="vertical-align: middle"
              >
                <span v-if="!submissionLink">{{ submission.id }}</span>
                <router-link v-else :to="submissionLink">{{
                  submission.id
                }}</router-link>
              </th>
              <td class="has-text-centered" data-label="提交时间">
                <span>{{ parseTime(submission.createTime) }}</span>
              </td>
              <td class="has-text-centered" data-label="用户">
                <router-link :to="{ name: 'Profile' }"
                  >{{ user.nickname }}
                </router-link>
              </td>
              <td class="has-text-centered" data-label="题目">
                <router-link :to="problemLink">{{ problemName }}</router-link>
              </td>
              <td class="has-text-centered pl-0 pr-0" data-label="语言">
                <Language
                  style="font-size: 14px"
                  :lang="submission.language"
                ></Language>
              </td>
              <td class="has-text-centered pl-0 pr-0" data-label="评测结果">
                <Verdict :verdict="submission.verdict"></Verdict>
              </td>
              <td class="has-text-centered pl-0 pr-0" data-label="用时">
                <span style="font-size: 14px">{{ submission.time }} ms</span>
              </td>
              <td class="has-text-centered pl-0 pr-0" data-label="内存">
                <span style="font-size: 14px">{{ submission.memory }} MB</span>
              </td>
              <td class="has-text-centered" data-label="评测机">
                <span style="font-size: 14px">{{ submission.from }}</span>
              </td>
            </tr>
            <tr>
              <td colspan="8">
                <div class="pt-2 pb-2" style="width: 100%">
                  <div v-if="!compileError">
                    <b-tooltip
                      v-for="index in testcaseNum"
                      :key="index"
                      :label="getLabel(index)"
                      position="is-top"
                      type="is-white"
                    >
                      <span class="status-box">
                        <span
                          v-if="isAccepted(index)"
                          class="icon has-text-success has-text-centered"
                        >
                          <i class="mdi mdi-check-bold"></i>
                        </span>
                        <span
                          v-else-if="isFail(index)"
                          class="icon has-text-danger has-text-centered"
                        >
                          <i class="mdi mdi-close-thick"></i>
                        </span>
                        <span v-else class="icon">
                          <i class="mdi"></i>
                        </span>
                      </span>
                    </b-tooltip>
                  </div>
                  <pre v-else style="overflow: auto; max-width: 100%">{{
                    compileError.message
                  }}</pre>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import { computed, defineComponent } from '@vue/composition-api';
import DisplayVerdict from '@/components/Verdict.vue';
import DisplayLanguage from '@/components/Language.vue';
import { Verdict, verdictToString } from '@/verdict';

const parseTime = (timestamp: string) => {
  return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
};

export default defineComponent({
  name: 'RealtimeSubmission',
  components: {
    Verdict: DisplayVerdict,
    Language: DisplayLanguage
  },
  props: {
    testcaseNum: Number,
    submission: Object,
    problemName: String,
    problemLink: [String, Object],
    submissionLink: {
      type: [String, Object],
      required: false
    },
    user: Object
  },
  setup(props: any) {
    const compileError = computed(() => {
      return props.submission.messages.find(
        (msg: any) => msg.verdict === Verdict.CompileError
      );
    });

    const testcases = computed(() => {
      const testcases = [];
      for (const msg of props.submission.messages) {
        if (msg.verdict >= -1 && msg.verdict <= 4) {
          testcases.push(msg);
        }
      }
      return testcases;
    });

    const isAccepted = (index: number) => {
      if (index <= testcases.value.length) {
        return testcases.value[index - 1].verdict === Verdict.Accepted;
      } else {
        return false;
      }
    };

    const isFail = (index: number) => {
      if (index <= testcases.value.length) {
        const val = testcases.value[index - 1].verdict;
        return val === -1 || (1 <= val && val <= 4);
      } else {
        return false;
      }
    };

    const getLabel = (index: number) => {
      if (index <= testcases.value.length) {
        const testcase = testcases.value[index - 1];
        return `${index}/${props.testcaseNum}: ${verdictToString(
          testcase.verdict
        )}, ${testcase.time}ms, ${testcase.memory} MB`;
      } else {
        return `${index}/${props.testcaseNum}`;
      }
    };

    return {
      parseTime,
      getLabel,
      isAccepted,
      isFail,
      compileError,
      testcases
    };
  }
});
</script>

<style>
.real-time-submission .table thead {
  background-color: rgb(249, 250, 251) !important;
}

.status-box {
  display: inline-block;
  border: 1px solid #c9c9c9;
  border-radius: 4px;

  height: 1.6em;
  width: 1.6em;
  margin-right: 0.2em;
  margin-bottom: 0.2em;

  cursor: pointer;
}
</style>
