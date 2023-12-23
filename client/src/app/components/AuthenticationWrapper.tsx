import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loading from './Loading';

const AuthenticationWrapper = ({ children }:any) => {
  const router = useRouter();
  const isAuthenticated = localStorage.getItem("username") !== null && localStorage.getItem("token") !== null

  useEffect(() => {

    if (!isAuthenticated) {
      router.push('/signin');
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? children : <Loading/>;
};

export default AuthenticationWrapper;
