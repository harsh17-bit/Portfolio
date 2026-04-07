import React from 'react';
import GitHubCalendar from 'react-github-calendar';
import { Row } from 'react-bootstrap';

function Github() {
  return (
    <Row
      style={{
        justifyContent: 'center',
        paddingBottom: '10px',
        color: 'white',
      }}
    >
      <h1 className="project-heading pb-4" style={{ paddingBottom: '20px' }}>
        Days Push Code On <strong className="purple">Github</strong>
      </h1>
      <GitHubCalendar
        username="harsh17-bit"
        blockSize={30}
        blockMargin={10}
        color="#c084f5"
        fontSize={20}
      />
    </Row>
  );
}

export default Github;
