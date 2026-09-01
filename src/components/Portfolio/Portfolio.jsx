import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import BorderGlow from '../BorderGlow/BorderGlow';
import { useReveal } from '../../hooks/useReveal';
import './Portfolio.css';
import {
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaGitAlt,
  FaFigma,
  FaPython,
  FaBootstrap
} from 'react-icons/fa';

// Project previews from /public/project
const PROJECTS = [
  {
    id: 1,
    title: 'UI/UX HoloHealth',
    description:
      'An online platform designed to introduce and promote digital health services with a modern and accessible interface for users.',
    previewImage: '/project/project 1-holohealth.png',
    problem:
      'Get personalized health insights with our AI-powered assistant, without compromising your privacy. Your medical data stays in your hands, securely stored on your own private blockchain. Our team is here to support your journey to better health.',
    about:
      'Our AI securely analyzes your health data stored on your private blockchain to generate personalized insights and recommendations. You stay in full control of your data while receiving real-time guidance to support your health journey.',
  },
  {
    id: 3,
    title: 'Front End & UI/UX Sistem Satu Data Mahasiswa',
    description:
      'A web-based information system designed to manage and organize data efficiently for administrative needs.',
    previewImage: '/project/project 3-sisadam.png',
    problem:
      'Student data was managed across different systems and processes, making it difficult to access, update, and maintain consistent information. This fragmented data management could lead to inefficiencies and make it harder for administrators and students to access accurate information.',
    about:
      'The One Student Data System was developed to centralize and organize student information within a single integrated platform. The project aimed to simplify data management, improve accessibility, and provide a more efficient way to manage student information for academic and administrative needs.',
  },
  {
    id: 4,
    title: 'Frontend & UI/UX Kllinik Pratama UIN',
    description:
      'A clinic management platform built to streamline patient registration, scheduling, and medical record handling.',
    previewImage: '/project/project 4-kllinik.png',
    problem:
      'Patients often had limited access to information about clinic services, schedules, and available healthcare facilities. The lack of a centralized online platform made it less convenient for patients to find the information they needed before visiting the clinic.',
    about:
      'The Klinik Pratama UIN website was developed as a digital platform to provide accessible information about healthcare services, clinic schedules, facilities, and other essential information. The website aims to improve the patient experience by making clinic information easier to find and access online.',
  },
  {
    id: 5,
    title: 'Portofolio',
    description:
      'A personal portfolio website showcasing projects, skills, and professional journey in a clean and modern design.',
    previewImage: '/project/project 5-portofolio.png',
    problem:
      'Presenting projects, skills, and experiences across different platforms can make it difficult to showcase a professional profile in a clear and engaging way. A centralized portfolio was needed to bring these elements together in one accessible and visually appealing platform.',
    about:
      'This personal portfolio website was developed to showcase my projects, technical skills, experiences, and achievements in one place. It is designed to provide a clear overview of my capabilities while creating an engaging and interactive experience for visitors.',
  },
  {
    id: 6,
    title: 'Computer Vision model For Pothole Detection',
    description:
      'A computer vision project exploring image processing and object detection using modern machine learning techniques.',
    previewImage: '/project/project 6-computer vision.png',
    problem:
      'Potholes are a common road damage problem that can affect driving safety and road conditions. Manual inspection of road damage can be time-consuming and may not provide consistent results, creating a need for an automated approach to identify potholes efficiently from road images.',
    about:
      'This Computer Vision project focuses on developing an automated pothole detection system using RF-DETR. The model is trained to identify potholes from road images and evaluate its ability to detect irregularly shaped road damage across different visual conditions, supporting more efficient and consistent road inspection.',
  },
  {
    id: 7,
    title: 'Android App',
    description:
      'A native Android application designed to provide a smooth mobile experience with intuitive navigation and modern UI.',
    previewImage: '/project/project 7-android.png',
    problem:
      'People often forget to bring important items when leaving home, traveling, or attending activities. Unlike a typical to-do list, there was a need for a simple reminder system specifically focused on checking and managing personal belongings before leaving.',
    about:
      'This Android application was designed to help users remember and manage the items they need to bring for different activities or situations. Users can create and check item lists before leaving, making it easier to keep track of essential belongings and reduce the chance of forgetting important items.',
  },
];

const CERTIFICATES = [
  { id: 1, title: 'Belajar Dasar Cloud dan Gen AI', src: '/sertifikat/aws dan gen ai.png' },
  { id: 2, title: 'Memulai Dasar Pemrograman', src: '/sertifikat/dasar pemrograman.png' },
  { id: 3, title: 'Pengenalan Logika Pemrograman', src: '/sertifikat/logic 101.png' },
  { id: 4, title: 'Memulai Pemrograman Dengan Java', src: '/sertifikat/pbo.png' },
  { id: 5, title: 'Juara 3 UI/UX Competition', src: '/sertifikat/juara 3 ui ux.png' },
  { id: 6, title: 'Silver Medal IICyMS', src: '/sertifikat/sertifikat iicyms.png' },
  { id: 7, title: 'Learning for Data Visualization', src: '/sertifikat/sertifikat latihan data visualisasi.png' },
  { id: 8, title: 'Specialist Data Visualization', src: '/sertifikat/sertifikat data visualisasi.png' },
  { id: 9, title: 'CCNA:Introducing to Network', src: '/sertifikat/ccna.png' },
  { id: 10, title: 'Partner NDG Linux Essentials', src: '/sertifikat/ndg linux.png' },
  { id: 11, title: 'Oracle Database Design', src: '/sertifikat/databasse design.png' },
 

];

