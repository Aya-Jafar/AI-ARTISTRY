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
  getDocs(allArtworksCollection)
    .then((querySnapshot) => {
      // console.log(querySnapshot);
      const documents = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is the data of each document
        documents.push({ id: doc.id, ...doc.data() });
      });
      setArtworks(documents);
      console.log("All documents:", documents);
    })
    .catch((error) => {
      console.error("Error getting documents:", error);
    });
};

export const saveArtwork = async (currentUser, artId) => {
  // Get the current user's UID
  const currentUserUid = currentUser.uid;

  // Create a reference to the user's document in the saved-posts collection
  const userSavedPostsRef = doc(db, "saved-posts", currentUserUid);

  try {
    // Fetch the user's document to get the current favorite photo IDs
    const userSavedPostsSnapshot = await getDoc(userSavedPostsRef);
    const userData = userSavedPostsSnapshot.data();

    if (userData && userData.savedPosts) {
      // Add the new favorite photo ID to the existing array
      userData.savedPosts.push(artId);

      // Update the user's document with the updated favorite photo IDs
      await setDoc(userSavedPostsRef, {
        savedPosts: userData.savedPosts,
      });

      console.log("Favorite photo ID added to the user's saved-posts document");
    } else {
      // Create a new document for the user if it doesn't exist
      await setDoc(userSavedPostsRef, {
        savedPosts: [artId],
      });

      console.log(
        "User's saved-posts document created with the favorite photo ID"
      );
    }
  } catch (error) {
    console.error("Error adding favorite photo ID:", error);
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
