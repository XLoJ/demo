<template>
  <div>
    <el-steps :active="activeStep" direction="vertical">
      <el-step title="开始构建">
        <div class="mb-4">
          <div v-if="messages.length > 0" class="box">
            <b-progress
              v-if="1 === lastIndex"
              class="mb-4"
              type="is-success"
            ></b-progress>

            <div class="columns">
              <div class="has-text-weight-bold column">开始构建</div>
              <div class="column has-text-right is-family-monospace">
                <span
                  ><span class="has-text-weight-bold">评测机</span>
                  {{ messages[0].from }}</span
                >
                <span class="ml-4"
                  ><span class="has-text-weight-bold">时间</span>
                  {{ parseTime(messages[0].timestamp) }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </el-step>

      <el-step title="编译代码">
        <div class="mb-4">
          <div v-for="msg in compileMessages" :key="msg.index" class="box">
            <b-progress
              v-if="msg.index === lastIndex"
              class="mb-4"
              type="is-success"
            ></b-progress>

            <div class="columns">
              <div class="column is-family-monospace">
                <span class="has-text-weight-bold">编译 </span>
                <span>{{ msg.code.type }}</span>
                <span> - </span>
                <a>{{ msg.code.name }}.{{ msg.code.language }}</a>
                <span>
                  : <span class="has-text-weight-bold">版本</span>
                  {{ msg.code.version }}</span
                >
              </div>
              <div class="column has-text-right is-family-monospace">
                <span
                  ><span class="has-text-weight-bold">评测机</span>
                  {{ messages[0].from }}</span
                >
                <span class="ml-4"
                  ><span class="has-text-weight-bold">时间</span>
                  {{ parseTime(messages[0].timestamp) }}</span
                >
              </div>
            </div>

            <!-- Error Message  -->
            <div v-if="msg.index === errorMessage.belong">
              <hr class="mt-0 mb-4" />
              <div class="columns">
                <div class="column">
                  <span class="has-text-weight-bold has-text-danger"
                    >编译失败</span
                  >
                </div>
                <div class="column has-text-right is-family-monospace">
                  <span
                    ><span class="has-text-weight-bold">评测机</span>
                    {{ errorMessage.from }}</span
                  >
                  <span class="ml-4"
                    ><span class="has-text-weight-bold">时间</span>
                    {{ parseTime(errorMessage.timestamp) }}</span
                  >
                </div>
              </div>
              <pre class="has-background-light">{{ errorMessage.message }}</pre>
            </div>
          </div>
        </div>
      </el-step>

      <el-step title="生成测试数据">
        <div class="mb-4">
          <div
            v-for="(testcase, index) in testcaseMessages"
            :key="index"
            class="box"
          >
            <b-progress
              v-if="testcase.isLoading"
              class="mb-4"
              type="is-success"
            ></b-progress>

            <div class="mb-4">
              <span class="has-text-weight-bold"
                >数据 {{ testcase.index }}</span
              >
            </div>

            <div
              v-for="(msg, index) in testcase.messages"
              :key="msg.index"
              :class="[
                index + 1 < testcase.messages.length ? 'mb-4' : undefined
              ]"
            >
              <MessageViewHeader :from="msg.from" :timestamp="msg.timestamp">
                <div>
                  <span class="has-text-weight-bold mr-2">{{
                    parseMessageAction(msg.action)
                  }}</span>
                  <div class="is-inline-block">
                    <div v-if="msg.action === 'download'">
                      <b-tag>{{ msg.testcase.filename }}</b-tag>
                    </div>
                    <span v-else-if="msg.action === 'gen_in'">
                      <b-tag
                        ><a
                          >{{ msg.code.name }}.{{ msg.code.language }}</a
                        ></b-tag
                      >
                      <b-tag
                        class="ml-1"
                        v-for="(arg, index) in msg.testcase.args"
                        :key="index"
                        >{{ arg }}</b-tag
                      >
                    </span>
                  </div>
                </div>
              </MessageViewHeader>
            </div>

            <div v-if="testcase.error">
              <hr class="mt-0 mb-4" />
              <MessageViewHeader
                :from="testcase.error.from"
                :timestamp="testcase.error.timestamp"
              >
                <div class="has-text-weight-bold has-text-danger">生成失败</div>
              </MessageViewHeader>
            </div>
          </div>
        </div>
      </el-step>

      <el-step title="构建完成">
        <div v-if="endMessages.length > 0" class="box mb-4">
          <div class="columns">
            <div class="has-text-weight-bold column">构建完成</div>
            <div class="column has-text-right is-family-monospace">
              <span
                ><span class="has-text-weight-bold">评测机</span>
                {{ endMessages[0].from }}</span
              >
              <span class="ml-4"
                ><span class="has-text-weight-bold">时间</span>
                {{ parseTime(endMessages[0].timestamp) }}</span
              >
            </div>
          </div>
        </div>
      </el-step>
    </el-steps>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watchEffect } from '@vue/composition-api';
