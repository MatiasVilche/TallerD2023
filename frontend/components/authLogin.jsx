// components/authLogin.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Auth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hasToken = document.cookie.includes('token=');

    if (!hasToken && router.pathname !== '/') {
      setLoading(true);

      setTimeout(() => {
        router.push('/');
        setTimeout(() => {
          setLoading(false);
        },  10);
      },  100);
    } else if (router.pathname === '/') {
      setLoading(false);
    }
  }, [router]);

  // Renderiza un indicador de carga si es necesario
  if (loading) {
    return <div>Cargando...</div>;
  }

  return null; // No renderiza nada si no hay carga
};

export default Auth;
