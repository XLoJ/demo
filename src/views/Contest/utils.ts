import dayjs from 'dayjs';

export function formatStartTime(timestamp: string) {
  return dayjs(timestamp).format('YYYY-MM-DD HH:mm');
}

export function formatDuration(duration: number) {
  if (duration < 0) return ' - ';
  const t = dayjs().hour(0).minute(0).add(duration, 'minute');
  return t.format('H:mm');
}
