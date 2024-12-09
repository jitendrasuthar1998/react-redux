import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from "./postsSlice";


import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButton";
import PostExcerpt from "./PostExcerpt";

const PostsList = () => {
  const posts = useSelector(selectAllPosts);
  const status = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(status == 'idle'){
      dispatch(fetchPosts())    
    }
  },[status,dispatch])

  const orderedPost = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
  console.log("posts", posts);

  const renderPosts = orderedPost.map((post) => (
    <PostExcerpt key={post.id} post={post}/>
  ));

  return (
    <section>
      <h2>Posts</h2>
      {renderPosts}
    </section>
  );
};

export default PostsList;
