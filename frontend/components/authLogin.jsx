import { Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function HomePage() {
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
                    }, 10);
                }, 500);

        } else if (router.pathname === '/') {
            setLoading(false);
        }
    }, []);

    return (
    <>
    {loading &&(
        <Box 
        position="absolute" 
        top={0} 
        left={0} 
        right={0} 
        bottom={0} 
        zIndex={9999} 
        bgGradient="linear(to-r, #007bff, #8a2be2)" 
        minH="100vh"
        />
        )}
    </>
    );
}
