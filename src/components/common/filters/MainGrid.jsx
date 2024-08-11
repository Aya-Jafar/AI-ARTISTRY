import React, { useEffect, useState, useRef } from "react";
import { getAllArtworks } from "../../../backend/data";
import ArtGrid from "../ArtGrid";
import ButtonWithIcon from "../ButtonWithIcon";
import { Link } from "react-router-dom";

function MainArtGrid({ isHomePage }) {
  const [artworks, setArtworks] = useState([]);
  const [allArtworksLoaded, setAllArtworksLoaded] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8; // Adjust the limit as needed

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

  useEffect(() => {
    if (!allArtworksLoaded) {
      fetchArtworks(currentPage);
    }
  }, [currentPage, allArtworksLoaded]);

  
  const handleIntersection = (entries) => {
    const intersectionEntry = entries[0];
    if (intersectionEntry.isIntersecting && !allArtworksLoaded) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const intersectionRef = useRef(null); // Initialize with null

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
              <ButtonWithIcon icon={"/noun-generate-6053204.png"} text="Generate" />
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

          {!allArtworksLoaded && <div ref={intersectionRef} ></div>}
          <br />
          
        </>
      )}
    </>
  );
}

export default MainArtGrid;
