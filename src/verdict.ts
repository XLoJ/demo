export enum Verdict {
  Running = -5,
  Compiling = -4,
  Waiting,
  Finished,
  WrongAnswer,
  Accepted = 0,
  TimeLimitExceeded,
  IdlenessLimitExceeded,
  MemoryLimitExceeded,
  RuntimeError,
  SystemError,
  CompileError,
  Point,
  JudgeError,
  TestCaseError
}

export function isFinishVerdict(verdict: number) {
  return verdict >= -2;
}

export function verdictToString(verdict: number) {
  if (verdict === Verdict.Running) {
    return 'Running';
  } else if (verdict === Verdict.Compiling) {
    return 'Compiling';
  } else if (verdict === Verdict.Waiting) {
    return 'Waiting';
  } else if (verdict === Verdict.Accepted) {
    return 'Accepted';
  } else if (verdict === Verdict.WrongAnswer) {
    return 'Wrong Answer';
  } else if (verdict === Verdict.TimeLimitExceeded) {
    return 'Time Limit Exceeded';
  } else if (verdict === Verdict.IdlenessLimitExceeded) {
    return 'Idleness Limit Exceeded';
  } else if (verdict === Verdict.MemoryLimitExceeded) {
    return 'Memory Limit Exceeded';
  } else if (verdict === Verdict.RuntimeError) {
    return 'Runtime Error';
  } else if (verdict === Verdict.SystemError) {
    return 'System Error';
  } else if (verdict === Verdict.CompileError) {
    return 'Compile Error';
  } else if (verdict === Verdict.JudgeError) {
    return 'Judge Error';
  } else if (verdict === Verdict.TestCaseError) {
    return 'Testcase Error';
  }
  return 'System Error';
}
