import { api, downloadFile } from './api';
import { b64encode } from '@/utils';

export async function createNewProblem(name: string, type: 'classic') {
  const { data } = await api.post('/polygon/problem', { name, type });
  return data;
}

export async function getProblemInfo(pid: number) {
  const { data } = await api.get(`/polygon/problem/${pid}`);
  return data;
}

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
  data.testcaseNum = data_.testcaseNum;
  try {
    data.examples = JSON.parse(data_.examples);
  } catch (err) {
    data.examples = [];
  }
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
    tags: option.tags?.join(',') ?? null,
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

export async function getAllStaticFilename(pid: number) {
  const { data } = await api.get(`/polygon/problem/${pid}/static`);
  return data;
}

export async function uploadStaticFile(
  pid: number,
  filename: string,
  body: string
) {
  body = body.replaceAll('\r\n', '\n').replaceAll('\r', '\n');
  if (body.length === 0 || body[body.length - 1] !== '\n') {
    body += '\n';
  }
  const { data } = await api.post(`/polygon/problem/${pid}/static`, {
    filename,
    body
  });
  return data;
}

export async function downloadStaticFile(pid: number, filename: string) {
  return downloadFile(filename, `/polygon/problem/${pid}/static/download`, {
    filename
  });
}

export async function removeStaticFile(pid: number, filename: string) {
  return api.delete(`/polygon/problem/${pid}/static`, {
    params: { filename }
  });
}

export async function buildProblem(pid: number) {
  const { data } = await api.post(`/polygon/problem/${pid}/build`, {});
  return data;
}

export async function getAllPolygonMessage(pid: number) {
  const { data } = await api.get(`/polygon/problem/${pid}/build`);
  const result = [];
  for (const key in data) {
    const messages = data[key];
    const hasEnd = !!messages.find((msg: any) => msg.action === 'end');
    const hasError = !!messages.find(
      (msg: any) => msg.action === 'error' || msg.action === 'compile_error'
    );
    const status = hasEnd ? 'end' : hasError ? 'error' : 'building';
    result.push({
      version: +key,
      status,
      messages
    });
  }
  return result;
}

export async function getPolygonMessage(pid: number, version: number) {
  const { data } = await api.get(`/polygon/problem/${pid}/build/${version}`);
  return data;
}

export async function downloadTestcaseInFile(
  pid: number,
  version: number,
  tid: number
) {
  const filename = `${tid}.in`;
  return downloadFile(
    filename,
    `/polygon/problem/${pid}/testcase/${version}/${filename}`
  );
}

export async function downloadTestcaseAnsFile(
  pid: number,
  version: number,
  tid: number
) {
  const filename = `${tid}.ans`;
  return downloadFile(
    filename,
    `/polygon/problem/${pid}/testcase/${version}/${filename}`
  );
}

export async function getCodeHistory(pid: number, fullname: string) {
  const { data } = await api.get(`/polygon/problem/${pid}/code`, {
    params: {
      fullname
    }
  });
  return data;
}

export async function submitTestJudge(
  pid: number,
  body: string,
  language: string
) {
  const { data } = await api.post(`/polygon/judge/${pid}`, {
    body: b64encode(body),
    language
  });
  return data;
}

export async function getTestJudgeSubmissions(pid: number) {
  const { data } = await api.get(`/polygon/judge/${pid}/submissions`);
  return data;
}

export async function getDetailTestJudgeSubmission(pid: number, sid: number) {
  const { data } = await api.get(`/polygon/judge/${pid}/submission/${sid}`);
  return data;
}
