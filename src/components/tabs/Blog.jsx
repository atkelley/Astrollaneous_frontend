import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../app/actions/postsActions";
import Loader from "../common/Loader";
import Post from "../iterables/Post";

export default function Blog() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts()); 
  }, [dispatch]);

  return (
    (posts.length > 0 ?
      <main className="blog">
        <section>
        {posts.map((post, index) => <Post key={index} post={post} />)}
        </section>
      </main>
    :
      <Loader />
    )
  );
}