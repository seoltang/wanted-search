import { MAX_AGE } from '@/constants/cache';

const getCacheExpireTime = () => {
  const now = new Date();

  const expiresAt = new Date(now.getTime() + MAX_AGE);
  const expiresTimestamp = expiresAt.getTime();

  return { expiresAt: expiresAt.toString(), expiresTimestamp };
};

export default getCacheExpireTime;
