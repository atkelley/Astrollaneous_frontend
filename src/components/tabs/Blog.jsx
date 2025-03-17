import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import Post from "../iterables/Post";
import { getPosts } from "../../services/post.service";

export default function Blog() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await getPosts().then(response => {
        setPosts([...response.data]);
      }).catch(error => {
        console.log(error);
      });
    }
    
    fetchData();
  }, []);

  const showDeleteModal = () => {}
  const showCommentModal = () => {}

  return (
    <main className="blog">
      {posts ?
        posts.map((post) => <Post key={post.id} post={post} showDeleteModal={showDeleteModal} showCommentModal={showCommentModal} />)
      :
        <Loader />
      }
    </main>
  );
}