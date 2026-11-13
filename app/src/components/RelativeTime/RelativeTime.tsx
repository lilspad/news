import { useRelativeTime } from '@hooks/useRelativeTime';

type RelativeTimeProps = {
  date: Date;
};

export function RelativeTime({ date }: RelativeTimeProps) {
  return (
    <time>{useRelativeTime(date)}</time>
  );
}
