import { reactive, ref } from '@vue/composition-api';
import { api } from '@/service/api';
import dayjs from 'dayjs';
import router from '@/router';
import { useLocalStorage } from '@vueuse/core';
import { ToastProgrammatic as Toast } from 'buefy';
import { useUser } from '@/service/user';

export async function createContest(name: string) {
  const { data } = await api.post('/contest/create', { name });
  return data;
}

export function useContestList(): {
  privateContestList: any;
  comingContestList: any;
  endContestList: any;
} {
  const { user } = useUser();
  const uid = user ? user.id : -1;
  const comingContestList = useLocalStorage(
    `contests/coming/${uid}`,
    [] as any
  );
  const endContestList = useLocalStorage(`contests/end/${uid}`, [] as any);
  const privateContestList = useLocalStorage(
    `contests/private/${uid}`,
    [] as any
  );

  api.get('/contest').then(({ data }) => {
    comingContestList.value.splice(0);
    endContestList.value.splice(0);
    privateContestList.value.splice(0);
    for (const contest of data) {
      const endTime = dayjs(contest.startTime).add(contest.duration, 'minute');
      if (!contest.public) {
        privateContestList.value.push(contest);
      } else if (dayjs().isAfter(endTime)) {
        endContestList.value.push(contest);
      } else {
        comingContestList.value.push(contest);
      }
    }
  });

  return {
    privateContestList,
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
      Toast.open({
        message: err.message ?? '无法访问比赛 ${id}.',
        type: 'is-danger'
      });
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

export async function updateContestInfo(contestId: number, payload: any) {
  const { data } = await api.post(`/contest/admin/${contestId}`, payload);
  return data;
}
