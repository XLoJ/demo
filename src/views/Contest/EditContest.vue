<template>
  <div>
    <b-collapse animation="slide" class="card">
      <template #trigger="props">
        <div class="card-header" role="button">
          <p class="card-header-title">
            <span>比赛信息</span>
          </p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
          </a>
        </div>
      </template>
      <div class="card-content">
        <div class="content">
          <section>
            <b-field label="比赛名称">
              <b-input v-model="name"></b-input>
            </b-field>
            <b-field label="开始时间">
              <b-datetimepicker v-model="startTime">
                <template #right>
                  <b-button
                    icon-left="close"
                    label="Clear"
                    outlined
                    type="is-danger"
                    @click="startTime = null"
                  />
                </template>
              </b-datetimepicker>
            </b-field>
            <b-field label="比赛时长">
              <b-numberinput v-model="duration" :min="-1"></b-numberinput>
            </b-field>
            <b-field label="比赛描述">
              <b-input v-model="description" type="textarea"></b-input>
            </b-field>
            <div class="buttons">
              <b-button type="is-success" @click="submit">更新比赛</b-button>
              <b-button type="is-danger" @click="updatePublic">
                <span v-if="!contest.public">公开比赛</span>
                <span v-else>隐藏比赛</span>
              </b-button>
            </div>
          </section>
        </div>
      </div>
    </b-collapse>

    <b-collapse animation="slide" class="card">
      <template #trigger="props">
        <div class="card-header" role="button">
          <p class="card-header-title">
            <span>题目信息</span>
          </p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
          </a>
        </div>
      </template>
      <div class="card-content">
        <div class="content">
          <b-table :data="problems">
            <b-table-column v-slot="props" centered label="#" width="48">
              <span class="has-text-weight-bold">{{
                numberToIndex(props.row.index)
              }}</span>
            </b-table-column>
            <b-table-column v-slot="props" label="名称">
              <router-link :to="{ name: 'ContestList' }"
                >{{ props.row.problem.id }}. {{ props.row.problem.title }}
              </router-link>
            </b-table-column>
            <b-table-column v-slot="props" centered label="操作" width="120">
              <b-button
                icon-left="delete"
                size="is-small"
                type="is-danger"
                @click="removeProblem(props.index)"
              ></b-button>
            </b-table-column>
          </b-table>

          <b-field label="题目编号" class="mt-4">
            <b-input v-model="problemId"></b-input>
          </b-field>
          <b-button type="is-success" expanded @click="pushProblem"
            >添加</b-button
          >
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from '@vue/composition-api';
import {
  pushContestProblem,
  removeContestProblem,
  updateContestInfo,
  updateContestPublic
} from '@/service/contest';
import { useSnackbar } from '@/utils';
import { toRefs } from '@vueuse/core';
import { numberToIndex } from '@/views/Contest/utils';

export default defineComponent({
  name: 'EditContest',
  props: {
    id: [Number, String],
    contest: Object
  },
  setup(props: any) {
    const { contest } = toRefs(props);

    const name = ref(contest.value.name);
    const startTime = computed<Date>({
      get() {
        return new Date(contest.value.startTime);
      },
      set(val: Date) {
        contest.value.startTime = val.toISOString();
      }
    });
    const duration = ref(contest.value.duration);
    const description = ref(contest.value.description);

    watch(contest, (contest) => {
      name.value = contest.name;
      startTime.value = new Date(contest.startTime);
      duration.value = contest.duration;
    });

    const snackbar = useSnackbar();
    const submit = async () => {
      if (contest.value) {
        try {
          const data = await updateContestInfo(contest.value.id, {
            name: name.value,
            description: description.value,
            startTime: startTime.value,
            duration: duration.value
          });
          contest.value.name = data.name;
          contest.value.description = data.description;
          contest.value.timestamp = data.timestamp;
          contest.value.duration = data.duration;
          snackbar.open(`比赛 ${contest.value.id}. 更新成功`);
        } catch (err) {
          snackbar.open({
            message: err.message,
            type: 'is-danger'
          });
        }
      }
    };

    const updatePublic = async () => {
      if (contest.value) {
        try {
          const flag = !contest.value.public;
          await updateContestPublic(contest.value.id, flag);
          contest.value.public = flag;
          if (flag) {
            snackbar.open(`比赛 ${contest.value.id}. 成功公开`);
          } else {
            snackbar.open(`比赛 ${contest.value.id}. 成功隐藏`);
          }
        } catch (err) {
          snackbar.open({
            message: err.message,
            type: 'is-danger'
          });
        }
      }
    };

    const problems = computed(() => {
      return contest.value.problems;
    });
    const problemId = ref('');
    const pushProblem = async () => {
      if (problemId.value && /^\d+$/.test(problemId.value.trim())) {
        const id = +problemId.value.trim();
        try {
          const data = await pushContestProblem(contest.value.id, id);
          snackbar.open(
            `题目 ${data.problem.id}. ${data.problem.title} 添加成功`
          );
          contest.value.problems.push(data);
          contest.value.problems.sort(
            (lhs: any, rhs: any) => lhs.index - rhs.index
          );
        } catch (err) {
          snackbar.open({
            message: err.message,
            type: 'is-danger'
          });
        }
      }
      problemId.value = '';
    };
    const removeProblem = async (index: number) => {
      const id = problems.value[index].id;
      try {
        await removeContestProblem(contest.value.id, id);
        snackbar.open(`题目 ${problems.value[index].problem.id}. 删除成功`);
        problems.value.splice(index, 1);
      } catch (err) {
        snackbar.open({
          message: err.message,
          type: 'is-danger'
        });
      }
    };

    return {
      name,
      startTime,
      duration,
      description,
      submit,
      updatePublic,
      problems,
      numberToIndex,
      problemId,
      pushProblem,
      removeProblem
    };
  }
});
</script>

<style scoped></style>
