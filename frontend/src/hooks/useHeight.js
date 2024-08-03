import { useState, useEffect, useRef } from 'react';

const useHeight = () => {
    const [height, setHeight] = useState(0);
    const divRef = useRef(null);

    useEffect(() => {
        if (divRef.current) {
            setHeight(divRef.current.clientHeight);
        }

        const handleResize = () => {
            if (divRef.current) {
                setHeight(divRef.current.clientHeight);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return [height, divRef];
};

export default useHeight;
