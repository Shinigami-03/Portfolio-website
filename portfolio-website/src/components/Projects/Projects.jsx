import React from 'react';
import './Projects.css';
import portfolioImg from '../../assets/portfolio.png';
import dinesmartImg from '../../assets/dinesmart.png';
import ebasketImg from '../../assets/e-basket.png';
import vmaxImg from '../../assets/vmax.png';
import paddlewarsImg from '../../assets/paddlewars.png';
import stonkwatchImg from '../../assets/stonkwatch.png';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Portfolio Website',
      description: 'Personal portfolio website built with React',
      image: portfolioImg,
      github: 'https://github.com/Shinigami-03/Portfolio-website'
    },
    {
      id: 2,
      title: 'DineSmart',
      description: 'A restaurant management system',
      image: dinesmartImg,
      github: 'https://github.com/Shinigami-03/DineSmart'
    },
    {
      id: 3,
      title: 'E-Basket',
      description: 'E-commerce platform for online shopping',
      image: ebasketImg,
      github: 'https://github.com/Shinigami-03/E_Basket-1'
    },
    {
      id: 4,
      title: 'V-Max',
      description: 'Backend for the V-Max application',
      image: vmaxImg,
      github: 'https://github.com/Shinigami-03/V-Max'
    },
    {
      id: 5,
      title: 'Paddle Wars',
      description: 'A beginner level pong game in OpenGL',
      image: paddlewarsImg,
      github: 'https://github.com/Shinigami-03/paddle-wars.py/tree/master'
    },
    {
      id: 6,
      title: 'Stonk Watch',
      description: 'Flutter project for stock market tracking',
      image: stonkwatchImg,
      github: 'https://github.com/Shinigami-03/Stonk-Watch'
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                View on GitHub
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;