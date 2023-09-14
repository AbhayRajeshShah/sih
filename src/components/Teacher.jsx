import React, { useState } from 'react';
import './teacher.css';

// Sample data for teaching techniques with links
const teachingTechniquesData = [
  {
    id: 1,
    topic: 'Active Learning Strategies',
    content: 'Learn about various active learning techniques to engage your students in the learning process. Active learning encourages student participation and can lead to better understanding.',
    link: 'https://www.example.com/active-learning-strategies',
  },
  {
    id: 2,
    topic: 'Blended Learning Models',
    content: 'Explore the benefits of blended learning and how to integrate technology into your teaching. Blended learning combines in-person and online instruction for a more flexible approach.',
    link: 'https://www.example.com/blended-learning-models',
  },
  {
    id: 3,
    topic: 'Formative Assessment Methods',
    content: 'Discover formative assessment strategies to monitor student progress and adjust your teaching. Formative assessments help you gauge student understanding in real-time.',
    link: 'https://www.example.com/formative-assessment-methods',
  },
  {
    id: 4,
    topic: 'Flipped Classroom Approach',
    content: 'Learn about the flipped classroom approach, where students study course materials at home and engage in activities, discussions, and projects during class time. This method can enhance student engagement.',
    link: 'https://www.example.com/flipped-classroom-approach',
  },
  // Add more teaching techniques with links as needed
];

function Teacher() {
  // State to manage selected technique
  const [selectedTechnique, setSelectedTechnique] = useState(null);

  // Function to handle technique selection
  const handleTechniqueSelect = (technique) => {
    setSelectedTechnique(technique);
  };

  return (
    <div className="teacher">
      <main>
        <div className="techniques-list">
          {teachingTechniquesData.map((technique) => (
            <div key={technique.id} className="post" onClick={() => handleTechniqueSelect(technique)}>
              <h2>{technique.topic}</h2>
              <p>{technique.content}</p>
              <a href={technique.link} target="_blank" rel="noopener noreferrer">
                Learn More
              </a>
            </div>
          ))}
        </div>
        <div className="technique-details">
          {selectedTechnique && (
            <div className="post">
              <h2>{selectedTechnique.topic}</h2>
              <p>{selectedTechnique.content}</p>
              <a href={selectedTechnique.link} target="_blank" rel="noopener noreferrer">
                Learn More
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Teacher;
