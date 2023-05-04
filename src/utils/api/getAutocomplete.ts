import axios, { AxiosError } from 'axios';
import { API, AUTOCOMPLETE_CACHE_KEY } from '@/constants/config';
import getCacheExpireTime from '../getCacheExpireTime';

const getAutocomplete = async (
  word: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  if (!word) return [];

  const cache = sessionStorage.getItem(`${AUTOCOMPLETE_CACHE_KEY}${word}`);

  if (cache) {
    const parsedCache = JSON.parse(cache);
    const currentDate = Date.now();

    if (currentDate > parsedCache.expiresTimestamp) {
      sessionStorage.removeItem(`${AUTOCOMPLETE_CACHE_KEY}${word}`);
    } else return parsedCache.words;
  }

  try {
    setIsLoading(true);

    const response = await axios(`${API}/?name=${word}`);

    console.info('calling api');
    setIsLoading(false);

    if (response.statusText === 'OK') {
      const words = response.data;

      sessionStorage.setItem(
        `${AUTOCOMPLETE_CACHE_KEY}${word}`,
        JSON.stringify({ ...getCacheExpireTime(), words }),
      );

      return words;
    }
  } catch (error) {
    if (error instanceof AxiosError) alert(error.response?.data.name);
    console.error((error as AxiosError).message);
  }
};

export default getAutocomplete;
