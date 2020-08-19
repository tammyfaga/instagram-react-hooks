import React, { useState, useEffect } from 'react';

import Stories from '../../containers/Stories';
import Posts from '../../containers/Posts';
import Loading from '../../components/Loading';


import './FeedRoute.scss';

const FeedRoute = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [usersFetched, setUsersFetched] = useState(0);
  const [stories, setStories] = useState([]);

  const getUsersPostById = (postUserId) => users.find(user => postUserId === user.id);

  useEffect(() => {
    fetch('https://5f070a2d9c5c2500163067dd.mockapi.io/api/v1/users')
      .then((res) => res.json())
      .then(data => setUsers(data));
  }, []);

  useEffect(() => {
    if (usersFetched === users.length) {
      return;
    }

    fetch(`https://5f070a2d9c5c2500163067dd.mockapi.io/api/v1/users/${users[usersFetched].id}/posts`)
    .then((res) => res.json())
    .then(data => {
      setPosts([...posts, ...data]);
      setUsersFetched(usersFetched + 1);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, usersFetched]);

  useEffect(() => {
    fetch('https://5f070a2d9c5c2500163067dd.mockapi.io/api/v1/stories')
      .then((res) => res.json())
      .then(data => {
        setStories(data);
      });
  }, [users])

  return (
    <div data-testid="feed-route">
      {(users.length > 0 && stories.length > 0) && (
        <Stories
          stories={stories}
          getUserHandler={getUsersPostById}
        />
      )}

      {users.length !== usersFetched
        ? (<Loading />)
        : (
          <Posts
            posts={posts}
            getUserHandler={getUsersPostById}
          />
        )
      }
    </div>
  );
};

export default FeedRoute;
