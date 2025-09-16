import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, ExternalLink, Code, Database, Globe, Cpu, Award, Users, Calendar, MapPin, Download, Menu, X } from 'lucide-react';
import * as THREE from 'three';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  // 3D Background Animation
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Create floating particles
    const geometry = new THREE.SphereGeometry(0.02, 8, 8);
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x60a5fa }),
      new THREE.MeshBasicMaterial({ color: 0x34d399 }),
      new THREE.MeshBasicMaterial({ color: 0xf59e0b }),
      new THREE.MeshBasicMaterial({ color: 0xec4899 }),
    ];

    for (let i = 0; i < 100; i++) {
      const particle = new THREE.Mesh(geometry, materials[i % materials.length]);
      particle.position.x = (Math.random() - 0.5) * 20;
      particle.position.y = (Math.random() - 0.5) * 20;
      particle.position.z = (Math.random() - 0.5) * 20;
      
      particle.userData = {
        originalY: particle.position.y,
        speed: Math.random() * 0.02 + 0.005,
        amplitude: Math.random() * 2 + 0.5,
      };
      
      scene.add(particle);
      particlesRef.current.push(particle);
    }

    camera.position.z = 10;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Animate particles
      particlesRef.current.forEach((particle, index) => {
        const time = Date.now() * 0.001;
        particle.position.y = particle.userData.originalY + Math.sin(time + index * 0.1) * particle.userData.amplitude;
        particle.rotation.x += particle.userData.speed;
        particle.rotation.y += particle.userData.speed;
        
        // Mouse interaction
        const mouseInfluence = 0.0001;
        particle.position.x += (mouseRef.current.x - particle.position.x) * mouseInfluence;
        particle.position.y += (mouseRef.current.y - particle.position.y) * mouseInfluence;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle mouse movement
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'contact'];
      const scrollY = window.scrollY;
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

    const projects = [
    {
      title: 'TestiView',
      description:
        'Testimonial Collection Platform with customizable embed code, PostgreSQL backend, and responsive display formats',
      tech: ['React', 'Node.js', 'PostgreSQL', 'JWT'],
      features: [
        '50% faster client integration',
        '25% boost in user retention',
        'Role-based access control'
      ],
      live: true,
      github: true,
      liveUrl: 'https://testiview-frontend.vercel.app/', // sample URL
      githubUrl: 'https://github.com/Vansh98789/testiview_to_deploy' // sample URL
    },
    {
      title: 'EventFlex',
      description:
        'Blockchain-based attendance payment system using Ethereum smart contracts and Chainlink oracles',
      tech: ['React', 'Solidity', 'Web3.js', 'Ethereum'],
      features: [
        'Decentralized event system',
        'Usage-based pricing',
        'Real-time attendance tracking'
      ],
      live: true,
      github: true,
      liveUrl: 'https://event-flex.vercel.app/',
      githubUrl: 'https://github.com/Vansh98789/Event-Flex'
    },
    {
      title: 'PrepSphere',
      description:
        'AI-powered interview practice tool with Google Gemini API integration and real-time analytics',
      tech: ['React', 'Express', 'Google Gemini API', 'Voice Recognition'],
      features: [
        '35% efficiency improvement',
        '60% reduction in API calls',
        'Real-time scoring'
      ],
      live: true,
      github: true,
      liveUrl: 'https://prep-sphere-frontend.vercel.app/',
      githubUrl: 'https://github.com/Vansh98789/PrepSphere'
    },
      {
  title: 'TimeVault',
  description:
    'Decentralized time capsule dApp with immutable IPFS storage and Ethereum smart contract integration',
  tech: ['React.js', 'Solidity', 'IPFS', 'Ethereum', 'Web3.js', 'MetaMask'],
  features: [
    '100% wallet-based authentication',
    '90% reduction in on-chain storage costs',
    '24/7 decentralized media access'
  ],
  live: false,
  github: true,
  liveUrl: '',
  githubUrl: 'https://github.com/Vansh98789/TimeVault'
}

  ];

  const skills = {
    "Languages": ["C++", "C", "Python", "JavaScript", "Solidity"],
    "Frontend": ["React.js", "Redux", "HTML5", "CSS3", "Material UI", "Bootstrap"],
    "Backend": ["Node.js", "Express.js", "RESTful APIs", "JWT Authentication"],
    "Database": ["PostgreSQL", "MongoDB", "SQL", "NoSQL"],
    "Blockchain": ["Smart Contracts", "Ethereum", "Web3.js", "Chainlink"],
    "Tools": ["Git", "GitHub", "VS Code", "CI/CD", "Webpack", "Agile"]
  };

  const NavItem = ({ href, children, isActive }) => (
    <a
      href={href}
      className={`px-4 py-2 rounded-lg transition-all duration-300 ${
        isActive 
          ? 'bg-blue-600 text-white shadow-lg' 
          : 'text-gray-300 hover:text-white hover:bg-gray-700'
      }`}
    >
      {children}
    </a>
  );

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* 3D Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Vansh Maheshwari
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-2">
              <NavItem href="#hero" isActive={activeSection === 'hero'}>Home</NavItem>
              <NavItem href="#about" isActive={activeSection === 'about'}>About</NavItem>
              <NavItem href="#experience" isActive={activeSection === 'experience'}>Experience</NavItem>
              <NavItem href="#projects" isActive={activeSection === 'projects'}>Projects</NavItem>
              <NavItem href="#skills" isActive={activeSection === 'skills'}>Skills</NavItem>
              <NavItem href="#contact" isActive={activeSection === 'contact'}>Contact</NavItem>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 p-4 bg-gray-800 rounded-lg">
              <div className="flex flex-col space-y-2">
                <NavItem href="#hero" isActive={activeSection === 'hero'}>Home</NavItem>
                <NavItem href="#about" isActive={activeSection === 'about'}>About</NavItem>
                <NavItem href="#experience" isActive={activeSection === 'experience'}>Experience</NavItem>
                <NavItem href="#projects" isActive={activeSection === 'projects'}>Projects</NavItem>
                <NavItem href="#skills" isActive={activeSection === 'skills'}>Skills</NavItem>
                <NavItem href="#contact" isActive={activeSection === 'contact'}>Contact</NavItem>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 animate-pulse">
              Vansh Maheshwari
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Full Stack Developer & Computer Science Student
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Experienced in building responsive, cross-browser compatible web applications using React.js, Redux, and Node.js. 
              Strong foundation in RESTful APIs, authentication & authorization, and agile development workflows.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a href="#contact" className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
              Get In Touch
            </a>
            <a href="#projects" className="border-2 border-gray-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
              View Projects
            </a>
          </div>

          <div className="flex justify-center space-x-6">
            <a href="https://github.com/Vansh98789" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
              <Github size={32} />
            </a>
            <a href="https://linkedin.com/in/vansh-maheshwari-778283257" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
              <Linkedin size={32} />
            </a>
            <a href="mailto:vanshmaheshwari2004.vm@gmail.com" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
              <Mail size={32} />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
                <div className="flex items-center mb-4">
                  <MapPin className="text-blue-400 mr-3" size={24} />
                  <h3 className="text-xl font-semibold">Education</h3>
                </div>
                <p className="text-gray-300 mb-2">B.Tech. in Computer Science and Engineering</p>
                <p className="text-gray-400">Maharaja Agrasen Institute of Technology (MAIT), Delhi</p>
                <p className="text-gray-400">CGPA: 8.5/10 | Sep 2022 – Jun 2026</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
                <div className="flex items-center mb-4">
                  <Award className="text-purple-400 mr-3" size={24} />
                  <h3 className="text-xl font-semibold">Core Values</h3>
                </div>
                <ul className="text-gray-300 space-y-2">
                  <li>• Clean and maintainable code</li>
    <li>• User-centric design and accessibility</li>
    <li>• Continuous learning and growth</li>
    <li>• Collaboration and team support</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
                <div className="flex items-center mb-4">
                  <Users className="text-green-400 mr-3" size={24} />
                  <h3 className="text-xl font-semibold">Leadership</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-300 font-medium">Technical Coordinator</p>
                    <p className="text-gray-400">Computer Society of India (CSI), MAIT</p>
                    {/*<p className="text-sm text-gray-500">Organized 3+ hackathons, 5+ workshops, 200+ students impacted</p>*/}
                  </div>
                  <div>
                    <p className="text-gray-300 font-medium">Senior Executive</p>
                    <p className="text-gray-400">Refine Consulting Society, MAIT</p>
                    {/*<p className="text-sm text-gray-500">Mentored 15+ juniors on problem-solving frameworks</p>*/}
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
                <div className="flex items-center mb-4">
                  <Code className="text-yellow-400 mr-3" size={24} />
                  <h3 className="text-xl font-semibold">Specializations</h3>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-blue-400 font-medium">Frontend</p>
                    <p className="text-gray-300">React.js, Redux</p>
                  </div>
                  <div>
                    <p className="text-green-400 font-medium">Backend</p>
                    <p className="text-gray-300">Node.js, Express</p>
                  </div>
                  <div>
                    <p className="text-purple-400 font-medium">Database</p>
                    <p className="text-gray-300">PostgreSQL, MongoDB</p>
                  </div>
                  <div>
                    <p className="text-orange-400 font-medium">Blockchain</p>
                    <p className="text-gray-300">Ethereum, Solidity</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative z-10 py-20 px-6 bg-gray-800/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Experience
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Frontend Developer Intern</h3>
                  <p className="text-xl text-blue-400 mb-2">Zerone Smart Infrastructure Pvt. Ltd.</p>
                  <p className="text-gray-400 flex items-center">
                    <MapPin size={16} className="mr-2" />
                    Delhi, India
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-300 flex items-center md:justify-end">
                    <Calendar size={16} className="mr-2" />
                    Jun 2024 – Aug 2024
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-gray-300">Developed mobile-first UI components with React.js and Redux, cutting initial load time by 20%</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-gray-300">Built reusable component library and custom hooks, reducing feature delivery cycles by 30%</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-gray-300">Integrated secure JWT-protected REST APIs with robust error handling and state management</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-gray-300">Contributed to the Zedyer project, consistently meeting Agile sprint deadlines using Git and CI/CD</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {["React.js", "Redux", "JWT", "REST APIs", "Git", "CI/CD", "Agile"].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
       <section id="projects" className="relative z-10 py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Projects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">
                    {project.title}
                  </h3>
                  <div className="flex space-x-2">
                    {project.live && project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-white transition-colors"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                    {project.github && project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <Github size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-blue-400 mb-2">
                    Key Features:
                  </h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-400 mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 py-20 px-6 bg-gray-800/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList], index) => (
              <div key={category} className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all duration-300">
                <div className="flex items-center mb-6">
                  {category === "Languages" && <Code className="text-blue-400 mr-3" size={24} />}
                  {category === "Frontend" && <Globe className="text-green-400 mr-3" size={24} />}
                  {category === "Backend" && <Database className="text-purple-400 mr-3" size={24} />}
                  {category === "Database" && <Database className="text-yellow-400 mr-3" size={24} />}
                  {category === "Blockchain" && <Cpu className="text-orange-400 mr-3" size={24} />}
                  {category === "Tools" && <Code className="text-pink-400 mr-3" size={24} />}
                  <h3 className="text-xl font-bold text-white">{category}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill) => (
                    <span key={skill} className="px-3 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm hover:bg-gray-600 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  I'm always open to discussing new opportunities, collaborations, or just having a chat about technology. Feel free to reach out!
                </p>
                
                <div className="space-y-4">
                  <a href="mailto:vanshmaheshwari2004.vm@gmail.com" className="flex items-center text-gray-300 hover:text-white transition-colors">
                    <Mail className="mr-3 text-blue-400" size={20} />
                    vanshmaheshwari2004.vm@gmail.com
                  </a>
                  <a href="tel:+919811427144" className="flex items-center text-gray-300 hover:text-white transition-colors">
                    <Phone className="mr-3 text-green-400" size={20} />
                    +91-9811427144
                  </a>
                  <a href="https://linkedin.com/in/vansh-maheshwari-778283257" className="flex items-center text-gray-300 hover:text-white transition-colors">
                    <Linkedin className="mr-3 text-blue-500" size={20} />
                    LinkedIn Profile
                  </a>
                  <a href="https://github.com/Vansh98789" className="flex items-center text-gray-300 hover:text-white transition-colors">
                    <Github className="mr-3 text-gray-400" size={20} />
                    GitHub Profile
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-400">8.5</div>
                  <div className="text-gray-400 text-sm">CGPA</div>
                </div>
                <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                  <div className="text-3xl font-bold text-green-400">10+</div>
                  <div className="text-gray-400 text-sm">Projects</div>
                </div>
                <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-400">400+</div>
                  <div className="text-gray-400 text-sm">DSA Problems Solved</div>
                </div>
                <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                  <div className="text-3xl font-bold text-yellow-400">15+</div>
                  <div className="text-gray-400 text-sm">Technologies</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 bg-gray-900 border-t border-gray-700">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-gray-400">
            © 2025 Vansh Built
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
