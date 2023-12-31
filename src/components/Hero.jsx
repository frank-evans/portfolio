import { motion } from 'framer-motion';

import { styles } from '../styles';
import { GameCanvas } from './canvas';

const Hero = () => {
  return (
    /* w-full h-screen */
    <section className="relative mx-auto aspect-video">
      {/* <ComputersCanvas /> */}
      {/* <GameCanvas /> */}
      <iframe 
      className="pt-14"
      /* src="https://thefrank86.github.io/Card_Visualizer/index.html" */ 
      src="http://localhost:5173/src/components/canvas/gameContainer/index.html" 
      width="100%" 
      height="100%"
      />

      {/* className="max-w-7xl" */}
      <div className={`sm:px-8 px-3 absolute
      inset-0 top-[80px] mx-auto flex
      flex-row items-start gap-3 pointer-events-none`}>
        <div className="flex flex-col justify-center items-center mt-3 sm:mt-5 pointer-events-none">
          <div className="w-3 h-3 lg:w-5 lg:h-5 rounded-full bg-[#315eff] pointer-events-none" />
          <div className="w-0.5 lg:w-1 h-20 lg:h-40 bg-gradient-to-b from-[#315eff] from-05% pointer-events-none" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText}
           text-white pointer-events-none drop-shadow-[0_3px_2px_rgba(0,0,0,1.0)]`}>Hi, I'm <span 
           className="text-[#315eff] pointer-events-none">
            Frank</span></h1>
            <p className={`${styles.heroSubText} mt-2
            text-white-100 pointer-events-none drop-shadow-[0_2px_1px_rgba(0,0,0,1.0)] hidden lg:flex`}>
              I Develop 3D Scenes using Assets and WebGL libraries, <br 
              className="sm:block hidden pointer-events-none" />
              User Interfaces, and variable Web Applications.
            </p>
        </div>
      </div>

      <div className="absolute xs:bottom-10 bottom-32 
      w-full hidden xl:flex justify-center items-center pointer-events-none">
          <a href="#about" className="pointer-events-none">
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