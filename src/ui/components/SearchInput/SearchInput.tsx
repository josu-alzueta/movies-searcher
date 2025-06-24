import React from "react";

type SearchInputProps = {
  onSearch: (search: string) => void;
  placeholder?: string;
};

export const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  placeholder = "Encuentra tu película favorita",
}) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
        className="search-input"
      />
    </div>
  );
};
