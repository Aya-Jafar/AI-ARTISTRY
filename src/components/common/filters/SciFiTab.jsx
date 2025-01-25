import React, { useContext, useEffect, useState } from "react";
import { getSciFiArtworks, saveArtwork } from "../../../backend/data";
import ArtGrid from "../ArtGrid";


/**
 * @component
 * @description
 * `MainArtGrid` is a React component that fetches and displays a list of Sci-Fi artworks in a grid.
 * - The component fetches a set number of Sci-Fi artworks using the `getSciFiArtworks` function from the backend.
 * - It stores the fetched artworks in the `scifiArtworks` state, which is then passed to the `ArtGrid` component to render the artwork.
 *
 * @example
 * // Renders the Sci-Fi artworks grid
 * <MainArtGrid />
 */
function MainArtGrid() {
  const [scifiArtworks, setSciFiArtworks] = useState([]);

  /**
   * @description
   * The `useEffect` hook that fetches Sci-Fi artworks when the component mounts.
   * - Calls `getSciFiArtworks` to fetch a list of Sci-Fi artworks and updates the `scifiArtworks` state.
   * - This effect runs once when the component is mounted (due to the empty dependency array).
   *
   * @dependency - The empty dependency array `[]` ensures this effect runs only once after the initial render, similar to `componentDidMount`.
   */
  useEffect(() => {
    getSciFiArtworks(setSciFiArtworks, 10);
  }, []);

  return (
    <div id="art-grid-section">
      {scifiArtworks && <ArtGrid artworks={scifiArtworks} />}
    </div>
  );
}

export default MainArtGrid;