const TECH_STACK = [
  { name: 'React', icon: FaReact },
  { name: 'JavaScript', icon: FaJs },
  { name: 'HTML5', icon: FaHtml5 },
  { name: 'CSS3', icon: FaCss3Alt },
  { name: 'Node.js', icon: FaNodeJs },
  { name: 'Git', icon: FaGitAlt },
  { name: 'Figma', icon: FaFigma },
  { name: 'Python', icon: FaPython },
  { name: 'Boothstrap', icon: FaBootstrap },
];

const TABS = [
  { id: 'projects', label: 'Projects', icon: '<>' },
  { id: 'certificates', label: 'Certificates', icon: '📜' },
  { id: 'techstack', label: 'Tech Stack', icon: '⚙️' },
];

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const setRef = useReveal('is-visible', 0.1, '0px 0px -5% 0px');

  return (
    <section id="portfolio" className="portfolio">
      <div className="portfolio__inner">
        <div className="portfolio__header fade-up" ref={setRef(0)}>
          <h2 className="portfolio__title">Portofolio</h2>
          <p className="portfolio__subtitle">
            A collection of projects, experiences, and skills that reflect my journey in technology,
            <br />
            from frontend development and AI to creative design.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="portfolio__tabs fade-up delay-1" ref={setRef(1)}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`portfolio__tab ${activeTab === tab.id ? 'portfolio__tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="portfolio__tab-icon">
                {tab.id === 'projects' && (
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                )}
                {tab.id === 'certificates' && (
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )}
                {tab.id === 'techstack' && (
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                )}
              </span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="portfolio__content reveal-tab" key="projects-content">
            <div className="portfolio__grid">
              {PROJECTS.map((project) => (
                <BorderGlow
                  key={project.id}
                  className="project-card"
                  backgroundColor="#0d0d1a"
                  borderRadius={12}
                  glowColor="220 80 70"
                  glowRadius={35}
                  glowIntensity={1.2}
                  colors={['#3b82f6', '#6366f1', '#8b5cf6']}
                  edgeSensitivity={25}
                >
                <div className="project-card__thumb">
                  <img
                    className="project-card__img"
                    src={project.previewImage}
                    alt={project.title}
                    loading="lazy"
                  />
                </div>
                <div className="project-card__body">
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__desc">{project.description}</p>
                  <button className="project-card__link" onClick={() => setSelectedProject(project)}>
                    Details &rarr;
                  </button>
                </div>
              </BorderGlow>
            ))}
            </div>
          </div>
        )}

        {/* Certificates Tab */}
        {activeTab === 'certificates' && (
          <div className="portfolio__content reveal-tab" key="certificates-content">
            <div className="portfolio__certs">
              {CERTIFICATES.map((cert) => (
                <BorderGlow
                  key={cert.id}
                  className="cert-card"
                  backgroundColor="#0d0d1a"
                  borderRadius={10}
                  glowColor="220 80 70"
                  glowRadius={30}
                  glowIntensity={1.1}
                  colors={['#3b82f6', '#6366f1', '#8b5cf6']}
                  edgeSensitivity={20}
                >
                  <button
                    type="button"
                    className="cert-card__btn"
                    onClick={() => setSelectedCert(cert)}
                    aria-label={`Lihat sertifikat ${cert.title}`}
                  >
                    <img
                      className="cert-card__img"
                      src={cert.src}
                      alt={cert.title}
                      loading="lazy"
                    />
                    <div className="cert-card__overlay">
                      <span className="cert-card__title">{cert.title}</span>
                      <span className="cert-card__hint">Klik untuk perbesar</span>
                    </div>
                  </button>
                </BorderGlow>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Tab */}
        {activeTab === 'techstack' && (
          <div className="portfolio__content reveal-tab" key="techstack-content">
            <div className="portfolio__tech">
              {TECH_STACK.map((tech) => {
                const Icon = tech.icon;

                return (
                  <BorderGlow
                    key={tech.name}
                    className="tech-card"
                    backgroundColor="#0d0d1a"
                    borderRadius={30}
                    glowColor="220 80 70"
                    glowRadius={30}
                    glowIntensity={1.1}
                    colors={['#3b82f6', '#6366f1', '#8b5cf6']}
                    edgeSensitivity={10}
                  >
                    <div className="tech-card__content">
                      <span className="tech-card__icon">
                        <Icon />
                      </span>

                      <span className="tech-card__name">
                        {tech.name}
                      </span>
                    </div>
                  </BorderGlow>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="project-modal__box"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="project-modal__close" onClick={() => setSelectedProject(null)}>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>

              <div className="project-modal__header">
                <img className="project-modal__img" src={selectedProject.previewImage} alt={selectedProject.title} />
                <div className="project-modal__header-overlay" />
                <h3 className="project-modal__title">{selectedProject.title}</h3>
              </div>

              <div className="project-modal__body">
                <div className="project-modal__section">
                  <h4 className="project-modal__section-heading">Problem</h4>
                  <p className="project-modal__text">{selectedProject.problem}</p>
                </div>

                <div className="project-modal__section">
                  <h4 className="project-modal__section-heading">Tentang Project</h4>
                  <p className="project-modal__text">{selectedProject.about}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate lightbox */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="cert-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <button
              type="button"
              className="cert-lightbox__close"
              onClick={() => setSelectedCert(null)}
              aria-label="Tutup"
            >
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <motion.div
              className="cert-lightbox__box"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                className="cert-lightbox__img"
                src={selectedCert.src}
                alt={selectedCert.title}
              />
              <div className="cert-lightbox__caption">{selectedCert.title}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
