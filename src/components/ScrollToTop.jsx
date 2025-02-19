import React from 'react';
import { useNavigation } from 'react-router-dom';

const ScrollToTop = function () {
    const navigation = useNavigation();

    React.useEffect(() => {
        if (navigation.state === 'idle') {
            window.scrollTo(0, 0);
        }
    }, [navigation.state]);

    return null;
};

export default ScrollToTop;




