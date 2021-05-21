<template>
  <div>
    <div class="mb-2">
      <p class="is-inline-block">
        <span class="has-text-weight-bold">当前版本</span>：{{
          problem.version
        }}
      </p>
      <p class="is-inline-block ml-4">
        <span class="has-text-weight-bold">当前状态</span>：{{ problem.status }}
      </p>
    </div>
    <div>
      <b-button type="is-success" @click="runBuild">构建</b-button>
    </div>
    <div class="mt-4">
      <b-collapse
        class="card"
        animation="slide"
        v-for="(task, index) of buildTasks"
        :key="index"
        :open="isOpen == index"
        @open="isOpen = index"
      >
        <template #trigger="props">
          <div class="card-header" role="button">
            <p class="card-header-title">
              <span>构建 {{ task.version }}</span>
            </p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
            </a>
          </div>
        </template>
        <div class="card-content">
          <div class="content">
            <MessageView
              :problem="problem"
              :version="task.version"
              :messages="task.messages"
            ></MessageView>
          </div>
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/composition-api';
import {
  buildProblem,
  getAllPolygonMessage,
  getPolygonMessage
} from '@/service/polygon';
import MessageView from './MessageView.vue';

export default defineComponent({
  name: 'Build',
  components: {
    MessageView
  },
  props: {
    problem: Object
  },
  setup(props) {
    const problem = props.problem!;

    const runBuild = async () => {
      await buildProblem(problem.parent);
    };

    const buildTasks = reactive([] as any[]);

    getAllPolygonMessage(problem.parent).then((data) => {
      buildTasks.push(...data);
    });

    const isOpen = ref(0);

    return {
      runBuild,
      isOpen,
      buildTasks
    };
  }
});
</script>

<style scoped></style>
