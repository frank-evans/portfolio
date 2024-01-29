import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react'; // import useState

import { styles } from '../styles';

const Hero = () => {
  const [isLeft, setIsLeft] = useState(false); // for the left side of the Hero component
  const [isIframeLoaded, setIsIframeLoaded] = useState(false); // allow the iframe to be clickable after it's loaded
  const heroRef = useRef(null); // define heroRef

  useEffect(() => {
    const iframeElement = document.querySelector('iframe'); // replace with the actual selector of your iframe
    let observer;
  
    if (iframeElement) {
      iframeElement.addEventListener('load', function() {
        // The iframe and all of its contents have finished loading
  
        if (heroRef.current) {
          observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                // The Hero component is visible, send a postMessage to the iframe
                iframeElement.contentWindow.postMessage('observeOn', '*');
              } else {
                iframeElement.contentWindow.postMessage('observeOff', '*');
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
  }, []);

  return (
    /* w-full h-screen */
    <section ref={heroRef} className={`relative aspect-video ${isLeft ? '' : 'mx-auto'}`}>
      <iframe 
      /* className="pt-16" */
      className={`pt-0 ${isIframeLoaded ? '' : 'pointer-events-none'}`} // add this line
      src="https://thefrank86.github.io/Portfolio/gameContainer/index.html"  
      /* src="http://localhost:5173/Portfolio-Base/gameContainer/index.html" */  
      width="100%" 
      /* height="110%" */
      height="100%"
      onLoad={() => setIsIframeLoaded(true)} // add this line
      />

      {/* className="max-w-7xl   top-[80px]   " */}
      <div className={`absolute sm:px-8 px-3
      inset-0 flex
      flex-row items-start gap-3 pointer-events-none transform transition-all duration-500 ${isLeft ? '-translate-x-[20%]' : 'mx-auto'}`}>
        <div className="flex flex-col justify-center items-center mt-3 sm:mt-5 pointer-events-none">
          <div className="w-3 h-3 lg:w-5 lg:h-5 rounded-full bg-[#315eff] pointer-events-none" />
          <div className="w-0.5 lg:w-1 h-20 lg:h-40 bg-gradient-to-b from-[#315eff] from-05% pointer-events-none" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText}
           text-[#BBEEFF] pointer-events-none drop-shadow-[0_3px_2px_rgba(0,0,0,1.0)]`}>Hi, I'm <span 
           className="text-[#315eff] pointer-events-none">
            Frank &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <button className={`font-mono pointer-events-auto lg:text-3xl sm:text-xl text-sm text-[#6699FF] absolute ${isLeft ? '' : ''}`} onClick={() => setIsLeft(!isLeft)}>
              {isLeft ? '>' : '<'}
            </button>
            </h1>
            <p className={`${styles.heroSubText} mt-2 text-[#BBEEFF]
            text-white-100 pointer-events-none drop-shadow-[0_2px_1px_rgba(0,0,0,1.0)] hidden lg:flex`}>
              I Develop 3D Scenes using Assets and libraries, 
              <br className="sm:block hidden pointer-events-none" />
              UI's, and variable Web Applications.
              <br/>
              I'm currently studying Machine Learning.
            </p>
        </div>
      </div>

      <div className="absolute xs:bottom-10 bottom-32 
      w-full hidden xl:flex justify-center items-center pointer-events-none">
          <a href="#about" onClick={() => {
              /* e.preventDefault();
              const aboutSection = document.querySelector('#about');
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
              } */
              const iframeElement = document.querySelector('iframe');
              if (iframeElement) {
                iframeElement.contentWindow.postMessage('navOff', '*');
              } 
            }}
            className="pointer-events-none">
            {/* w-[35px] h-[64px]   sm:px-8  */}
            <div className="w-[20px] h-[40px] md:w-[35px] md:h-[64px] 
            rounded-3xl border-4 border-secondary
            flex justify-center items-start p-2 pointer-events-auto">
              <motion.div 
                animate={{
                  y: [0, 24, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
                className="w-[3px] h-[3px] md:w-[12px] md:h-[12px] rounded-full
                bg-secondary mb-1"
              />
            </div>
          </a>
      </div>
    </section>
  )
}

export default Hero;