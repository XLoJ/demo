import { api } from '@/service/api';

export type TestcaseItem =
  | {
      type: 'file';
      filename: string;
      example?: boolean;
    }
  | {
      type: 'generator';
      generator: number;
      args: string[];
      example?: boolean;
    };

export type StaticFileItem = {
  filename: string;
  body: string;
};

export type GeneratorItem = {
  id: number;
  version: number;
  name: string;
  type: string;
  body: string;
  language: string;
};

export class TestcaseSet {
  readonly pid: number;
  readonly problem: any;
  readonly testcases: TestcaseItem[];
  readonly staticFiles: StaticFileItem[];
  readonly generators: GeneratorItem[];

  constructor(
    problem: any,
    testcases: TestcaseItem[],
    staticFiles: StaticFileItem[],
    generators: GeneratorItem[]
  ) {
    this.pid = problem.parent;
    this.problem = problem;
    this.testcases = testcases;
    this.staticFiles = staticFiles;
    this.generators = generators;
  }

  private updateProblem() {
    this.problem.testcases = JSON.stringify(this.testcases);
  }

  async addFromStaticFile(filename: string) {
    if (this.staticFiles.findIndex((f) => f.filename === filename) === -1) {
      throw new Error(`静态文件 ${filename} 不存在`);
    }
    if (
      this.testcases.findIndex(
        (item) => item.type === 'file' && item.filename === filename
      ) === -1
    ) {
      this.testcases.push({
        type: 'file',
        filename,
        example: false
      });
      try {
        await api.post(`/polygon/problem/${this.pid}/testcases`, {
          testcases: JSON.stringify(this.testcases)
        });
        this.updateProblem();
      } catch (err) {
        this.testcases.pop();
        throw err;
      }
    } else {
      throw new Error(`${filename} 已经添加到测试数据中`);
    }
  }

  async addFromGenerator(gid: number, args: string[]) {
    if (this.generators.findIndex((g) => g.id === gid) === -1) {
      throw new Error(`Generator ${gid} 不存在`);
    }
    if (
      this.testcases.findIndex(
        (item) =>
          item.type === 'generator' &&
          item.generator === gid &&
          item.args.join(' ') === args.join(' ')
      ) === -1
    ) {
      this.testcases.push({
        type: 'generator',
        generator: gid,
        args,
        example: false
      });
      try {
        await api.post(`/polygon/problem/${this.pid}/testcases`, {
          testcases: JSON.stringify(this.testcases)
        });
        this.updateProblem();
      } catch (err) {
        this.testcases.pop();
        throw err;
      }
    } else {
      throw new Error(`生成重复数据`);
    }
  }

  async removeTestcase(index: number) {
    const oldItem = this.testcases.splice(index, 1);
    try {
      await api.post(`/polygon/problem/${this.pid}/testcases`, {
        testcases: JSON.stringify(this.testcases)
      });
      this.updateProblem();
    } catch (err) {
      this.testcases.splice(index, 0, ...oldItem);
      throw err;
    }
  }

  async setExample(index: number) {
    if (index < 0 || index >= this.testcases.length) {
      throw new Error(`测试数据 ${index} 已失效`);
    }
    const old = this.testcases[index].example;
    this.testcases[index].example = !old;
    try {
      await api.post(`/polygon/problem/${this.pid}/testcases`, {
        testcases: JSON.stringify(this.testcases)
      });
      this.updateProblem();
    } catch (err) {
      this.testcases[index].example = old;
      throw err;
    }
    return !old;
  }
}
