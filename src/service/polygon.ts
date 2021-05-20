import { api } from './api';

export async function getDetailClassicProblem(pid: number) {
  const { data } = await api.get(`/polygon/problem/${pid}/classic`);
  data.tags = data.tags
    ? data.tags.split(',').map((tag: string) => tag.trim())
    : [];
  const { data: data_ } = await api.get(`/polygon/problem/${pid}`);
  data.legend = data_.legend;
  data.inputFormat = data_.inputFormat;
  data.outputFormat = data_.outputFormat;
  data.notes = data_.notes;
  return data;
}

interface IUpdateProblemInfoOption {
  timeLimit?: number;
  memoryLimit?: number;
  tags?: string[];
  title?: string;
  legend?: string;
  inputFormat?: string;
  outputFormat?: string;
  note?: string;
}

export async function updateProblemInfo(
  pid: number,
  option: IUpdateProblemInfoOption = {}
) {
  const { data } = await api.put(`/polygon/problem/${pid}`, {
    timeLimit: option.timeLimit ?? null,
    memoryLimit: option.memoryLimit ?? null,
    tags: option.tags?.join(',') ?? '',
    title: option.title ?? '',
    legend: option.legend ?? '',
    inputFormat: option.inputFormat ?? '',
    outputFormat: option.outputFormat ?? '',
    notes: option.note ?? ''
  });
  return data;
}
