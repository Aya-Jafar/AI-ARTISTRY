import React, { useEffect, useState, useRef } from "react";
import { getAllArtworks } from "../../../backend/data";
import ArtGrid from "../ArtGrid";
import ButtonWithIcon from "../ButtonWithIcon";
import { Link } from "react-router-dom";

/**
 * @description
 * The `MainArtGrid` component displays a grid of artworks with infinite scrolling functionality.
 * - It uses the `getAllArtworks` function to fetch artwork data in pages and renders them in a grid format.
 * - The component handles infinite scrolling by detecting when the user reaches the bottom of the page, triggering a new fetch for more artworks.
 * - If the `isHomePage` prop is true, additional buttons are displayed for generating new artworks and viewing more artworks.
 *
 * @component
 * @example
 * <MainArtGrid isHomePage={true} />
 */
function MainArtGrid({ isHomePage }) {
  const [artworks, setArtworks] = useState([]);
  const [allArtworksLoaded, setAllArtworksLoaded] = useState(false);
  const intersectionRef = useRef(null); // Initialize with null
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8; // Adjust the limit as needed

  /**
   * @function fetchArtworks
   * @description
   * Fetches artworks based on the current page and updates the state.
   * - If there are no new artworks, it sets the `allArtworksLoaded` flag to true.
   *
   * @param {number} page - The current page number to fetch artworks for.
   */
  const fetchArtworks = (page) => {
    getAllArtworks(
      (newArtworks) => {
        if (newArtworks.length === 0) {
          // If there are no new artworks, all artworks are loaded
          setAllArtworksLoaded(true);
        } else {
          setArtworks([...newArtworks]); // Clear the old artworks and replace them with new ones
        }
      },
      limit * page,
      isHomePage
    );
  };

  /**
   * @function handleIntersection
   * @description
   * Handles the intersection observer callback to detect when the user scrolls to the bottom of the page.
   * - If the bottom of the page is reached, it loads the next page of artworks.
   *
   * @param {IntersectionObserverEntry[]} entries - The list of intersection entries.
   */
  const handleIntersection = (entries) => {
    const intersectionEntry = entries[0];
    if (intersectionEntry.isIntersecting && !allArtworksLoaded) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  /**
   * @description
   * The `useEffect` hook that fetches artworks when the `currentPage` or `allArtworksLoaded` state changes.
   * - Calls the `fetchArtworks` function to load artworks for the current page.
   * - The hook ensures that artworks are only fetched once when the page number changes or when all artworks are loaded.
   *
   * @dependency currentPage - Triggers the effect when the page number changes.
   * @dependency allArtworksLoaded - Triggers the effect when the flag indicating whether all artworks are loaded changes.
   */
  useEffect(() => {
    if (!allArtworksLoaded) {
      fetchArtworks(currentPage);
    }
  }, [currentPage, allArtworksLoaded]);

  /**
   * @description
   * The `useEffect` hook that sets up the Intersection Observer to detect when the user scrolls to the bottom of the page.
   * - Observes the `intersectionRef` element, and when it comes into view (i.e., when the user reaches the bottom), it triggers the loading of more artworks by updating the `currentPage`.
   * - Cleans up the observer when the component unmounts or when the observer no longer needs to be active (i.e., when all artworks are loaded).
   *
   * @dependency allArtworksLoaded - The observer is set up only if `allArtworksLoaded` is false. It unobserves when all artworks are loaded.
   */
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleIntersection, options);
    if (intersectionRef.current && !allArtworksLoaded) {
      observer.observe(intersectionRef.current);
    }

    return () => {
      if (intersectionRef.current) {
        observer.unobserve(intersectionRef.current);
      }
    };
  }, [allArtworksLoaded]);

  return (
    <>
      {isHomePage ? (
        <>
          <div id="art-grid-section">
            {artworks && <ArtGrid artworks={artworks} label="home" />}
          </div>
          <div className="art-grid-btns">
            <Link to="/imagine">
              <ButtonWithIcon
                icon={"/noun-generate-6053204.png"}
                text="Generate"
              />
            </Link>
            <Link to="/artworks/more/">
              <ButtonWithIcon icon={"/maximize.png"} text="More" />
            </Link>
          </div>
        </>
      ) : (
        <>
          <div id="art-grid-section">
            {artworks && <ArtGrid artworks={artworks} label="home" />}
          </div>
          <br />
          <br />

          {!allArtworksLoaded && <div ref={intersectionRef}></div>}
          <br />
        </>
      )}
    </>
  );
}

export default MainArtGrid;
