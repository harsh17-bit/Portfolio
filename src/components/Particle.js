import React from 'react';

function Particle() {
  return (
    <div
      id="tsparticles"
      aria-hidden="true"
      style={{
        backgroundImage:
          'radial-gradient(circle at 20% 20%, rgba(199,112,240,0.18) 0, transparent 26%), radial-gradient(circle at 80% 30%, rgba(126,87,194,0.14) 0, transparent 24%), radial-gradient(circle at 50% 80%, rgba(255,255,255,0.06) 0, transparent 22%)',
        pointerEvents: 'none',
      }}
    />
  );
}

export default Particle;
