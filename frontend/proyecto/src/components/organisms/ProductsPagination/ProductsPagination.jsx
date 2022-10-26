
import React, { useState} from "react";
import { Products } from "../Products/Products";
import { Pagination } from "./Pagination";
import "./ProductsPagination.css";

export const ProductsPagination = ({ currentPage, setCurrentPage,data,setMapHomeData ,setShowMap,filterTitle,reRender,setReRender }) => {
    console.log(reRender);
    const [postsPerPage, setPostsPerPage] = useState(10);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data.slice(indexOfFirstPost,indexOfLastPost)

    const scroll = () => {
        
            // window.scrollTo({ top: 480, behavior: 'smooth' })        
    }

    // Change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        // scroll();
    }
    
    return (
      <>
        <Products
          setReRender={setReRender}
          reRender={reRender}
          filterTitle={filterTitle}
          setShowMap={setShowMap}
          setMapHomeData={setMapHomeData}
          data={currentPosts}
        ></Products>
        <div className="paginationProducts-container">
          <Pagination
            setReRender={setReRender}
            paginate={paginate}
            postsPerPage={postsPerPage}
            totalPosts={data.length}
          />
        </div>
      </>
    );
}