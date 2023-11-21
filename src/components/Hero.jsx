import { motion } from 'framer-motion';

import { styles } from '../styles';
import { ComputersCanvas } from './canvas';

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      {/* <ComputersCanvas /> */}

      <div className={`${styles.paddingX} absolute
      inset-0 top-[120px] max-w-7xl mx-auto flex
      flex-row items-start gap-5 pointer-events-none`}>
        <div className="flex flex-col justify-center items-center mt-5 pointer-events-none">
          <div className="w-5 h-5 rounded-full bg-[#315eff] pointer-events-none" />
          <div className="w-1 sm:h-80 h-40 bg-gradient-to-b from-[#315eff] from-05% pointer-events-none" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText}
           text-white pointer-events-none drop-shadow-[0_3px_2px_rgba(0,0,0,1.0)]`}>Hi, I'm <span 
           className="text-[#315eff] pointer-events-none">
            Frank</span></h1>
            <p className={`${styles.heroSubText} mt-2
            text-white-100 pointer-events-none drop-shadow-[0_2px_1px_rgba(0,0,0,1.0)]`}>
              I Develop 3D Scenes using Assets and WebGL libraries, <br 
              className="sm:block hidden pointer-events-none" />
              User Interfaces, and variable Web Applications.
            </p>
        </div>
      </div>

      <div className="absolute xs:bottom-10 bottom-32 
      w-full flex justify-center items-center">
          <a href="#about">
            <div className="w-[35px] h-[64px]
            rounded-3xl border-4 border-secondary
            flex justify-center items-start p-2">
              <motion.div 
                animate={{
                  y: [0, 24, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
                className="w-3 h-3 rounded-full
                bg-secondary mb-1"
              />
            </div>
          </a>
      </div>
    </section>
  )
}

export default Hero;