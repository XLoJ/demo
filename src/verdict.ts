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
