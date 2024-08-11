import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


export default function ImageSlider(props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const slides = [firstCover, secondCover, thirdCover];

  const slides = [
    "/cover.png",
    "/2.png",
    "/Untitled design (16).png",
  ];

  //   const slideInterval = 5000; // Time between slides in milliseconds

  const slideIntervals = [3000, 9000, 9000];

  useEffect(() => {
    // Automatically advance to the next slide at a specified interval
    const interval = setInterval(goToNext, slideIntervals[currentIndex]);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="slider-container">
      <Carousel
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        selectedItem={currentIndex}
        transitionTime={9000}
        swipeable={true}
        className="carousel"
        showIndicators={false}
        // stopOnHover={true}
      >
        {slides.map((item, index) => (
          <div key={index}>
            <img src={item} className="slide" alt={`Slide ${index}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
