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
      src="https://thefrank86.github.io/portfolio/gameContainer/index.html"  
      width="100%" 
      /* height="110%" */
      height="100%"
      onLoad={() => setIsIframeLoaded(true)} // add this line
      />

      {/* className="max-w-7xl   top-[80px]   " */}
      <div className={`absolute sm:px-8 px-3
      inset-0 flex
      flex-row items-start gap-3 pointer-events-none transform transition-all duration-500 ${isLeft ? '-translate-x-[20%]' : 'mx-auto'}`}>
        <div className={`flex flex-col justify-center items-center mt-3 sm:mt-5 pointer-events-none transition-opacity duration-300 ${isLeft ? 'opacity-0' : ''}`}>
          <div className="w-3 h-3 lg:w-5 lg:h-5 rounded-full bg-[#315eff] pointer-events-none" />
          <div className="w-0.5 lg:w-1 h-20 lg:h-40 bg-gradient-to-b from-[#315eff] from-05% pointer-events-none" />
        </div>

        <div>
          {/* text-[rgba(187,238,255,0)] */}
          <h1 className={`${styles.heroHeadText}
           pointer-events-none drop-shadow-[0_3px_2px_rgba(0,0,0,1.0)] transition-colors duration-500 ${isLeft ? 'text-[rgba(255,255,255,0)]' : ' text-[rgba(255,255,255,1)]'}`}>Hi, I'm <span 
           className={`pointer-events-none transition-colors duration-500 ${isLeft ? 'text-[rgba(49,94,255,0)]' : 'text-[rgba(49,94,255,1)]'}`}>
            Frank &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <button className={`text-[rgba(102,153,255,1)] font-mono pointer-events-auto lg:text-3xl sm:text-xl text-sm absolute`} onClick={() => setIsLeft(!isLeft)}>
              {isLeft ? '>' : '<'}
            </button>
            </h1>
            <p className={`${styles.heroSubText} mt-2 
            text-white-100 pointer-events-none drop-shadow-[0_2px_1px_rgba(0,0,0,1.0)] hidden lg:flex transition-colors duration-500 ${isLeft ? 'text-[rgba(255,255,255,0)]' : 'text-[rgba(255,255,255,1)]'}`}>
              I Develop 3D Scenes using Libraries and Assets, 
              <br className="sm:block hidden pointer-events-none" />
              UI's, and Variable Web Applications.
              <br/>
              I'm currently studying supervised Machine Learning.
            </p>
        </div>
      </div>

      <div className="text-[#6699FF] absolute xs:bottom-10 bottom-32 
      w-full hidden xl:flex justify-center items-center pointer-events-none">
          <a href="#about" onClick={() => {
              const iframeElement = document.querySelector('iframe');
              if (iframeElement) {
                iframeElement.contentWindow.postMessage('navOff', '*');
              } 
            }}
            className="pointer-events-none">
            {/* w-[35px] h-[64px]   sm:px-8  */}
            <div className="w-[20px] h-[40px] md:w-[35px] md:h-[64px] 
            rounded-3xl border-4 border-light-blue
            flex justify-center items-start p-2 pointer-events-auto opacity-50">
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
                bg-light-blue mb-1"
              />
            </div>
          </a>
      </div>
    </section>
  )
}

export default Hero;