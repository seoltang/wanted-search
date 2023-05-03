import axios, { AxiosError } from 'axios';
import { API } from '@/constants/config';

const getAutocomplete = async (
  word: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  if (!word) return [];

  try {
    setIsLoading(true);

    const response = await axios(`${API}/?name=${word}`);

    console.info('calling api');
    setIsLoading(false);

    if (response.statusText === 'OK') return response.data;
  } catch (error) {
    if (error instanceof AxiosError) alert(error.response?.data.name);
    console.error((error as AxiosError).message);
  }
};

export default getAutocomplete;
