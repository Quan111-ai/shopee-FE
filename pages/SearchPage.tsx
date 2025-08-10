import React from "react";
import { useSearchParams } from "react-router-dom";

import SearchResults from "../components/search/SearchResult";

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  return (
    <>
     
      <SearchResults keyword={keyword} />
    </>
  );
};

export default SearchPage;