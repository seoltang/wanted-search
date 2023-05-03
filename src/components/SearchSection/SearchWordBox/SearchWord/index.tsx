import SearchIcon from '@/components/SearchSection/SearchIcon';

type SearchWordProps = {
  input?: string;
  word?: string;
};

function SearchWord({ input, word }: SearchWordProps) {
  return (
    <li className="flex items-center gap-x-3 px-6 py-2 text-gray-300 cursor-pointer hover:bg-gray-50">
      <SearchIcon size="16" />
      <span className="text-black">
        {input ? <span className="font-bold">{input}</span> : null}
        {word ?? ''}
      </span>
    </li>
  );
}

export default SearchWord;
