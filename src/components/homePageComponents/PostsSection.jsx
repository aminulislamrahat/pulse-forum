import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useForumAPI from "../../api/forumApi";
import PostCard from "./PostCard";
import Pagination from "./Pagination";
import SearchBar from "../hero/SearchBar";
import { Fade } from "react-awesome-reveal";
// If you're reusing

export default function PostsSection({ onSearch, searchTag }) {
  const { getPublicPosts } = useForumAPI();

  const [sort, setSort] = useState("recent");
  const [page, setPage] = useState(1);

  // Posts per page
  const limit = 5;

  // Fetch posts with tanstack query
  const { data, isLoading } = useQuery({
    queryKey: ["public-posts", { page, limit, searchTag, sort }],
    queryFn: () => getPublicPosts({ page, limit, search: searchTag, sort }),
    keepPreviousData: true,
  });

  // Handle search submit from SearchBar

  return (
    <section className="w-full mx-auto py-10 px-4 md:px-10 lg:px-36">
      <div className="w-full mx-auto bg-base-200 rounded-2xl p-2 lg:p-12">
        <Fade direction="down" triggerOnce>
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Explore Discussions
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              Dive into the latest public posts from our Pulse Forum community.{" "}
              <br />
              Share your insights, connect through conversation, and discover
              trending topics!
            </p>
          </div>
        </Fade>
        <div className="w-8/12 mx-auto mb-8">
          <SearchBar onSearch={onSearch} badgeColor="badge-primary" />
        </div>
        {/* Sort */}
        <div className="flex w-full mx-auto items-center justify-between mb-4">
          <div>
            <button
              className={`btn btn-sm mr-2 ${
                sort === "recent" ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => setSort("recent")}
            >
              Recent
            </button>
            <button
              className={`btn btn-sm ${
                sort === "popular" ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => setSort("popular")}
            >
              Popular
            </button>
          </div>
          <div>
            <span className="text-xs text-gray-400">
              {data?.total || 0} post{data?.total === 1 ? "" : "s"} found
            </span>
          </div>
        </div>
        {/* Posts */}
        {isLoading ? (
          <div className="flex w-full mx-auto justify-center py-10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : data?.posts?.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            No posts found with this tag.
          </div>
        ) : (
          <div className="flex flex-col w-full mx-auto gap-6">
            {data?.posts?.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {data?.total > limit && (
          <div className="flex w-full mx-auto justify-center mt-8">
            <Pagination
              page={page}
              setPage={setPage}
              total={data.total}
              limit={limit}
            />
          </div>
        )}
      </div>
    </section>
  );
}
