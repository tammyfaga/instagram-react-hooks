import React, { useState, useEffect } from 'react';

import UsersList from '../../containers/UsersList/UsersList';

const UsersRoute = () => {
  const [users, setUsers] = useState({ users: [] });

  useEffect(() => {
    const fetchData = async () => {
      const responseUsers = await fetch(
        'https://5e7d0266a917d70016684219.mockapi.io/api/v1/stories',
      );

      const dataUsers = await responseUsers.json();
 
      setUsers({ dataUsers });
    }
    fetchData();
  }, []);

  console.log('users', users);
  return (
    <div className="container" data-testid="users-route">
      <UsersList users={users} />
    </div>
  );
};

export default UsersRoute;
