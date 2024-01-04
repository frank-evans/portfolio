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
    sqlite,
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
      title: "Full Stack Developer",
      icon: backend,
    },
    {
      title: "React Native Developer",
      icon: mobile,
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
      name: "SQLite",
      icon: sqlite,
    },
    {
      name: "Gimp",
      icon: gimp,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "git Hub",
      icon: gitHub,
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
        "Started by completing Harvard's infamous CS50 course, and continued on with many other Computer Science courses by Harvard, Stanford, and more.",
        "Developing and maintaining web applications using Django, React.js, and other related technologies depicted below.",
        "Participating in code reviews and implementing constructive feedback from senior developers.",
        "Implementing responsive design and ensuring cross-browser compatibility.",
      ],
    },
    {
      title: "Independent Business Owner",
      company_name: "Humor or Else",
      icon: humorElse,
      iconBg: "#FFFFFF",
      date: "December 2021 - January 2023",
      points: [
        "Developed custom content, products, and marketing for independent business.",
        "Content included writing and video for niche humor market including gaming and stand-up.",
        "Products included custom graphics for goods directly associated with video content.",
        "Marketing included promotional video (Youtube) and website (Shopify) for products associated with content.",
      ],
    },
    {
      title: "HVAC Technician/Lead",
      company_name: "Adon Complete",
      icon: adon,
      iconBg: "#FFFFFF",
      date: "January 2020 - November 2021",
      points: [
        "Field technician responding to all service inquiries including diagnostics, repairs, estimates, and sales.",
        "Install/project lead of teams up to 10 on many installs/projects.",
        "Continued training for technical accuracy, efficiency, and customer satisfaction.",
        "Worked directly with owners on continuous updates/changes to company practices and procedures",
      ],
    },
    {
      title: "Retail Supervisor",
      company_name: "Whole Foods",
      icon: wholeFoods,
      iconBg: "#FFFFFF",
      date: "February 2017 - October 2019",
      points: [
        "Grocery department supervisor of teams up to 8.",
        "Daily communication with Team Manager on performance, schedule, rollouts, feedback, and issues.",
        "Refined SOP for direct team during company updates/changes.",
        "Continued to train members on all processes and expectations.",
      ],
    },
  ];
  
  const testimonials = [
    {
      testimonial:
        "Projects usually are either pretty smooth or a big headache.  Frank's communication and attention to detail ensured our project went smoothly, it was nice working with him.",
      name: "Alex R.",
      designation: "Graphic Artist",
      company: "Independent",
      image: "https://randomuser.me/api/portraits/men/35.jpg",
    },
    {
      testimonial:
        "Frank always takes care of clients.  He is one of my favorite people to work with.",
      name: "Clarence M.",
      designation: "Lead Technician",
      company: "Adon Complete",
      image: "https://randomuser.me/api/portraits/men/21.jpg",
    },
    {
      testimonial:
        "I needed some help outside our normal scope of work.  When I was having trouble finding a solution, Frank took it upon himself to get involved and helped me find a good solution.",
      name: "Scott S.",
      designation: "Team Member",
      company: "Whole Foods",
      image: "https://randomuser.me/api/portraits/men/68.jpg",
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
      source_code_link: "https://github.com/TheFrank86/thefrank86.github.io",
      live_link: "https://thefrank86.github.io/Portfolio-Base/Card_Visualizer/index.html",
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
      source_code_link: "https://github.com/TheFrank86/React-Navtive-Jobs",
      live_link: "",
    },
    {
      name: "Portfolio Website",
      description:
        `You're Here!  This is a showcase of my programming journey with live projects developed using modern techniques and a Bit of my personality. \xa0 Several different frameworks have been used to update this portfolio, including HTML, Django, and React.`,
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
      source_code_link: "https://github.com/TheFrank86/Portfolio-Base",
      /* live_link: "https://thefrank86.github.io/Portfolio-Base/gameContainer/index.html", */
    },
  ];
  
  export { services, technologies, experiences, testimonials, projects };