import ElSteps from '@/components/steps/steps.vue';
import ElStep from '@/components/steps/step.vue';
import dayjs from 'dayjs';
import { getPolygonMessage } from '@/service/polygon';
import MessageViewHeader from './MessageViewHeader.vue';

const parseTime = (timestamp: string) => {
  return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
};

const upperFirstLetter = (text: string) => {
  return text.substring(0, 1).toUpperCase() + text.substring(1);
};

const parseMessageAction = (action: string) => {
  const pattern: Record<string, string> = {
    gen_in: '生成输入文件',
    download: '下载静态文件',
    validate: '校验输入文件',
    gen_ans: '生成答案文件',
    upload: '上传数据'
  };
  return pattern[action] ?? action;
};

export default defineComponent({
  name: 'MessageView',
  components: {
    ElSteps,
    ElStep,
    MessageViewHeader
  },
  props: {
    messages: Array,
    problem: Object,
    version: Number,
    signal: Number
  },
  setup(props: any) {
    const messages = props.messages!;
    const problem = props.problem!;
    const version = props.version!;

    const runUpdate = () => {
      const updatePolygonMessage = async () => {
        const data = await getPolygonMessage(problem.parent, version);
        if (data.length > 0) {
          for (let i = props.messages.length; i < data.length; i++) {
            props.messages.push(data[i]);
          }
          const lastAction = data[data.length - 1].action;
          if (lastAction === 'end' || lastAction === 'error') {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      };

      let ev = setInterval(async () => {
        const flag = await updatePolygonMessage();
        if (!flag) {
          clearInterval(ev);
        }
      }, 500);
    };

    runUpdate();

    watchEffect(() => {
      if (version === props.signal) {
        runUpdate();
      }
    });

    const activeStep = computed(() => {
      for (let i = props.messages.length - 1; i >= 0; i--) {
        let action = props.messages[i].action;
        if (action === 'end') return 4;
        else if (
          ['download', 'gen_in', 'validate', 'gen_ans', 'upload'].includes(
            action
          )
        )
          return 2;
        else if (action === 'compile') return 1;
        else if (action === 'start') return 0;
      }
      return -1;
    });

    const lastIndex = computed(() => {
      if (props.messages.length === 0) return 0;
      else return props.messages[props.messages.length - 1].index;
    });

    const endMessages = computed(() => {
      return props.messages!.filter((msg: any) => msg.action === 'end');
    });

    const errorMessage = computed(() => {
      const error_messages = props.messages.filter(
        (msg: any) => msg.action === 'error' || msg.action === 'compile_error'
      );
      if (error_messages.length === 0) {
        return { belong: -1 };
      } else {
        const message = error_messages[error_messages.length - 1];
        message.belong = message.index - 1;
        return message;
      }
    });

    const compileMessages = computed(() => {
      return props
        .messages!.filter((msg: any) => msg.action === 'compile')
        .map((msg: any) => {
          msg.code.type = upperFirstLetter(msg.code.type);
          return msg;
        });
    });

    const testcaseMessages = computed(() => {
      const allTestcaseMessages = props.messages!.filter((msg: any) =>
        ['download', 'gen_in', 'validate', 'gen_ans', 'upload'].includes(
          msg.action
        )
      );
      const testcases = new Map<string, any>();
      for (const message of allTestcaseMessages) {
        const testcaseIndex = message.testcase.index;
        if (!testcases.has(testcaseIndex)) testcases.set(testcaseIndex, []);
        testcases.get(testcaseIndex)!.push(message);
      }
      const groupMessages = [];
      for (const [key, messages] of testcases) {
        const error =
          messages.findIndex(
            (msg: any) => msg.index === errorMessage.value.belong
          ) !== -1
            ? props.messages[props.messages.length - 1]
            : null;

        groupMessages.push({
          index: key,
          config: messages[0].testcase,
          isLoading:
            messages.findIndex(
              (msg: any) => msg.index === props.messages.length
            ) !== -1,
          messages,
          error
        });
      }
      return groupMessages.sort((lhs: any, rhs: any) => lhs.index - rhs.index);
    });

    return {
      parseTime,
      parseMessageAction,
      activeStep,
      lastIndex,
      compileMessages,
      testcaseMessages,
      endMessages,
      errorMessage
    };
  }
});
</script>

<style scoped></style>
