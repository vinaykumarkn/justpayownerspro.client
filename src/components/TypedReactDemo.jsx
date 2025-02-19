import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const TypedReactDemo = ({ strings, typeSpeed = 40, backSpeed = 0, loop = true }) => {
    // Ref to hold the span element where the typing effect will be rendered
    const el = useRef(null);

    useEffect(() => {
        // Initialize the Typed.js instance with options
        const options = {
            strings: strings,
            typeSpeed: typeSpeed,
            backSpeed: backSpeed,
            loop: loop,
        };

        // Create a new instance of Typed
        const typed = new Typed(el.current, options);

        // Cleanup the Typed instance when the component unmounts
        return () => {
            typed.destroy();
        };
    }, [strings, typeSpeed, backSpeed, loop]); // Dependencies: re-run when these props change

    return (
        <div className="wrap">
            <div className="type-wrap">
                <span style={{ whiteSpace: 'pre' }} ref={el} />
            </div>
        </div>
    );
};

export default TypedReactDemo;
