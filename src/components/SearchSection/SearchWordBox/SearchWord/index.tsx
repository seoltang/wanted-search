import SearchIcon from '@/components/SearchSection/SearchIcon';

type SearchWordProps = {
  inputText?: string;
  word: string;
  clickWord: (word: string) => void;
};

function SearchWord({ inputText, word, clickWord }: SearchWordProps) {
  return (
    <li
      onClick={() => clickWord(word)}
      className="flex items-center gap-x-3 px-6 py-2 text-gray-300 cursor-pointer hover:bg-gray-50"
    >
      <SearchIcon size="16" />
      <span className="text-black">
        {inputText ? <span className="font-bold">{inputText}</span> : null}
        {word?.slice(inputText?.length)}
      </span>
    </li>
  );
}

export default SearchWord;
