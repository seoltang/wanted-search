import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { MAX_DISPLAYED, SUGGESTED_SEARCH_WORDS } from '@/constants/searchWord';
import getAutocomplete from '@/utils/api/getAutocomplete';
import SearchWord from './SearchWord';

type SearchWordBoxProps = {
  inputText: string;
};

const recentSearchWords = ['갑상선', '관절염', '비만', '식도염'];

function SearchWordBox({ inputText }: SearchWordBoxProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [autocompleteWords, setAutocompleteWords] = useState<
    { id: number; name: string }[]
  >([]);

  const debounceText = useDebounce(inputText, 300);

  useEffect(() => {
    const search = async () => {
      const response = await getAutocomplete(debounceText.trim(), setIsLoading);
      setAutocompleteWords(response.slice(0, MAX_DISPLAYED));
    };

    search();
  }, [debounceText]);

  return (
    <div className="absolute mt-1.5 py-6 w-full max-w-[486px] bg-white rounded-[1.2rem] shadow-lg left-[50%] translate-x-[-50%]">
      {inputText ? (
        <div
          className={
            isLoading ? 'flex items-center justify-between w-full' : ''
          }
        >
          <SearchWord input={inputText} />

          {isLoading ? (
            <div className="px-6 text-sm text-gray-300">검색 중...</div>
          ) : autocompleteWords.length ? (
            <>
              <div className="px-6 py-1 text-[0.85rem] text-gray-400 leading-none">
                추천 검색어
              </div>
              <ul>
                {autocompleteWords.map(({ id, name }) => (
                  <SearchWord
                    key={id}
                    input={inputText}
                    word={name.slice(inputText.length)}
                  />
                ))}
              </ul>
            </>
          ) : null}
        </div>
      ) : (
        <>
          <div className="pb-6">
            <div className="px-6 text-[0.85rem] text-gray-400 leading-none">
              최근 검색어
            </div>

            {recentSearchWords?.length ? (
              <ul className="flex flex-col pt-2">
                {recentSearchWords.map((word, index) => (
                  <SearchWord key={word + index} word={word} />
                ))}
              </ul>
            ) : (
              <div className="pt-5 text-gray-300">최근 검색어가 없습니다</div>
            )}
          </div>

          <div className="px-6 pt-6 border-t border-t-gray-100">
            <div className="text-[0.85rem] text-gray-400 leading-none">
              추천 검색어로 검색해보세요
            </div>
            <div className="mt-4 flex items-center gap-x-2">
              {SUGGESTED_SEARCH_WORDS.map(({ id, word }) => (
                <span
                  key={id}
                  className="px-4 py-2.5 bg-lightblue text-blue rounded-full text-[0.9rem] cursor-pointer hover:bg-skyblue"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SearchWordBox;
