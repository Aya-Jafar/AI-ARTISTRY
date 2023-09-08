
// ArtworkDetail.js
import React from "react";
import { useParams } from "react-router-dom";

const ArtworkDetail = () => {
  const { id } = useParams();

  // Fetch the artwork details using the "id" parameter
  // Display the details in this component

  return (
    <div>
      {/* Display artwork details here */}
      <h2>Artwork Details</h2>
      <p>Artwork ID: {id}</p>
      {/* Display other artwork details */}
    </div>
  );
};

export default ArtworkDetail;
