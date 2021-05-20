import { api } from './api';
import { b64encode } from '@/utils';

export async function getDetailClassicProblem(pid: number) {
  const { data } = await api.get(`/polygon/problem/${pid}/classic`);
  data.tags = data.tags
    ? data.tags.split(',').map((tag: string) => tag.trim())
    : [];
  const { data: data_ } = await api.get(`/polygon/problem/${pid}`);
  data.title = data_.title;
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
  notes?: string;
}

export async function updateProblemInfo(
  pid: number,
  option: IUpdateProblemInfoOption = {}
) {
  const { data } = await api.put(`/polygon/problem/${pid}`, {
    timeLimit: option.timeLimit ?? null,
    memoryLimit: option.memoryLimit ?? null,
    tags: option.tags?.join(',') ?? '',
    title: option.title ?? null,
    legend: option.legend ?? null,
    inputFormat: option.inputFormat ?? null,
    outputFormat: option.outputFormat ?? null,
    notes: option.notes ?? null
  });
  return data;
}

export async function uploadProblemCode(
  pid: number,
  type: string,
  code: string,
  lang: string
) {
  const { data } = await api.post(`/polygon/problem/${pid}/${type}`, {
    body: b64encode(code),
    language: lang,
    name: type,
    description: ''
  });
  return data;
}

export async function createGenerator(pid: number, name: string) {
  const { data } = await api.post(`/polygon/problem/${pid}/generator`, {
    body: 'I2luY2x1ZGUgInRlc3RsaWIuaCIKCmludCBtYWluKGludCBhcmdjLCBjaGFyKiBhcmd2W10pIHsKICByZWdpc3RlckdlbihhcmdjLCBhcmd2LCAxKTsKICAKICByZXR1cm4gMDsKfQ==',
    language: 'cpp',
    name,
    description: ''
  });
  return data;
}

export async function updateGenerator(
  pid: number,
  cid: number,
  name: string,
  code: string,
  lang: string
) {
  const { data } = await api.put(`/polygon/problem/${pid}/generator/${cid}`, {
    body: b64encode(code),
    language: lang,
    name,
    description: ''
  });
  return data;
}

export async function removeGenerator(pid: number, cid: number) {
  await api.delete(`/polygon/problem/${pid}/generator/${cid}`);
}
