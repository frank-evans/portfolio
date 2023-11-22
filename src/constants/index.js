import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    meta,
    starbucks,
    tesla,
    shopify,
    carrent,
    cardsite,
    jobit,
    tripguide,
    threejs,
    python,
    gitHub,
    framerMotion,
    django,
    gimp,
    c,
    adon,
    humorElse,
    stackOverflow,
    wholeFoods,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Web Developer",
      icon: web,
    },
    {
      title: "React Native Developer",
      icon: mobile,
    },
    {
      title: "Frontend Developer",
      icon: backend,
    },
    {
      title: "Content Creator",
      icon: creator,
    },
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "Python",
      icon: python,
    },
    {
      name: "C",
      icon: c,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Django",
      icon: django,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Framer Motion",
      icon: framerMotion,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "git Hub",
      icon: gitHub,
    },
    {
      name: "Gimp",
      icon: gimp,
    },
  ];
  
  const experiences = [
    {
      title: "Full stack Developer",
      company_name: "",
      icon: stackOverflow,
      iconBg: "#FFFFFF",
      date: "April 2022 - Present",
      points: [
        "Started by completing Harvard's infamous CS50 course, and continued on with many others by Harvard, Stanford, and more.",
        "Developing and maintaining web applications using Django, React.js, and other related technologies depicted below.",
        "Participating in code reviews and implementing constructive feedback from senior developers.",
        "Implementing responsive design and ensuring cross-browser compatibility.",
      ],
    },
    {
      title: "Small Business Owner",
      company_name: "Humor or Else",
      icon: humorElse,
      iconBg: "#FFFFFF",
      date: "Jan 2022 - Jan 2023",
      points: [
        "",
        "",
        "",
        "",
      ],
    },
    {
      title: "HVAC Technician",
      company_name: "Adon Complete",
      icon: adon,
      iconBg: "#FFFFFF",
      date: "Jan 2020 - November 2021",
      points: [
        "",
        "",
        "",
        "",
      ],
    },
    {
      title: "Retail Supervisor",
      company_name: "Whole Foods",
      icon: wholeFoods,
      iconBg: "#FFFFFF",
      date: "2017 - September 2019",
      points: [
        "",
        "",
        "",
        "",
      ],
    },
  ];
  
  const testimonials = [
    {
      testimonial:
        "I thought it was going to be a headache to make a website as beautiful as our product, but Frank came through.",
      name: "Sara Lee",
      designation: "CFO",
      company: "Acme Co",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      testimonial:
        "I've never met a web developer who truly cares about their clients' success like Frank does.",
      name: "Chris Brown",
      designation: "COO",
      company: "DEF Corp",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      testimonial:
        "After Frank optimized our website, our traffic increased by 28%. We can't thank him enough!",
      name: "Lisa Wang",
      designation: "CTO",
      company: "456 Enterprises",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
  ];
  
  const projects = [
    {
      name: "Dynamic TCG Visualizer",
      description:
        `Web-based platform that allows users to search sets and pieces to the popular TCG 'Magic the Gathering.' \xa0 Real-time search results using the Scryfall API are displayed with a Custom Visualizer Display.`,
      tags: [
        {
          name: "Javascript",
          color: "green-text-gradient",
        },
        {
          name: "Three.js",
          color: "pink-text-gradient",
        },
        {
          name: "Scryfall API",
          color: "blue-text-gradient",
        },
        {
          name: "HTML & css",
          color: "orange-text-gradient",
        },
      ],
      image: cardsite,
      source_code_link: "https://github.com/",
      live_link: "https://thefrank86.github.io/Card_Visualizer/index.html",
    },
    {
      name: "Tech Team Up",
      description:
        "Web application with Mobile in mind that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
      tags: [
        {
          name: "React Native",
          color: "green-text-gradient",
        },
        {
          name: "JavaScript & jsXML",
          color: "pink-text-gradient",
        },
        {
          name: "JSearch API",
          color: "blue-text-gradient",
        },
        {
          name: "Axios",
          color: "orange-text-gradient",
        },
      ],
      image: jobit,
      source_code_link: "https://github.com/",
      live_link: "",
    },
    {
      name: "Portfolio Website",
      description:
        "You're Here!  This is a showcase of my programming journey with live projects developed using modern techniques and a Bit of my personality. \xa0 Several different frameworks have been used to update this portfolio, including HTML, Django, and React.",
      tags: [
        {
          name: "ReactJS",
          color: "green-text-gradient",
        },
        {
          name: "JavaScript XML",
          color: "pink-text-gradient",
        },
        {
          name: "Three.js",
          color: "blue-text-gradient",
        },
        {
          name: "css",
          color: "orange-text-gradient",
        },
      ],
      image: tripguide,
      source_code_link: "https://github.com/",
      live_link: "",
    },
  ];
  
  export { services, technologies, experiences, testimonials, projects };