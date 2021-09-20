import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Category from "../components/Category";
import { CategoryResponse } from "../data/entities/Category";
import CategoryService from "../data/services/CategoryService";

const Homepage = () => {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);

  useEffect(() => {
    CategoryService.getCategories()
      .then((response: AxiosResponse<CategoryResponse[]>) => {
        setCategories(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
      });
  }, []);

  return (
    <>
      <div className="container container1170" id="content">
        <h5 className="p-4">CATEGORIES</h5>
        <div className="row">
          <div className="category col-md-9">
            <ul className="topic-list">
              {categories ? (
                categories.map((category: any) => (
                  <Category category={category} />
                ))
              ) : (
                <div> </div>
              )}
            </ul>
          </div>
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-header">Featured</div>
              <div className="card-body">
                <h5 className="card-title">Special title treatment</h5>
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.With supporting text below as a natural lead-in to
                  additional content.With supporting text below as a natural
                  lead-in to additional content.With supporting text below as a
                  natural lead-in to additional content.
                </p>
                <a href="#a" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
              <div className="card-footer text-muted">2 days ago</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
