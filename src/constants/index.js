import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    html,
    css,
    reactjs,
    tailwind,
    nodejs,
    git,
    cardsite,
    threejs,
    python,
    gitHub,
    django,
    gimp,
    c,
    sqlite,
    adon,
    humorElse,
    stackOverflow,
    wholeFoods,
    game,
    teamUp,
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
      title: "Full Stack Developer",
      icon: backend,
    },
    {
      title: " 3D Web Developer",
      icon: web,
    },
    {
      title: "React Native Mobile Developer",
      icon: mobile,
    },
    {
      title: "Content Asset Creator",
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
        "Problem-solving in design, build, bug fixing, and refactoring for various technologies.",
      ],
    },
    {
      title: "Independent Business Owner",
      company_name: "Humor or Else",
      icon: humorElse,
      iconBg: "#FFFFFF",
      date: "December 2021 - January 2023",
      points: [
        "Developed custom content, products, and marketing for independent businesses.",
        "Content included writing and video for the niche humor market including gaming and stand-up.",
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
        "Daily communication with Team/Department Manager on performance, scheduling, feedback, issues, and solutions.",
        "Refined SOP for direct team during company updates/changes.",
        "Continued to train members on all processes and expectations.",
      ],
    },
  ];
  
  const testimonials = [
    {
      testimonial:
        "Projects usually go smoothly or they're a big headache.  Frank's communication and attention to detail ensured our project went smoothly. It was nice working with him.",
      name: "Alex R.",
      designation: "Graphic Artist",
      company: "Independent",
      image: "https://randomuser.me/api/portraits/men/35.jpg",
    },
    {
      testimonial:
        "Frank always does his best to take care of clients.  He is one of my favorite people to work alongside.",
      name: "Clarence M.",
      designation: "Lead Technician",
      company: "Adon Complete",
      image: "https://randomuser.me/api/portraits/men/21.jpg",
    },
    {
      testimonial:
        "I needed some help outside our normal scope of work.  When I was having trouble finding a solution, Frank took it upon himself to get involved and helped me with the ideal result.",
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
        `Web-based platform that allows users to display searched sets and pieces to the popular TCG 'Magic the Gathering.' \xa0 Real-time search results using the Scryfall API are displayed with a Custom Visualizer Display.`,
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
      live_link: "https://thefrank86.github.io/portfolio/Card_Visualizer/index.html",
    },
    {
      name: "Tech Team Up",
      description:
        "Mobile application with cross-platform code for desktop that enables users to do an advanced search for company team openings, view detailed position information, and locate available positions based on their current location.",
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
      image: teamUp,
      source_code_link: "https://github.com/TheFrank86/React-Navtive-Jobs",
      live_link: "https://thefrank86.github.io/portfolio/gameContainer/static/app.html",
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
      image: game,
      source_code_link: "https://github.com/TheFrank86/Portfolio",
      live_link: "https://thefrank86.github.io/portfolio/gameContainer/index.html",
    },
  ];
  
  export { services, technologies, experiences, testimonials, projects };