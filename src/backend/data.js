import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

const db = getFirestore();
const allArtworksCollection = collection(db, "ai-art");

export const getAllArtworks = (setArtworks) => {
  let allDocuments = [];
  getDocs(allArtworksCollection)
    .then((querySnapshot) => {
      // console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        // doc.data() is the data of each document
        allDocuments.push({ id: doc.id, ...doc.data() });
      });
      setArtworks(allDocuments);
      console.log("All documents:", allDocuments);
    })
    .catch((error) => {
      console.error("Error getting documents:", error);
    });
};

export const getFantasyArtworks = (setArtworks) => {
  getDocs(allArtworksCollection)
    .then((querySnapshot) => {
      // console.log(querySnapshot);
      const fantasyDocs = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is the data of each document
        if (doc.data().type === "fantasy") {
          fantasyDocs.push({ id: doc.id, ...doc.data() });
        }
      });
      setArtworks(fantasyDocs);
      console.log("All documents:", fantasyDocs);
    })
    .catch((error) => {
      console.error("Error getting documents:", error);
    });
};

export const getSciFiArtworks = (setArtworks) => {
  getDocs(allArtworksCollection)
    .then((querySnapshot) => {
      // console.log(querySnapshot);
      const sciFiDocs = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is the data of each document
        if (doc.data().type === "SCI-FI") {
          sciFiDocs.push({ id: doc.id, ...doc.data() });
        }
      });
      setArtworks(sciFiDocs);
      console.log("All documents:", sciFiDocs);
    })
    .catch((error) => {
      console.error("Error getting documents:", error);
    });
};

export const saveArtwork = async (currentUser, artId) => {
  // Get the current user's UID
  if (currentUser) {
    const currentUserUid = currentUser.uid;

    // Create a reference to the user's document in the saved-posts collection
    const userSavedPostsRef = doc(db, "saved-posts", currentUserUid);

    try {
      // Fetch the user's document to get the current saved artwork IDs
      const userSavedPostsSnapshot = await getDoc(userSavedPostsRef);
      const userData = userSavedPostsSnapshot.data();

      if (userData && userData.savedPosts) {
        // Check if the artwork ID is already in the array
        const index = userData.savedPosts.indexOf(artId);

        if (index !== -1) {
          // If the artwork ID is found, remove it from the array
          userData.savedPosts.splice(index, 1);

          // Update the user's document with the updated saved artwork IDs
          await setDoc(userSavedPostsRef, {
            savedPosts: userData.savedPosts,
          });

          console.log("Artwork removed from saved-posts");
        } else {
          // If the artwork ID is not found, add it to the array
          userData.savedPosts.push(artId);

          // Update the user's document with the updated saved artwork IDs
          await setDoc(userSavedPostsRef, {
            savedPosts: userData.savedPosts,
          });

          console.log("Artwork added to saved-posts");
        }
      } else {
        // Create a new document for the user if it doesn't exist
        await setDoc(userSavedPostsRef, {
          savedPosts: [artId],
        });

        console.log("User's saved-posts document created with the artwork ID");
      }
    } catch (error) {
      console.error("Error updating saved-posts:", error);
    }
  }
};

export const addToLikedArtworks = async (currentUser, artId) => {
  if (currentUser) {
    // Get the current user's UID
    const currentUserUid = currentUser.uid;

    // Create a reference to the user's document in the saved-posts collection
    const userLikedArtworksRef = doc(db, "liked-artworks", currentUserUid);

    try {
      // Fetch the user's document to get the current saved artwork IDs
      const userLikedDoc = await getDoc(userLikedArtworksRef);
      const userData = userLikedDoc.data();

      if (userData && userData.likedArtworks) {
        // Check if the artwork ID is already in the array
        const index = userData.likedArtworks.indexOf(artId);

        if (index !== -1) {
          // If the artwork ID is found, remove it from the array
          userData.likedArtworks.splice(index, 1);

          // Update the user's document with the updated saved artwork IDs
          await setDoc(userLikedArtworksRef, {
            likedArtworks: userData.likedArtworks,
          });

          console.log("Artwork removed from liked-artworks");
        } else {
          // If the artwork ID is not found, add it to the array
          userData.likedArtworks.push(artId);

          // Update the user's document with the updated saved artwork IDs
          await setDoc(userLikedArtworksRef, {
            likedArtworks: userData.likedArtworks,
          });

          console.log("Artwork added to saved-posts");
        }
      } else {
        // Create a new document for the user if it doesn't exist
        await setDoc(userLikedArtworksRef, {
          likedArtworks: [artId],
        });

        console.log("User's saved-posts document created with the artwork ID");
      }
    } catch (error) {
      console.error("Error updating saved-posts:", error);
    }
  }
};

