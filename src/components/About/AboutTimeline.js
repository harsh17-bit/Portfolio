import React from 'react';
import { Container } from 'react-bootstrap';

const timelineItems = [
  {
    title: 'Freelance Full-Stack Developer',
    subtitle: 'Logic Waves Tech',
    period: '2024 - Present',
    points: [
      'Built and shipped responsive web apps with React and Node.js.',
      'Integrated APIs and improved UX for real client workflows.',
    ],
  },
  {
    title: 'Urban-Stay Project',
    subtitle: 'Personal Product Build',
    period: '2025',
    points: [
      'Developed an accommodation booking platform end-to-end.',
      'Implemented a clean booking flow with production deployment.',
    ],
  },
  {
    title: 'Integrated Bachelors in Computer Engineering',
    subtitle: 'GEC, Bharuch',
    period: '2020 - 2025',
    points: [
      'Built strong fundamentals in software engineering and systems design.',
      'Worked on multiple practical projects across full-stack development.',
    ],
  },
];

function AboutTimeline() {
  return (
    <Container className="timeline-section">
      <h1 className="project-heading">
        <strong className="purple">Experience</strong> & Education
      </h1>

      <div className="timeline-wrapper">
        {timelineItems.map((item, index) => (
          <article key={index} className="timeline-item-card">
            <div className="timeline-dot" aria-hidden="true" />
            <div className="timeline-content">
              <h3>{item.title}</h3>
              <p className="timeline-meta">
                {item.subtitle} | {item.period}
              </p>
              <ul>
                {item.points.map((point, pointIndex) => (
                  <li key={pointIndex}>{point}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
}

export default AboutTimeline;
