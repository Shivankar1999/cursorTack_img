"use client"


import React, { useState, useEffect } from 'react';

const ImageFollowCursor = () => {
  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [targetPosition, setTargetPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setTargetPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const updatePosition = () => {
      setPosition({
        x: position.x + (targetPosition.x - position.x) * 0.05,
        y: position.y + (targetPosition.y - position.y) * 0.05
      });
    };

    const animationFrame = requestAnimationFrame(updatePosition);

    return () => cancelAnimationFrame(animationFrame);
  }, [position, targetPosition]);

  const calculateRotation = () => {
    const dx = targetPosition.x - position.x;
    const dy = targetPosition.y - position.y;
    return Math.atan2(dy, dx) * (360 / Math.PI) + 10; // Adding 90 to adjust the initial orientation
  };

  return (
    <div className="h-screen w-full flex justify-center items-center relative" style={{ backgroundImage: "url('./bg.jpg')", backgroundSize: "cover",opacity:"0.89" }}>
     <div
     className='flex justify-center items-center'
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        transition:"img 2s ease forward",
        transform: `translate(-50%, -50%) rotate(${calculateRotation()}deg)`,
      }}
    >
      <img src="https://www.wizard.financial/static/media/wizaart-img.56787174.gif" alt="Follow Cursor Image" style={{width:"100px",height:"100px"}} />
    </div>
    </div>
    
  );
};

export default ImageFollowCursor;



