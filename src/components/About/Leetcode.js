import React from 'react';
import { Row } from 'react-bootstrap';

function Leetcode() {
  return (
    <Row
      style={{
        justifyContent: 'center',
        paddingBottom: '10px',
        color: 'white',
      }}
    >
      <h1 className="project-heading pb-4" style={{ paddingBottom: '20px' }}>
        LeetCode <strong className="purple">Streak</strong>
      </h1>
      <a
        href="https://leetcode.com/u/harsh-17bit/"
        target="_blank"
        rel="noreferrer"
        style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
      >
        <img
          src="https://leetcard.jacoblin.cool/harsh-17bit?theme=dark&font=Baloo_2&ext=heatmap"
          alt="LeetCode stats and streaks for harsh-17bit"
          style={{ width: '100%', maxWidth: '500px' }}
        />
      </a>
    </Row>
  );
}

export default Leetcode;
