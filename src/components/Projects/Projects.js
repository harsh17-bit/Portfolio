import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProjectCard from './ProjectCards';
import Particle from '../Particle';
import urbanstay from '../../Assets/Projects/urbanstay.png';
import chatbot from '../../Assets/Projects/chat-bot.png';
import careerAI from '../../Assets/Projects/career-ai.png';
import {
  FaBolt,
  FaCode,
  FaGlobe,
  FaRocket,
  FaLinkedinIn,
} from 'react-icons/fa';

const showcaseStats = [
  { label: 'Visual direction', value: 'Bold + cinematic' },
  { label: 'Interaction style', value: 'Smooth motion cues' },
  { label: 'Project focus', value: 'Fast, usable builds' },
];

const spotlightCards = [
  {
    title: 'Interface rhythm',
    text: 'A strong first impression with layered sections, depth, and clear hierarchy.',
    icon: <FaCode />,
  },
  {
    title: 'Motion language',
    text: 'Subtle glow, hover lift, and animated accents to make the portfolio feel alive.',
    icon: <FaBolt />,
  },
  {
    title: 'Launch ready',
    text: 'Live project links, responsive layouts, and a design that still reads well on mobile.',
    icon: <FaRocket />,
  },
];

const socialShareLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/dte-gecbh-com-harsh-rathod/',
    icon: <FaLinkedinIn />,
  },
  {
    label: 'Contra',
    href: 'https://contra.com/',
    icon: <FaGlobe />,
  },
];

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <Row className="project-hero-shell align-items-center">
          <Col lg={6} className="project-hero-copy">
            <p className="project-eyebrow">Portfolio visual reel</p>
            <h1 className="project-hero-title">
              One reel that captures your{' '}
              <strong className="purple">whole</strong> portfolio.
            </h1>
            <p className="project-hero-text">
              This projects section now plays a real MP4 reel built from your
              portfolio assets, so LinkedIn and Contra viewers can get the full
              story in one short video before they open individual projects.
            </p>
            <div className="project-stat-grid">
              {showcaseStats.map((stat) => (
                <div key={stat.label} className="project-stat-card">
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </div>
              ))}
            </div>
            <div className="project-social-share">
              <span>Share or post this portfolio</span>
              <div className="project-social-share-links">
                {socialShareLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="project-social-share-link"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </Col>

          <Col lg={6} className="project-hero-visual">
            <div className="visual-frame">
              <div className="visual-window">
                <video
                  className="portfolio-reel-video"
                  src={`${process.env.PUBLIC_URL}/portfolio-reel.mp4`}
                  poster={`${process.env.PUBLIC_URL}/portfolio-reel-poster.png`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="visual-caption">
                A real MP4 reel exported for posting on LinkedIn and Contra.
              </div>
            </div>
          </Col>
        </Row>

        <Row className="spotlight-row">
          {spotlightCards.map((card) => (
            <Col md={4} key={card.title} className="spotlight-col">
              <div className="spotlight-card">
                <div className="spotlight-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            </Col>
          ))}
        </Row>

        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: 'white' }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: 'center', paddingBottom: '10px' }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={urbanstay}
              isBlog={false}
              title="Urban-Stay"
              description="Find stays, book fast, live.A full-stack web platform for browsing and booking comfortable, affordable accommodations with a smooth and responsive user experience."
              ghLink="https://github.com/harsh17-bit/Urban-Stay"
              demoLink="https://urban-stay-ebrp.onrender.com"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatbot}
              isBlog={false}
              title="Chat-Bot Cohere"
              description="AI-powered chatbot built using Python, LangChain, and Cohere API with a Streamlit interface. Supports real-time, context-aware conversations with memory and scalable deployment for automation and user engagement."
              ghLink="https://github.com/harsh17-bit/langchain_dev"
              demoLink="https://chatbot-cohere.streamlit.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={careerAI}
              isBlog={false}
              title="Career.AI"
              description="Career.AI is a web application that provides personalized career guidance using AI. It offers resume analysis, interview preparation, and job recommendations to help users navigate their career paths effectively."
              ghLink="https://github.com/harsh17-bit/career-ai"
              demoLink="https://career-ai-3btq.onrender.com/"
            />
          </Col>
          {/* 
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              isBlog={false}
              title="Plant AI"
              description="Used the plant disease dataset from Kaggle and trained a image classifer model using 'PyTorch' framework using CNN and Transfer Learning with 38 classes of various plant leaves. The model was successfully able to detect diseased and healthy leaves of 14 unique plants. I was able to achieve an accuracy of 98% by using Resnet34 pretrained model."
              ghLink="https://github.com/soumyajit4419/Plant_AI"
              demoLink="https://plant49-ai.herokuapp.com/"
            />
          </Col> */}

          {/* <Col md={4} className="project-card">
            <ProjectCard
              imgPath={suicide}
              isBlog={false}
              title="Ai For Social Good"
              description="Using 'Natural Launguage Processing' for the detection of suicide-related posts and user's suicide ideation in cyberspace  and thus helping in sucide prevention."
              ghLink="https://github.com/soumyajit4419/AI_For_Social_Good"
              // demoLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" <--------Please include a demo link here
            />
          </Col> */}

          {/* <Col md={4} className="project-card">
            <ProjectCard
              imgPath={emotion}
              isBlog={false}
              title="Face Recognition and Emotion Detection"
              description="Trained a CNN classifier using 'FER-2013 dataset' with Keras and tensorflow backened. The classifier sucessfully predicted the various types of emotions of human. And the highest accuracy obtained with the model was 60.1%.
              Then used Open-CV to detect the face in an image and then pass the face to the classifer to predict the emotion of a person."
              ghLink="https://github.com/soumyajit4419/Face_And_Emotion_Detection"
              // demoLink="https://blogs.soumya-jit.tech/"      <--------Please include a demo link here
            />
          </Col> */}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
