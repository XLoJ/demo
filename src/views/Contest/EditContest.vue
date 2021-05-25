<template>
  <div>
    <section>
      <b-field label="比赛名称">
        <b-input v-model="name"></b-input>
      </b-field>
      <b-field label="开始时间">
        <b-datetimepicker v-model="startTime">
          <template #right>
            <b-button
              label="Clear"
              type="is-danger"
              icon-left="close"
              outlined
              @click="startTime = null"
            />
          </template>
        </b-datetimepicker>
      </b-field>
      <b-field label="比赛时长">
        <b-numberinput v-model="duration" :min="-1"></b-numberinput>
      </b-field>
      <div class="buttons">
        <b-button type="is-success" @click="submit">更新比赛</b-button>
        <b-button type="is-danger" @click="submit">公开比赛</b-button>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  toRef,
  watch
} from '@vue/composition-api';
import { updateContestInfo, useContestInfo } from '@/service/contest';
import { useSnackbar } from '@/utils';
import { toRefs } from '@vueuse/core';

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
            description: '',
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

    return {
      name,
      startTime,
      duration,
      submit
    };
  }
});
</script>

<style scoped></style>
