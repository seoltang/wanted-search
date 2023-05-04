import axios, { AxiosError } from 'axios';
import { API, AUTOCOMPLETE_CACHE_KEY } from '@/constants/config';

const getAutocomplete = async (
  word: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  if (!word) return [];

  const cache = sessionStorage.getItem(`${AUTOCOMPLETE_CACHE_KEY}${word}`);
  if (cache) return JSON.parse(cache);

  try {
    setIsLoading(true);

    const response = await axios(`${API}/?name=${word}`);

    console.info('calling api');
    setIsLoading(false);

    if (response.statusText === 'OK') {
      const result = response.data;

      sessionStorage.setItem(
        `${AUTOCOMPLETE_CACHE_KEY}${word}`,
        JSON.stringify(result),
      );

      return result;
    }
  } catch (error) {
    if (error instanceof AxiosError) alert(error.response?.data.name);
    console.error((error as AxiosError).message);
  }
};

export default getAutocomplete;
