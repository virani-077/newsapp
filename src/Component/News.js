import React, { useEffect, useState } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=d707700b06d2479496fe568489520985&pageSize=${props.pagesize}`;
        let response = await fetch(url);
        let data = await response.json();
        setArticles(data.articles);
        setTotalResults(data.totalResults);
      } catch (error) {
        console.error("Error fetching Data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [props.pagesize]); 

  const handlePrevious = async () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      fetchArticles(newPage);
    }
  };

  const handleNext = async () => {
    const maxPages = Math.ceil(totalResults / 15); 
    if (currentPage < maxPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      fetchArticles(newPage);
    }
  };

  const fetchArticles = async (page) => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=d707700b06d2479496fe568489520985&page=${page}&pageSize=${props.pagesize}`;
    let response = await fetch(url);
    let data = await response.json();
    setArticles(data.articles);
  };

  return (
    <>
      <div className="container mt-5 pt-4">
        <h1 className="text-center ">News - Top Headlines</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className="row gap-2 justify-content-between my-3">
            {articles &&
              articles.map((article, index) => (
                <NewsItems
                  key={index}
                  title={article.title ? article.title.slice(0, 20) : ""}
                  descriptions={
                    article.description ? article.description.slice(0, 40) : ""
                  }
                  img={
                    !article.urlToImage
                      ? "https://ichef.bbci.co.uk/news/1024/branded_news/D66A/production/_132709845_gettyimages-1243910386.jpg"
                      : article.urlToImage
                  }
                  newsurl={article.url}
                  other={
                    article.author ? article.author.slice(0, 15) : " unkown"
                  }
                />
              ))}
          </div>
        )}
        <div className="container mt-5 d-flex justify-content-between">
          <button
            disabled={currentPage <= 1}
            onClick={handlePrevious}
            type="button"
            className="btn btn-dark"
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={currentPage + 1 > Math.ceil(totalResults / 15)}
            onClick={handleNext}
            type="button"
            className="btn btn-dark"
          >
            {" "}
            Next &rarr;
          </button>
        </div>
      </div>
    </>
  );
};

export default News;
