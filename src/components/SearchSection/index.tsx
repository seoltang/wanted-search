import { useState } from 'react';
import SearchBar from './SearchBar';
import SearchWordBox from './SearchWordBox';

function SearchSection() {
  const [inputText, setInputText] = useState('');

  return (
    <section className="flex flex-col justify-center items-center pt-20 pb-40 w-full bg-skyblue">
      <h2 className="mb-10 text-center text-[2.125rem] font-bold leading-[1.6] text-black">
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </h2>

      <div className="relative w-full max-w-[490px]">
        <SearchBar inputText={inputText} setInputText={setInputText} />
        <SearchWordBox inputText={inputText} />
      </div>
    </section>
  );
}

export default SearchSection;
