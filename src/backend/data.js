import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  increment,
  serverTimestamp,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

import db from "./firebaseConfig";

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
  // Create a query against the collection.
  // const fantasyArtwork = query(
  //   allArtworksCollection,
  //   where("type", "==", "fantasy")
  // );

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

export const saveGeneratedImage = async (
  currentUser,
  generatedImageUrl,
  prompt
) => {
  // Get the current user's UID
  if (currentUser) {
    const currentUserUid = currentUser.uid;

    // Create a reference to the user's document in the saved-images collection
    const userSavedImagesRef = doc(db, "saved-posts", currentUserUid);

    try {
      // Fetch the user's document to get the current saved image data
      const userSavedImagesSnapshot = await getDoc(userSavedImagesRef);
      const userData = userSavedImagesSnapshot.data();

      // Create an object to store the image URL and prompt
      const imageData = { generatedImageUrl, prompt };

      if (userData && userData.savedPosts) {
        // Check if the image data is already in the array
        const index = userData.savedPosts.findIndex(
          (data) => data.generatedImageUrl === generatedImageUrl
        );

        if (index !== -1) {
          // If the image data is found, remove it from the array
          userData.savedPosts.splice(index, 1);

          // Update the user's document with the updated saved image data
          await setDoc(userSavedImagesRef, {
            savedPosts: userData.savedPosts,
          });

          console.log("Image removed from saved-images");
        } else {
          // If the image data is not found, add it to the array
          userData.savedPosts.push(imageData);

          // Update the user's document with the updated saved image data
          await setDoc(userSavedImagesRef, {
            savedPosts: userData.savedPosts,
          });

          console.log("Image added to saved-images");
        }
      } else {
        // Create a new document for the user if it doesn't exist
        await setDoc(userSavedImagesRef, {
          savedPosts: [imageData],
        });

        console.log("User's saved-images document created with the image data");
      }
    } catch (error) {
      console.error("Error updating saved-images:", error);
    }
  }
};

export const addToLikedArtworks = async (currentUser, artId) => {
  if (currentUser) {
    // Get the current user's UID
    const currentUserUid = currentUser.uid;

    // Create a reference to the user's document in the saved-posts collection
    const userLikedArtworksRef = doc(db, "liked-artworks", currentUserUid);

    // access the current artwork to increase or decrease the likes count
    const artworkRef = doc(db, "ai-art", artId);

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
          if (userData.likedArtworks !== 0) {
            await updateDoc(artworkRef, {
              likesCount: increment(-1), // Decrease likesCount by 1
            });
          }
          console.log("Artwork removed from liked-artworks");
        } else {
          // If the artwork ID is not found, add it to the array
          userData.likedArtworks.push(artId);

          // Update the user's document with the updated saved artwork IDs
          await setDoc(userLikedArtworksRef, {
            likedArtworks: userData.likedArtworks,
          });
          await updateDoc(artworkRef, {
            likesCount: increment(1), // Increment likesCount by 1
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
      // Fetch the user's document to get the current saved artwork data
      const userSavedPostsSnapshot = await getDoc(userSavedPostsRef);
      const userData = userSavedPostsSnapshot.data();

      if (userData && userData.savedPosts) {
        const blobUrls = userData.savedPosts.filter(
          (data) => typeof data === "object"
        );
        const nonBlobData = userData.savedPosts.filter(
          (data) => typeof data === "string"
        );

        const fetchedData = await Promise.all(
          nonBlobData.map((photoId) => fetchPhotoData(photoId))
        );

        const updatedSavedPosts = [...blobUrls, ...fetchedData];

        setSavedPosts(updatedSavedPosts);
      }
    } catch (error) {
      console.error("Error fetching saved artworks:", error);
    }
  }
};

export const getLikedArtworks = async (currentUser, setLikedArtworks) => {
  if (currentUser) {
    // Get the current user's UID
    const currentUserUid = currentUser.uid;

    // Create a reference to the user's document in the saved-posts collection
    const userSavedPostsRef = doc(db, "liked-artworks", currentUserUid);

    try {
      // Fetch the user's document to get the current favorite photo IDs
      const userSavedPostsSnapshot = await getDoc(userSavedPostsRef);
      const userData = userSavedPostsSnapshot.data();

      if (userData && userData.likedArtworks) {
        // Get the actual data for each favorite photo ID
        const likedArtworks = await Promise.all(
          userData.likedArtworks.map((photoId) => fetchPhotoData(photoId))
        );
        setLikedArtworks(likedArtworks);
      }
    } catch (error) {
      console.error("Error fetching favorite photos:", error);
    }
  }
};

export const getArtworkDetails = async (
  id,
  setArtworkDetail,
  setLikesCount,
  setCommentsCount,
  setAllComments
) => {
  const documentRef = doc(db, "ai-art", id);
  try {
    const documentSnapshot = await getDoc(documentRef);

    if (documentSnapshot.exists()) {
      // The document exists
      const documentData = documentSnapshot.data();
      setArtworkDetail(documentData);
      setLikesCount(documentData.likesCount);
      // setCommentsCount(documentData.comments.length);
      // Fetch comments from the subcollection
      const commentsQuery = query(collection(documentRef, "comments"));
      const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
        const commentsData = snapshot.docs.map((doc) => doc.data());
        setCommentsCount(commentsData.length);
        setAllComments(commentsData);
      });

      return () => unsubscribe();

    } else {
      console.log("Document does not exist.");
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
};

export const addComment = async (currentUser, documentId, newComment) => {
  const docRef = doc(db, "ai-art", documentId);

  try {
    // Get the current document data
    const docSnapshot = await getDoc(docRef);
    const currentComments = docSnapshot.data()?.comments || [];

    // Create a new comment object
    const commentObject = {
      text: newComment,
      userName: currentUser.displayName,
      userId: currentUser.uid,
    };

    const commentsCollectionRef = collection(docRef, "comments");
    await addDoc(commentsCollectionRef, commentObject);

    console.log("Comment added successfully");
  } catch (error) {
    console.error("Error adding comment: ", error);
  }
};


export const deleteComment = async (commentId, artId) => {
  
};




export const getGeneratedArtworkDetails = async (
  currentUser,
  setArtworkDetail,
  generatedImageUrl
) => {
  try {
    if (currentUser) {
      const currentUserUid = currentUser.uid;
      const userSavedImagesRef = doc(db, "saved-posts", currentUserUid);
      // Fetch the user's document
      const userSavedImagesSnapshot = await getDoc(userSavedImagesRef);
      const userData = userSavedImagesSnapshot.data();
      // console.log(userData);

      if (userData && userData.savedPosts) {
        // Use Array.find to find the object with the matching prompt
        const foundArtwork = userData.savedPosts.find((artwork) => {
          if (typeof artwork === "object") {
            return (
              artwork.generatedImageUrl
                .split("artwork/generated")[0]
                .slice(0, 50) === generatedImageUrl
            );
          }
          return false;
        });

        // If a matching object is found, you can use it
        if (foundArtwork) {
          setArtworkDetail(foundArtwork);
        } else {
          console.log("Artwork not found for the specified prompt.");
          // Handle the case where no artwork with the specified prompt is found.
        }
      } else {
        console.log("User data or savedPosts array is missing.");
        // Handle the case where user data or savedPosts array is missing.
      }
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
};
