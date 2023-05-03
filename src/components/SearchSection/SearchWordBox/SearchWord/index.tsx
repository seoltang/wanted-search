import SearchIcon from '@Components/SearchSection/SearchIcon';

type SearchWordProps = {
  input?: string;
  word?: string;
};

function SearchWord({ input, word }: SearchWordProps) {
  return (
    <div className="flex items-center gap-x-3 py-2 text-gray-300">
      <SearchIcon size="16" />
      <span className="text-black">
        {input ? <span className="font-bold">{input}</span> : null}
        {word ?? ''}
      </span>
    </div>
  );
}

export default SearchWord;
