
// CardComponent.jsx
import React from 'react';
import '../assets/css/cardcomponent.css';
const CardComponent = ({ title, content }) => {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <p className="title">{title}</p>
          <p>{content}</p>
        </div>
        <div className="flip-card-back">
          <p className="title">BACK</p>
          <p>Leave Me</p>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
