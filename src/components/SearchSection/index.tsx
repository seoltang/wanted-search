import { useEffect, useState } from 'react';
import { RECENT_SEARCH_WORDS_KEY } from '@/constants/config';
import SearchBar from './SearchBar';
import SearchWordBox from './SearchWordBox';

function SearchSection() {
  const [inputText, setInputText] = useState('');
  const [recentSearchWords, setRecentSearchWords] = useState<string[]>([]);

  useEffect(() => {
    if (sessionStorage.getItem(RECENT_SEARCH_WORDS_KEY))
      setRecentSearchWords(
        JSON.parse(sessionStorage.getItem(RECENT_SEARCH_WORDS_KEY) as string),
      );
  }, []);

  const search = (input: string) => {
    setRecentSearchWords((prevWords) => {
      if (prevWords[0] === input) return prevWords;

      if (prevWords.includes(input)) {
        prevWords.splice(prevWords.indexOf(input), 1);
      }

      const newWords = [input, ...prevWords];

      sessionStorage.setItem(RECENT_SEARCH_WORDS_KEY, JSON.stringify(newWords));
      return newWords;
    });
  };

  return (
    <section className="flex flex-col justify-center items-center pt-20 pb-40 w-full bg-skyblue">
      <h2 className="mb-10 text-center text-[2.125rem] font-bold leading-[1.6] text-black">
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </h2>

      <div className="relative w-full max-w-[490px]">
        <SearchBar
          inputText={inputText}
          setInputText={setInputText}
          search={search}
        />
        <SearchWordBox
          inputText={inputText}
          setInputText={setInputText}
          recentSearchWords={recentSearchWords}
          search={search}
        />
      </div>
    </section>
  );
}

export default SearchSection;
