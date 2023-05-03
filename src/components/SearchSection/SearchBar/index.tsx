import { useState } from 'react';
import SearchIcon from '../SearchIcon';
import DeleteButton from './DeleteButton';

type SearchBarProps = {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
};

function SearchBar({ inputText, setInputText }: SearchBarProps) {
  const [isOnFocus, setIsOnFocus] = useState(false);

  const onInput = (event: React.FormEvent<HTMLInputElement>) => {
    setInputText(event.currentTarget.value);
  };

  const deleteText = () => setInputText('');

  return (
    <div
      className={`flex items-center w-full bg-white rounded-full border-2 ${
        isOnFocus ? 'border-blue' : 'border-white'
      }`}
    >
      <label
        onFocus={() => setIsOnFocus(true)}
        onBlur={() => setIsOnFocus(false)}
        className="relative flex items-center flex-1 py-5 pl-6 pr-2.5 text-gray-300"
      >
        <div
          className={`flex items-center${
            isOnFocus || inputText ? ' opacity-0' : ''
          }`}
        >
          <SearchIcon size="16" />
          <div className="ml-3 text-lg">질환명을 입력해 주세요.</div>
        </div>

        <div className="absolute flex items-center pr-9 w-full pointer-events-none">
          <input
            type="text"
            className="pl-px pr-1.5 w-full bg-transparent text-lg text-black pointer-events-auto focus:outline-none"
            onInput={onInput}
            value={inputText}
            spellCheck={false}
          />
          <DeleteButton isOnFocus={isOnFocus} deleteText={deleteText} />
        </div>
      </label>

      <button
        type="button"
        name="search"
        className="flex justify-center items-center mr-2 w-12 h-12 bg-blue rounded-full text-white hover:bg-darkblue"
      >
        <SearchIcon size="21" />
      </button>
    </div>
  );
}

export default SearchBar;
