import React, { FunctionComponent, useCallback } from 'react';
import Particles from 'react-tsparticles';
import type { Engine } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';
import { ISourceOptions } from 'tsparticles-engine';

const particleOptions: ISourceOptions = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 700,
      },
    },
    color: {
      value: '#FFFFFF',
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 8,
        color: '#38bdf8',
        opacity: 0.2,
      },
      polygon: {
        nb_sides: 5,
      },
    },
    opacity: {
      value: 0.6,
      random: false,
      anim: {
        enable: false,
        speed: 0.1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
    },
    line_linked: {
      enable: true,
      distance: 80,
      color: '#FFFFFF',
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: 'bottom-right',
      random: true,
      straight: true,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'grab',
      },
      onclick: {
        enable: true,
        mode: 'push',
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 100,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        duration: 4,
        opacity: 0.8,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
        quantity: 1,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  background: {
    color: {
      value: '#0284c7',
    },
    opacity: 0,
  },
  retina_detect: true,
};
const LoginParticleBackground: FunctionComponent = ({}) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      options={particleOptions}
      id="tsparticles"
      init={particlesInit}
    />
  );
};
export default LoginParticleBackground;
