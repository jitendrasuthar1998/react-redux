// import Counter from "./features/counter/Couter";
import AddPostForm from "./features/posts/AddPostForm";
import PostsList from "./features/posts/PostsList";
import "./styles.css";

export default function App() {
  return (
    <main>
      {/* <Counter /> */}
      <AddPostForm/>
      <PostsList/>
    </main>
  );
}
