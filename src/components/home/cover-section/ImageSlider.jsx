import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { SLIDES, SLIDES_INTERVALS } from "../../../utils/constants";

/**
 * @component
 * @description
 * The `ImageSlider` component is a responsive carousel slider that displays images in a slideshow format.
 * - Uses the `react-responsive-carousel` library to display slides with smooth transitions.
 * - Automatically advances to the next slide at intervals specified in `SLIDES_INTERVALS` from the `constants` file.
 * - The slider supports swipe gestures and can be customized to show or hide arrows, indicators, and status.
 *
 * @example
 * // Renders the image slider with automatically advancing slides
 * <ImageSlider />
 */
export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  /**
   * @description
   * The `useEffect` hook automatically advances the carousel to the next slide at a specified interval.
   * - Uses the `currentIndex` state to determine the interval time for slide transitions.
   * - Clears the interval on unmount to prevent memory leaks.
   *
   * @dependency - `currentIndex` is used as a dependency to ensure the interval is reset whenever the slide changes.
   */
  useEffect(() => {
    // Automatically advance to the next slide at a specified interval
    const interval = setInterval(goToNext, SLIDES_INTERVALS[currentIndex]);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [currentIndex]);

  /**
   * @description
   * Advances the carousel to the next slide.
   * - If the current slide is the last one, it loops back to the first slide.
   */
  const goToNext = () => {
    const isLastSlide = currentIndex === SLIDES.length - 1;
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
        {SLIDES.map((item, index) => (
          <div key={index}>
            <img
              fetchPriority="high"
              src={item}
              className="slide"
              alt={`Slide ${index}`}
              loading="lazy"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
