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
    
      (posts ?
        <main className="blog">
          <section>
          {posts.map((post) => <Post key={post.id} post={post} showDeleteModal={showDeleteModal} showCommentModal={showCommentModal} />)}
          </section>
        </main>
      :
        <Loader />
      )
    
  );
}