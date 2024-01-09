import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { About, Contact, Experience, Feedbacks, 
Hero, Navbar, Tech, Works, StarsCanvas } from './components'; 

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  /* const heroRef = useRef(null);
  const [iframe, setIframe] = useState(null); */

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  /* useEffect(() => {
    const iframeElement = document.querySelector('iframe'); // replace with the actual selector of your iframe
    let observer;
  
    if (iframeElement) {
      iframeElement.addEventListener('load', function() {
        // The iframe and all of its contents have finished loading
        setIframe(iframeElement);
  
        if (heroRef.current) {
          observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                // The Hero component is visible, send a postMessage to the iframe
                iframe.contentWindow.postMessage('observeOn', '*');
              } else {
                iframe.contentWindow.postMessage('observeOff', '*');
              }
            });
          });
          // Start observing the Hero component
          observer.observe(heroRef.current);
        }
      });
    }
  
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []); */
 
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        {/*<div className="bg-hero-pattern bg-cover 
        bg-no-repeat bg-center">*/}
        <div className="bg-hero-pattern bg-cover 
        bg-no-repeat bg-center">
          <Navbar className={isScrolled ? "visible" : ""} />
          {/* <Hero ref={heroRef} /> */}
          <Hero />
        </div>
          <About />
          <Experience />
          <Tech />
          <Works />
          <Feedbacks />
        <div className="relative z-0">
          <Contact />
          {/* <StarsCanvas /> */}
        </div>
      </div>
    </BrowserRouter>
  ) 
}

export default App