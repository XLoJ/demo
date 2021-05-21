<template>
  <div>
    <div class="mb-2 is-flex is-align-items-center">
      <b-button type="is-success" @click="runBuild" class="mr-4">构建</b-button>
      <p class="is-inline-block">
        <span class="has-text-weight-bold">当前版本</span>：{{
          problem.version
        }}
      </p>
      <p class="is-inline-block ml-4">
        <span class="has-text-weight-bold">当前状态</span>：{{ problem.status }}
      </p>
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
              :signal="runUpdateSignal"
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
import { buildProblem, getAllPolygonMessage } from '@/service/polygon';
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

    const runUpdateSignal = ref(-1);

    const buildTasks = reactive([] as any[]);

    getAllPolygonMessage(problem.parent).then((data) => {
      buildTasks.push(...data);
    });

    const runBuild = async () => {
      const { version: newVersion } = await buildProblem(problem.parent);
      runUpdateSignal.value = newVersion;
      setTimeout(() => (runUpdateSignal.value = -1), 1000);
    };

    const isOpen = ref(0);

    return {
      runBuild,
      isOpen,
      buildTasks,
      runUpdateSignal
    };
  }
});
</script>

<style scoped></style>
