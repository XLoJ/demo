<template>
  <div>
    <div class="mb-2 is-flex is-align-items-center">
      <b-button type="is-success" @click="runBuild" class="mr-4">构建</b-button>
      <p class="is-inline-block">
        <span class="has-text-weight-bold">当前版本</span>：{{
          problem.version
        }}
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
              <span>
                <span v-if="task.status === 'end'">
                  <span class="icon mr-2">
                    <i class="mdi mdi-check has-text-success"></i>
                  </span>
                </span>
                <span v-else-if="task.status === 'error'">
                  <span class="icon mr-2">
                    <i class="mdi mdi-close has-text-danger"></i>
                  </span>
                </span>
                <span v-else>
                  <span class="icon mr-2">
                    <i class="mdi mdi-cloud"></i>
                  </span>
                </span>
              </span>
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
import { useSnackbar } from '@/utils';

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
      buildTasks.sort((lhs: any, rhs: any) => rhs.version - lhs.version);
    });

    const snackbar = useSnackbar();

    const isOpen = ref(0);

    const runBuild = async () => {
      try {
        const { version: newVersion } = await buildProblem(problem.parent);

        buildTasks.unshift(
          reactive({ version: newVersion, messages: [], status: 'build' })
        );
        runUpdateSignal.value = newVersion;
        isOpen.value = 0;

        setTimeout(() => (runUpdateSignal.value = -1), 5000);

        snackbar.open(`版本 ${newVersion} 开始构建`);
      } catch (err) {
        snackbar.open({
          message: err.message,
          type: 'is-danger'
        });
      }
    };

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
