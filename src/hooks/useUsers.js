import { useEffect, useState } from 'react';
import { getUsers } from '../services/userService';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      setLoading(true);
      const data = await getUsers();

      if (isMounted) {
        setUsers(data);
        setLoading(false);
      }
    }

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  return { users, loading };
}
