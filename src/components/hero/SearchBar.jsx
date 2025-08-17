import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useForumAPI from "../../api/forumApi";

export default function SearchBar({ onSearch, badgeColor }) {
  const [search, setSearch] = useState("");
  const { getPopularSearchTags, logSearchTag, getAllTags } = useForumAPI();

  // Fetch top 3 popular tags
  const {
    data: popularTags = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["popular-search-tags"],
    queryFn: getPopularSearchTags,
    select: (data) =>
      Array.isArray(data)
        ? [...data]
            .sort((a, b) => b.count - a.count)
            .slice(0, 3)
            .map((item) => item.tag)
        : [],
  });

  // Fetch all tags
  const { data: allTags = [] } = useQuery({
    queryKey: ["all-tags"],
    queryFn: getAllTags,
    select: (data) => data?.map((tag) => tag.name?.toLowerCase()) || [],
  });

  // Mutation for logging search
  const { mutateAsync: logTag } = useMutation({ mutationFn: logSearchTag });

  // Error state for tag not found
  const [tagNotFound, setTagNotFound] = useState(false);

  // When user submits a search
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTagNotFound(false);

    const query = search.trim().toLowerCase();
    if (!query) {
      onSearch(query);
      refetch();
      return;
    }

    if (!allTags.includes(query)) {
      setTagNotFound(true);
      onSearch(""); // Optionally clear result section
      return;
    }

    await logTag(query);
    onSearch(query);
    refetch(); // refetch popular tags after search
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <div className="flex flex-col lg:flex-row items-stretch w-full bg-base-300 rounded-xl shadow px-2 py-2 gap-2">
        <input
          className="flex-1 text-lg bg-transparent outline-none w-full min-w-0"
          type="text"
          placeholder="Search by tag..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setTagNotFound(false); // reset error on change
          }}
        />
        <button className="btn btn-primary w-full lg:w-auto" type="submit">
          Search
        </button>
      </div>
      {tagNotFound && (
        <div className="text-xs text-error text-center">
          No tag with this search.
        </div>
      )}
      {/* Popular tags */}
      <div className="flex flex-wrap items-center gap-3 justify-center mt-1">
        {isLoading ? (
          <span className="text-xs text-gray-300">Loading...</span>
        ) : popularTags.length > 0 ? (
          popularTags.map((tag) => (
            <button
              type="button"
              key={tag}
              className={`badge badge-lg badge-outline ${badgeColor} hover:bg-primary hover:text-white transition`}
              onClick={async () => {
                setSearch(tag);
                await logTag(tag);
                onSearch(tag);
                refetch(); // refetch after clicking popular tag
              }}
            >
              #{tag}
            </button>
          ))
        ) : (
          <span className="text-xs text-gray-300">No popular tags</span>
        )}
      </div>
    </form>
  );
}
