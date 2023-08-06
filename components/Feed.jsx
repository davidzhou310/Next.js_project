"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClict }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map(post => {
        return <PromptCard
          key={post._id}
          post={post}
          handleTagClict={handleTagClict}
        />
      })}
    </div>
  );
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {

  }

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    })();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form> 
      
      <PromptCardList 
        data={posts}
        handleTagClict={() => {}}
      />
    </section>
  )
}

export default Feed;