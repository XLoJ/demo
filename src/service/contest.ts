import { reactive } from '@vue/composition-api';

const comingContestList = [
  {
    id: 5,
    name: 'Beta Round 1',
    start_time: '2021-6-3 19:30',
    length: '2:00',
    writers: ['Noname']
  },
  {
    id: 4,
    name: 'Alpha Round 2',
    start_time: '2021-6-1 19:30',
    length: '2:00',
    writers: ['Noname']
  }
];

const endContestList = [
  {
    id: 3,
    name: 'Alpha Round 1',
    start_time: '2021-5-1 19:30',
    length: '2:00',
    writers: ['Noname']
  },
  {
    id: 2,
    name: 'Alpha Test Round 2',
    start_time: '2021-4-1 19:30',
    length: '2:00',
    writers: ['Noname']
  },
  {
    id: 1,
    name: 'Alpha Test Round 1',
    start_time: '2021-3-1 19:30',
    length: '2:00',
    writers: ['Noname']
  }
];

export function useContestList(): {
  comingContestList: any;
  endContestList: any;
} {
  return {
    comingContestList: reactive(comingContestList),
    endContestList: reactive(endContestList)
  };
}

// do not handle id not found
export function useContestInfo(id: number): any {
  const fid = comingContestList.findIndex((item) => item.id === id);
  if (fid !== -1) {
    return {
      contest: reactive(comingContestList[fid])
    };
  } else {
    const fid = endContestList.findIndex((item) => item.id === id);
    return {
      contest: reactive(endContestList[fid])
    };
  }
}

export function useContestProblems(cid: number): any {
  const problems = reactive([
    {
      index: 'A',
      name: 'A + B'
    },
    {
      index: 'B',
      name: 'A - B'
    },
    {
      index: 'C',
      name: 'A * B'
    },
    {
      index: 'D',
      name: 'A / B'
    }
  ]);
  return { problems };
}
