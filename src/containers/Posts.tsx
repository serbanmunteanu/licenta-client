import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import { PostInterface } from "../data/entities/Post";
import CategoryService from "../data/services/CategoryService";

type CategoryParam = {
  categoryId: string;
};

interface Category {
  id: number;
  name: string;
  shortDescription: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  posts: PostInterface[];
}

const Posts = () => {
  const { categoryId } = useParams<CategoryParam>();
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    CategoryService.getCategoryPosts(parseInt(categoryId))
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="container container1170" id="content">
        <h5 className="p-4">CATEGORIES</h5>
        <div className="category col-lg-12">
            <ul className="topic-list">
            {category ? (
            category.posts.map((post: any) => <Post post={post} />)
          ) : (
            <div> </div>
          )}
            </ul>
        </div>
      </div>
    </>
  );
};

export default Posts;
