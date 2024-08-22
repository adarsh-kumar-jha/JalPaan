import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const TypewriterEffect = ({ text, duration = 2 }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const splitText = text.split('');
    textRef.current.innerHTML = '';

    splitText.forEach((char, index) => {
      const span = document.createElement('span');
      span.innerHTML = char === ' ' ? '&nbsp;' : char;
      textRef.current.appendChild(span);
    });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    tl.fromTo(
      textRef.current.children,
      { opacity: 0 },
      {
        opacity: 1,
        duration: duration / splitText.length,
        stagger: 0.05,
      }
    ).to(
      textRef.current.children,
      {
        opacity: 0,
        duration: duration / splitText.length,
        stagger: 0.05,
      },
      '+=1'
    );
  }, [text, duration]);

  return <div ref={textRef} />;
};

export default TypewriterEffect;
