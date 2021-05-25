import { reactive, ref } from '@vue/composition-api';
import { api } from '@/service/api';
import dayjs from 'dayjs';
import router from '@/router';

export function useContestList(): {
  comingContestList: any;
  endContestList: any;
} {
  const comingContestList = ref([] as any[]);
  const endContestList = ref([] as any[]);

  api.get('/contest').then(({ data }) => {
    for (const contest of data) {
      const endTime = dayjs(contest.startTime).add(contest.duration, 'minute');
      if (dayjs().isAfter(endTime)) {
        endContestList.value.push(contest);
      } else {
        comingContestList.value.push(contest);
      }
    }
  });

  return {
    comingContestList,
    endContestList
  };
}

export function useContestInfo(id: number): any {
  const contest = ref();
  api
    .get(`/contest/${id}`)
    .then(({ data }) => {
      contest.value = data;
    })
    .catch((err) => {
      router.push({ name: 'Home' });
    });
  return contest;
}

export function useContestProblems(cid: number): any {
  const problems = reactive([
    {
      index: 'A',
      name: 'A + B',
      accept_num: 100
    },
    {
      index: 'B',
      name: 'A - B',
      accept_num: 50
    },
    {
      index: 'C',
      name: 'A * B',
      accept_num: 10
    },
    {
      index: 'D',
      name: 'A / B',
      accept_num: 1
    }
  ]);
  return { problems };
}
