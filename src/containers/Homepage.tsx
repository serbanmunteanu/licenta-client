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
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <h5 className="p-4">CATEGORIES</h5>
            <div className="row my-3">
              {categories?.map((category: CategoryResponse) => <Category category={category} />)}
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center my-4">
              <div className="card-header">Featured</div>
              <div className="card-body">
                <h5 className="card-title">Special title treatment</h5>
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.With supporting text below as a natural lead-in to additional
                  content.With supporting text below as a natural lead-in to additional
                  content.With supporting text below as a natural lead-in to additional
                  content.
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