export const isArtworkSaved = async (currentUser, artId) => {
  if (currentUser) {
    // Get the current user's UID
    const currentUserUid = currentUser.uid;

    // Create a reference to the user's document in the saved-posts collection
    const userSavedPostsRef = doc(db, "saved-posts", currentUserUid);

    try {
      // Fetch the user's document to get the current savedPosts array
      const userSavedPostsSnapshot = await getDoc(userSavedPostsRef);
      const userData = userSavedPostsSnapshot.data();

      if (userData && userData.savedPosts) {
        // Check if the artwork ID exists in the savedPosts array
        return userData.savedPosts.includes(artId);
      } else {
        // User document or savedPosts array doesn't exist, so the artwork is not saved
        return false;
      }
    } catch (error) {
      console.error("Error checking if artwork is saved:", error);
      return false; // Handle the error gracefully
    }
  }
};

export const isArtworkLiked = async (currentUser, artId) => {
  if (currentUser) {
    // Get the current user's UID
    const currentUserUid = currentUser.uid;

    // Create a reference to the user's document in the saved-posts collection
    const userSavedPostsRef = doc(db, "liked-artworks", currentUserUid);

    try {
      // Fetch the user's document to get the current savedPosts array
      const userLikedSnapshot = await getDoc(userSavedPostsRef);
      const userData = userLikedSnapshot.data();

      if (userData && userData.likedArtworks) {
        // Check if the artwork ID exists in the savedPosts array
        return userData.likedArtworks.includes(artId);
      } else {
        // User document or savedPosts array doesn't exist, so the artwork is not saved
        return false;
      }
    } catch (error) {
      console.error("Error checking if artwork is saved:", error);
      return false; // Handle the error gracefully
    }
  }
};

const fetchPhotoData = async (photoId) => {
  const photoRef = doc(db, "ai-art", photoId);
  const photoDoc = await getDoc(photoRef);
  return { id: photoDoc.id, ...photoDoc.data() };
};

export const getSavedArtworks = async (currentUser, setSavedPosts) => {
  if (currentUser) {
    // Get the current user's UID
    const currentUserUid = currentUser.uid;

    // Create a reference to the user's document in the saved-posts collection
    const userSavedPostsRef = doc(db, "saved-posts", currentUserUid);

    try {
      // Fetch the user's document to get the current favorite photo IDs
      const userSavedPostsSnapshot = await getDoc(userSavedPostsRef);
      const userData = userSavedPostsSnapshot.data();

      if (userData && userData.savedPosts) {
        // Get the actual data for each favorite photo ID
        const savedPosts = await Promise.all(
          userData.savedPosts.map((photoId) => fetchPhotoData(photoId))
        );
        setSavedPosts(savedPosts);
      }
    } catch (error) {
      console.error("Error fetching favorite photos:", error);
    }
  }
};

export const getArtworkDetails = async (id, setArtworkDetail) => {
  const documentRef = doc(db, "ai-art", id);
  try {
    const documentSnapshot = await getDoc(documentRef);

    if (documentSnapshot.exists()) {
      // The document exists
      const documentData = documentSnapshot.data();
      setArtworkDetail(documentData);
      console.log("Document data:", documentData);
    } else {
      console.log("Document does not exist.");
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
};
