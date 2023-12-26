import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import { fetchAuth } from '../utils/Authentication';

const AuthenticationWrapper = ({ children }:any) => {
  const router = useRouter();
  const [ loading, setLoading ] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchAuth();
      if (!res.ok) {
        router.push("/signin");
      }
      else{
        setLoading(false);
      }
    };
    fetchData();

  }, [])
  return loading ? <Loading/>: children;
};

export default AuthenticationWrapper;
