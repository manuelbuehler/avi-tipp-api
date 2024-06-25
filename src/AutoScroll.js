import { useEffect, useRef } from "react";

const useAutoScroll = () => {
    const myTimeRef = useRef(null);
    const containRef = useRef(null);

    const pageScroll = () => {
        if (containRef.current) {

            if (containRef.current.scrollTop + containRef.current.clientHeight >= containRef.current.scrollHeight - 1) {

                setTimeout(() => {
                    containRef.current.scrollTop = 0;
                    myTimeRef.current = setTimeout(pageScroll, 3000);
                }, 3000);
            } else {
                containRef.current.scrollTop += 1;
                myTimeRef.current = setTimeout(pageScroll, 75);
            }
        }
    };

    const handleMouseOver = () => {
        clearTimeout(myTimeRef.current);
    };

    const handleMouseOut = () => {
        pageScroll();
    };

    useEffect(() => {
        pageScroll();

        return () => clearTimeout(myTimeRef.current);
    }, []);

    return { containRef, handleMouseOver, handleMouseOut };
};

export default useAutoScroll;
