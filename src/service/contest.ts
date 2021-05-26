import { ref } from '@vue/composition-api';
import { api } from '@/service/api';
import dayjs from 'dayjs';
import router from '@/router';
import { useLocalStorage } from '@vueuse/core';
import { ToastProgrammatic as Toast } from 'buefy';
import { b64encode } from '@/utils';

export async function createContest(name: string) {
  const { data } = await api.post('/contest/create', { name });
  return data;
}

export function useContestList(): {
  privateContestList: any;
  comingContestList: any;
  endContestList: any;
} {
  const comingContestList = useLocalStorage(`contests/coming`, [] as any);
  const endContestList = useLocalStorage(`contests/end`, [] as any);
  const privateContestList = useLocalStorage(`contests/private`, [] as any);

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
      for (const prob of data.problems) {
        prob.problem.examples = JSON.parse(prob.problem.examples);
      }
      contest.value = data;
    })
    .catch((err) => {
      Toast.open({
        message: err.message ?? '无法访问比赛 ${id}.',
        type: 'is-danger'
      });
      router.push({ name: 'ContestList' });
    });
  return contest;
}

export async function submitCode(
  contestId: number,
  cpId: number,
  body: string,
  language: string
) {
  const { data } = await api.post(
    `/contest/${contestId}/submit`,
    {
      body: b64encode(body),
      language
    },
    {
      params: {
        problem: cpId
      }
    }
  );
  return data;
}

export async function getSubmission(contestId: number, submissionId: number) {
  const { data } = await api.get(
    `/contest/${contestId}/submission/${submissionId}`
  );
  return data;
}

export function useMySubmissions(contestId: number) {
  const result = ref([] as any);
  api.get(`/contest/${contestId}/submissions/my`).then(({ data }) => {
    result.value.push(...data);
  });
  return result;
}

// Contest manager

export async function updateContestInfo(contestId: number, payload: any) {
  const { data } = await api.post(`/contest/admin/${contestId}`, payload);
  return data;
}

export async function updateContestPublic(contestId: number, flag: boolean) {
  const { data } = await api.post(
    `/contest/admin/${contestId}/public`,
    {},
    {
      params: {
        public: flag
      }
    }
  );
  return data;
}

export async function pushContestProblem(contestId: number, problemId: number) {
  const { data } = await api.post(
    `/contest/admin/${contestId}/problem`,
    {},
    {
      params: {
        problem: problemId
      }
    }
  );
  return data;
}

export async function setContestProblemVisible(
  contestId: number,
  cpId: number,
  visible: boolean
) {
  const { data } = await api.put(
    `/contest/admin/${contestId}/problem/visible`,
    {},
    {
      params: {
        contestProblem: cpId,
        visible
      }
    }
  );
  return data;
}

export async function removeContestProblem(contestId: number, cpId: number) {
  const { data } = await api.delete(`/contest/admin/${contestId}/problem`, {
    params: {
      contestProblem: cpId
    }
  });
  return data;
}
