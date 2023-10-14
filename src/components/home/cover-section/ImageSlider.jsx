import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import firstCover from "../../../images/cover.png";
import secondCover from '../../../images/2.png'
import thirdCover from '../../../images/Untitled design (16).png'

export default function ImageSlider(props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [firstCover, secondCover, thirdCover];
  const slideInterval = 7000; // Time between slides in milliseconds

  useEffect(() => {
    // Automatically advance to the next slide at a specified interval
    const interval = setInterval(goToNext, slideInterval);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

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
