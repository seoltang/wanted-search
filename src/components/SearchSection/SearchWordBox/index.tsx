import { suggestedSearchWords } from '@Constants/suggestedSearchWords';
import SearchWord from './SearchWord';
import { useState } from 'react';

type SearchWordBoxProps = {
  inputText: string;
};

const recentSearchWords = ['갑상선', '관절염', '비만', '식도염'];

function SearchWordBox({ inputText }: SearchWordBoxProps) {
  const [isLoading, setIsLoading] = useState(false);
  const autocompleteSearchWords = ['간질', '간암', '간염', '간다간다'];

  return (
    <div className="absolute mt-1.5 p-6 w-full max-w-[486px] bg-white rounded-[1.2rem] shadow-lg left-[50%] translate-x-[-50%]">
      {isLoading ? (
        <div className="text-sm text-gray-300">검색 중...</div>
      ) : inputText ? (
        <>
          <SearchWord input={inputText} />

          {autocompleteSearchWords.length ? (
            <>
              <div className="py-1 text-[0.85rem] text-gray-400 leading-none">
                추천 검색어
              </div>
              {autocompleteSearchWords.map((word, index) => (
                <SearchWord
                  key={word + index}
                  input={inputText}
                  word={word.slice(inputText.length)}
                />
              ))}
            </>
          ) : null}
        </>
      ) : (
        <>
          <div className="pb-6">
            <div className="text-[0.85rem] text-gray-400 leading-none">
              최근 검색어
            </div>

            {recentSearchWords?.length ? (
              <div className="flex flex-col pt-2">
                {recentSearchWords.map((word, index) => (
                  <SearchWord key={word + index} word={word} />
                ))}
              </div>
            ) : (
              <div className="pt-5 text-gray-300">최근 검색어가 없습니다</div>
            )}
          </div>

          <div className="pt-6 border-t border-t-gray-100">
            <div className="text-[0.85rem] text-gray-400 leading-none">
              추천 검색어로 검색해보세요
            </div>
            <div className="mt-4 flex items-center gap-x-2">
              {suggestedSearchWords.map(({ id, word }) => (
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
