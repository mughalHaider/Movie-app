import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/api';
import ContentWrapper from '../../components/ContentWrapper';
import './style.scss';
import MovieCard from '../../components/movieCard/MovieCard';
import Spinner from '../../components/spinner/Spinner';

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); 
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
      setHasMore(res.page < res.total_pages); 
    });
  };

  const fetchNextPageData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      if (data?.results) {
        setData({
          ...data,
          results: [...data.results, ...res.results],
        });
      } else {
        setData(res);
      }
      setPageNum((prev) => prev + 1);
      setLoading(false);
      setHasMore(res.page < res.total_pages); // Update hasMore based on response
    });
  };

  useEffect(() => {
    fetchInitialData();
    setPageNum(1)
  }, [query]);

  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${data?.total_results > 1 ? "Results" : "Result"} of '${query}'`}
              </div>
              <div className="content">
                {data?.results?.map((item, index) => {
                  if (item.media_type === "person") return null;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </div>
              {hasMore && (
                <button className='loadMoreButton' onClick={fetchNextPageData}>
                  Load More
                </button>
              )}
            </>
          ) : (
            <span className='resultNotFound'>
              Sorry, Results Not Found!
            </span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
