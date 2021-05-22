<template>
  <div>
    <el-steps :active="activeStep" direction="vertical">
      <el-step title="开始构建">
        <div class="mb-4">
          <div v-if="messages.length > 0" class="box">
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
          <div class="box" v-for="msg in compileMessages" :key="msg.index">
            <div class="columns">
              <div class="column">
                <span class="has-text-weight-bold">编译</span> {{ msg.name }}
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
          </div>
        </div>
      </el-step>
      <el-step title="生成测试数据">
        <div class="mb-4"></div>
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

export default defineComponent({
  name: 'MessageView',
  components: {
    ElSteps,
    ElStep
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
        if (data.length > props.messages.length) {
          for (let i = props.messages.length; i < data.length; i++) {
            props.messages.push(data[i]);
          }
          return true;
        } else {
          return false;
        }
      };

      let ev = setInterval(async () => {
        const flag = await updatePolygonMessage();
        if (!flag) {
          clearInterval(ev);
        }
      }, 500);
    };

    watchEffect(() => {
      if (version === props.signal) {
        runUpdate();
      }
    });

    const parseTime = (timestamp: string) => {
      return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
    };

    const activeStep = computed(() => {
      for (let i = props.messages.length - 1; i >= 0; i--) {
        if (props.messages[i].action === 'end') return 4;
        else if (props.messages[i].action === 'compile') return 2;
        else if (props.messages[i].action === 'start') return 1;
      }
      return 0;
    });

    const compileMessages = computed(() => {
      return props.messages!.filter((msg: any) => msg.action === 'compile');
    });

    const endMessages = computed(() => {
      return props.messages!.filter((msg: any) => msg.action === 'end');
    });

    return {
      parseTime,
      activeStep,
      compileMessages,
      endMessages
    };
  }
});
</script>

<style scoped></style>
