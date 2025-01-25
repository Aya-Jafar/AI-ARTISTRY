
/**
 * @description
 * Defines the base transition properties for animations.
 */
export const transition = { type: "spring", duration: 0.8 };


/**
 * @function slideAnimation
 * @description
 * Creates an animation configuration for sliding elements in or out based on the direction.
 * Supports four directions: left, right, up, and down.
 * @param {string} direction - The direction in which the element will slide. Options: "left", "right", "up", "down".
 * @returns {Object} Animation configuration object for slide transitions.
 */

export const slideAnimation = (direction) => {
  return {
    initial: {
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
      transition: { ...transition, delay: 0.5 },
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { ...transition, delay: 0 },
    },
    exit: {
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      transition: { ...transition, delay: 0 },
    },
  };
};

/**
 * @description
 * Defines an animation for fading elements in and out.
 */
export const fadeAnimation = {
  initial: {
    opacity: 0,
    transition: { ...transition, delay: 0.5 },
  },
  animate: {
    opacity: 1,
    transition: { ...transition, delay: 0 },
  },
  exit: {
    opacity: 0,
    transition: { ...transition, delay: 0 },
  },
};


/**
 * @description
 * Defines the animation for header text, animating it from right to left with opacity change.
 */
export const headTextAnimation = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: {
    type: "spring",
    damping: 5,
    stiffness: 40,
    restDelta: 0.001,
    duration: 0.3,
  },
};


/**
 * @description
 * Defines the animation for header content, animating it from bottom to top with opacity change.
 */
export const headContentAnimation = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: {
    type: "spring",
    damping: 7,
    stiffness: 30,
    restDelta: 0.001,
    duration: 0.6,
    delay: 0.2,
    delayChildren: 0.2,
  },
};

/**
 * @description
 * Defines the animation for the header container, animating it from left to right with opacity change.
 */
export const headContainerAnimation = {
  initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
  animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
  exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } },
};


/**
 * @description
 * Defines the animation for popup visibility, transitioning the popup from the bottom of the viewport.
 */
export const popupVariants = {
  hidden: {
    y: "100%", // Start the popup below the viewport
    opacity: 0,
    transition: {
      duration: 0.5, // Slower animation
      type: "spring", // Transition type
      damping: 20, // Adjust damping and stiffness for the desired effect
      stiffness: 200,
    },
  },
  visible: {
    y: "0%", // Bring the popup to its original position
    opacity: 1,
    transition: {
      duration: 0.01, // Slower animation
      type: "spring", // Transition type
      damping: 20, // Adjust damping and stiffness for the desired effect
      stiffness: 200,
    },
  },
};

/**
 * @description
 * Defines the animation for fade-in effect, transitioning the opacity and vertical position.
 */
export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

/**
 * @description
 * Defines a scale effect when hovering over an element.
 */
export const scaleOnHover = {
  scale: 1.1,
  transition: { duration: 0.3 },
};


/**
 * @description
 * Defines the stagger effect for animating multiple children elements.
 */

export const stagger = {
  visible: { transition: { staggerChildren: 0.4 } },
};

/**
 * @description
 * Defines the animation for text elements, transitioning opacity and vertical position.
 */
export const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};


/**
 * @function handleMouseMove
 * @description
 * Handles mouse movement over an element to apply a 3D tilt effect based on the mouse position.
 * @param {MouseEvent} e - The mouse event.
 * @param {string} id - The id of the target element.
 */
export const handleMouseMove = (e, id) => {
  const { clientX, clientY } = e;
  const card = document.getElementById(id);
  const { left, top, width, height } = card.getBoundingClientRect();
  const mouseX = clientX - left;
  const mouseY = clientY - top;
  const rotationX = 5 - (10 * mouseY) / height;
  const rotationY = (10 * mouseX) / width - 5;
  card.style.transform = `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
};



/**
 * @function handleMouseLeave
 * @description
 * Resets the 3D tilt effect when the mouse leaves the element.
 * @param {MouseEvent} e - The mouse event.
 * @param {string} id - The id of the target element.
 */
export const handleMouseLeave = (e, id) => {
  const card = document.getElementById(id);
  card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
};
