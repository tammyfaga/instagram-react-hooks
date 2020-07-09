import React, { useState, useEffect } from 'react';

import Stories from '../../containers/Stories';
import Loading from '../../components/Loading';

import Posts from '../../containers/Posts';

import './FeedRoute.scss';

const FeedRoute = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({state: false, msg:'' });
  const [data, setData] = useState({ stories: [], posts: []});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
  
        const responseStories = await fetch(
          'https://5e7d0266a917d70016684219.mockapi.io/api/v1/stories',
        );
  
        const responsePosts = await fetch(
          'https://5e7d0266a917d70016684219.mockapi.io/api/v1/users/1/posts',
        );
  
        const dataStories = await responseStories.json();
        const dataPosts = await responsePosts.json();

        setData({stories: dataStories, posts: dataPosts});

      } catch(error) {
        console.error(error);
        setError({state: true, msg: error})
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  console.log('data', data);
  console.log('isLoading', isLoading);
  console.log('error', error);

  return (
    <>
      {/* {error.state && <p>{error.msg}</p>} */}
      {/* {isLoading && <Loading />} */}
      <div data-testid="feed-route">
        <Stories stories={data.stories} />
        <Posts posts={data.posts} />
      </div>
    </>
  );
};

export default FeedRoute;
