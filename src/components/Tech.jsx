import { SectionWrapper } from '../hoc';
import { technologies } from '../constants';
import style from '../index.css?inline';

const Tech = () => {
  return (
    <div className="tech flex flex-row flex-wrap justify-center gap-10">
      {technologies.map((technology) => (
        <div className="w-28 h-28" key={technology.name}>
          <img src={technology.icon} className="iFloat" />
        </div>
      ))}
    </div>
  )
}

export default SectionWrapper(Tech, "");