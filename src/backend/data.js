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
  deleteDoc,
  onSnapshot,
  arrayUnion,
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
      // console.log("All documents:", allDocuments);
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
  prompt,
  brightness,
  contrast
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
      const imageData = { generatedImageUrl, prompt, brightness, contrast };

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

export const isArtworkSaved = async (currentUser, artId) => {
  if (currentUser) {
    // Get the current user's UID
    const currentUserUid = currentUser.uid;

    // Create a reference to the user's document in the saved-posts collection
    const userSavedPostsRef = doc(db, "activity", currentUserUid);

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
  if (!currentUser || !currentUser.uid) {
    // Check if a user is authenticated and has a UID
    return false;
  }

  const userId = currentUser.uid; // Get the user's UID
  // const activityRef = collection(db, "activity",userId);

  try {
    const userSavedLikedRef = doc(db, "activity", userId);

    // Fetch the user's document to get the current savedPosts array
    const userSavedPostsSnapshot = await getDoc(userSavedLikedRef);

    const userData = userSavedPostsSnapshot.data();

    if (userData) {
      const liked = userData.activities.some(
        (e) => e.artData.id === artId && e.activityType === "Like"
      );

      if (liked) {
        return true;
      }
    }
  } catch (error) {
    console.error("Error checking if artwork is liked:", error);
    return false;
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

      // console.log(userData);

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

export const addToLikedActivity = async (currentUser, artId, activityType) => {
  if (!currentUser || !currentUser.uid) {
    // Check if a user is authenticated and has a UID
    return;
  }

  const userId = currentUser.uid; // Get the user's UID
  const activityRef = doc(db, "activity", userId); // Reference to the user's activity document in Firestore

  const artData = await fetchPhotoData(artId);

  const newActivityObject = {
    // artId: artId,
    artData: artData,
    activityType: activityType,
    userName: currentUser.displayName,
    timestamp: new Date().toISOString(), // You can add a timestamp for the activity
  };

  try {
    const activitySnapshot = await getDoc(activityRef);

    if (
      !activitySnapshot.data() ||
      !activitySnapshot.data().activities ||
      activitySnapshot.data().activities.length === 0
    ) {
      // If the activities array is empty, add the new activity
      await setDoc(activityRef, {
        activities: [newActivityObject],
      });
      console.log("Document added successfully");
    } else {
      const foundAndLiked = activitySnapshot
        .data()
        .activities.some((e) => e.artId === artId && e.activityType === "Like");

      if (foundAndLiked) {
        // If the user has liked the artwork, delete the entire document
        await deleteDoc(activityRef);
        console.log("Document deleted");
      } else {
        // If the user hasn't liked the artwork, add the new activity
        await updateDoc(activityRef, {
          activities: [
            ...activitySnapshot.data().activities,
            newActivityObject,
          ],
        });

        console.log("Activity added successfully");
      }
    }
    await updateLikesCount(artId);
  } catch (error) {
    console.error("Error adding activity to user:", error);
  }
};

async function updateLikesCount(artId) {
  const artworkRef = doc(db, "ai-art", artId);

  const artworkDoc = await getDoc(artworkRef);

  const currentLikesCount = artworkDoc.data()?.likesCount || 0;

  console.log("Current likes count: " + currentLikesCount);

  if (currentLikesCount === 0) {
    // If the current likesCount is 0, increment it by 1
    await updateDoc(artworkRef, {
      likesCount: increment(1), // Increment by 1
    });
  } else if (currentLikesCount === 1) {
    // If the current likesCount is not 0, decrement it by 1
    await updateDoc(artworkRef, {
      likesCount: increment(-1),
    });
  }
  console.log("Current likes count: " + currentLikesCount);
}

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
        const commentsData = snapshot.docs.map((doc) => ({
          id: doc.id, // Include the comment ID
          ...doc.data(), // Include the comment data
        }));
        // console.log(commentsData);
        setCommentsCount(commentsData.length);
        // console.log(commentsData);
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

export const addCommentToActivity = async (currentUser, artId, newComment) => {
  const docRef = doc(db, "ai-art", artId);
  const userRefInActivity = doc(db, "activity", currentUser.uid);

  try {
    // Get the current document data
    const docSnapshot = await getDoc(docRef);

    const activityRef = doc(db, "activity", currentUser.uid);

    const activitySnapshot = await getDoc(activityRef);

    // Create a new comment object
    const commentObject = {
      text: newComment,
      userName: currentUser.displayName,
      userId: currentUser.uid,
    };

    const commentsCollectionRef = collection(docRef, "comments");

    const commentCollectionRefInActivity = collection(
      userRefInActivity,
      "comments"
    );

    await addDoc(commentCollectionRefInActivity, commentObject);

    await addDoc(commentsCollectionRef, commentObject);


    const artData = await fetchPhotoData(artId);

    const newActivityObject = {
      artData: artData,
      activityType: "comment",
      commentText: newComment,
      userName: currentUser.displayName,
      timestamp: new Date().toISOString(), // You can add a timestamp for the activity
    };
    if (
      !activitySnapshot.data() ||
      !activitySnapshot.data().activities ||
      activitySnapshot.data().activities.length === 0
    ) {
      // If the activities array is empty, add the new activity
      await setDoc(activityRef, {
        activities: [newActivityObject],
      });
      console.log("Comment added to empty activity list successfully");
    } else {
      // If the user hasn't liked the artwork, add the new activity
      await updateDoc(activityRef, {
        activities: [...activitySnapshot.data().activities, newActivityObject],
      });

      console.log("Activity added successfully");
    }
  } catch (error) {
    console.error("Error adding comment: ", error);
  }
};



export const getUserActivity = async (currentUser, setActivity) => {
  if (currentUser) {
    const activityCollection = collection(db, "activity");

    let allActivity = [];

    getDocs(activityCollection)
      .then((querySnapshot) => {
        // console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          // doc.data() is the data of each document
          if (currentUser.uid === doc.id) {
            allActivity = [...allActivity, ...doc.data().activities];
          }
        });
        setActivity(allActivity);
        console.log("All documents:", allActivity);
      })
      .catch((error) => {
        console.error("Error getting documents:", error);
      });
  } else {
    console.log("Current user is not logged in");
  }
};

export const deleteComment = async (artId, commentId) => {
  const commentDocRef = doc(db, "ai-art", artId, "comments", commentId);


  try {
    await deleteDoc(commentDocRef);
    console.log("Comment deleted successfully");
  } catch (error) {
    console.error("Error deleting comment: ", error);
  }
};





export const editComment = async (artId, commentId, newComment) => {
  try {
    const artDocRef = doc(db, "ai-art", artId);

    // Update the specific comment within the "comments" subcollection
    const commentRef = doc(artDocRef, "comments", commentId);

    // if (commentRef.data().text === newComment) {
    //   console.log("Updated comment is the same as the old one");
    //   return;
    // }

    // Use updateDoc to modify the comment's "text" field with the new content
    await updateDoc(commentRef, {
      text: newComment,
    });

    console.log("Comment updated successfully");
  } catch (error) {
    console.error("Error updating comment: ", error);
  }
};

export const postArtwork = async (currentUser, postUrl, prompt) => {
  // Get the current user's UID
  if (currentUser) {
    const currentUserUid = currentUser.uid;

    // Create a reference to the user's document in the saved-images collection
    const userSavedImagesRef = doc(db, "posts", currentUserUid);

    try {
      // Fetch the user's document to get the current saved image data
      const userSavedImagesSnapshot = await getDoc(userSavedImagesRef);
      const userData = userSavedImagesSnapshot.data();

      // Create an object to store the image URL and prompt
      const imageData = { postUrl, prompt };

      if (userData && userData.posts) {
        // Check if the image data is already in the array
        const index = userData.posts.findIndex(
          (data) => data.postUrl === postUrl
        );

        if (index !== -1) {
          // If the image data is found, remove it from the array
          userData.posts.splice(index, 1);

          // Update the user's document with the updated saved image data
          await setDoc(userSavedImagesRef, {
            posts: userData.posts,
          });

          console.log("Image removed from saved-images");
        } else {
          // If the image data is not found, add it to the array
          userData.posts.push(imageData);

          // Update the user's document with the updated saved image data
          await setDoc(userSavedImagesRef, {
            posts: userData.posts,
          });

          console.log("Image added to saved-images");
        }
      } else {
        // Create a new document for the user if it doesn't exist
        await setDoc(userSavedImagesRef, {
          posts: [imageData],
        });

        console.log("User's saved-images document created with the image data");
      }
    } catch (error) {
      console.error("Error updating saved-images:", error);
    }
  }
};

export const getPosts = async (currentUser, setPosts) => {
  if (currentUser) {
    // Get the current user's UID
    const currentUserUid = currentUser.uid;

    // Create a reference to the user's document in the saved-posts collection
    const userSavedPostsRef = doc(db, "posts", currentUserUid);

    try {
      // Fetch the user's document to get the current saved artwork data
      const userSavedPostsSnapshot = await getDoc(userSavedPostsRef);
      const userData = userSavedPostsSnapshot.data();

      if (userData && userData.posts) {
        setPosts(userData.posts);
      }
    } catch (error) {
      console.error("Error fetching saved artworks:", error);
    }
  }
};

export const getGeneratedArtworkDetails = async (
  currentUser,
  setArtworkDetail,
  generatedImageUrl,
  whichTab
) => {
  try {
    if (currentUser) {
      const currentUserUid = currentUser.uid;

      if (whichTab === "posts") {
        // get the document from the "posts" collection by it's matching url and use setArtworkDetail for it
        await getPostDetail(currentUserUid, setArtworkDetail);
      }
      if (whichTab === "saved-generated") {
        await getGenerateDetail(
          currentUserUid,
          generatedImageUrl,
          setArtworkDetail
        );
      }
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
};

async function getGenerateDetail(
  currentUserUid,
  generatedImageUrl,
  setArtworkDetail
) {
  const userSavedImagesRef = doc(db, "saved-posts", currentUserUid);
  // Fetch the user's document
  const userSavedImagesSnapshot = await getDoc(userSavedImagesRef);
  const userData = userSavedImagesSnapshot.data();

  if (userData && userData.savedPosts) {
    const foundArtwork = userData.savedPosts.find((artwork) => {
      return (
        artwork.hasOwnProperty("generatedImageUrl") &&
        artwork.generatedImageUrl.split("artwork/generated")[0].slice(-50) ===
          generatedImageUrl.slice(-50)
      );
    });

    // If a matching object is found, you can use it
    if (foundArtwork) {
      setArtworkDetail(foundArtwork);
    } else {
      console.log("Artwork not found for the specified url.");
      // Handle the case where no artwork with the specified prompt is found.
    }
  } else {
    console.log("User data or savedPosts array is missing.");
    // Handle the case where user data or savedPosts array is missing.
  }
}

async function getPostDetail(currentUserUid, setArtworkDetail) {
  const userSavedImagesRef = doc(db, "posts", currentUserUid);
  // Fetch the user's document
  const userSavedImagesSnapshot = await getDoc(userSavedImagesRef);
  const userData = userSavedImagesSnapshot.data();

  if (userData && userData.posts) {
    console.log(userData.posts);
    // Use Array.find to find the object with the matching prompt
    const foundArtwork = userData.posts.find(async (artwork) => {
      if (artwork.hasOwnProperty("postUrl")) {
        return artwork.postUrl;
        // .split("artwork/generated")[0]
        // .slice(0, 50) === generatedImageUrl
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
  }
}
