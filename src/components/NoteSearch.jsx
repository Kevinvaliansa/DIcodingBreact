import React, { useState } from 'react';

function NoteSearch({ onSearch }) {
  const [keyword, setKeyword] = useState('');

  const onKeywordChangeHandler = (event) => {
    const value = event.target.value;
    setKeyword(value);
    onSearch(value);
  };

  const onClearHandler = () => {
    setKeyword('');
    onSearch('');
  };

  return (
    <div className="note-search" data-testid="note-search">
      <input
        type="text"
        placeholder="Cari catatan..."
        value={keyword}
        onChange={onKeywordChangeHandler}
        data-testid="note-search-input"
      />
      {keyword && (
        <button
          className="note-search__clear"
          type="button"
          onClick={onClearHandler}
          aria-label="Hapus pencarian"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default NoteSearch;
