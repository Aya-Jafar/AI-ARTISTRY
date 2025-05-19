import {
  collection,
  getDocs,
  updateDoc,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  increment,
  addDoc,
  deleteDoc,
  onSnapshot,
  limit,
  orderBy,
} from "firebase/firestore";
import db from "./firebaseConfig";
import {
  FIREBASE_MAIN_COLLECTION,
  FIREBASE_USERS_COLLECTION,
  FIREABSE_SAVED_POSTS_COLLECTION,
  FIREBASE_ACTIVITY_COLLECTION,
  FIREBASE_COMMENTS_COLLECTION,
  FIREBASE_POSTS_COLLECTION,
} from "../utils/constants";

const allArtworksCollection = collection(db, FIREBASE_MAIN_COLLECTION);

/**
 * Fetches user information from the 'users' collection in Firestore.
 * @param {string} userId - The UID of the user.
 * @returns {Promise<Object|null>} - The user data or null if not found.
 */
export const getUserInfo = async (userId) => {
  try {
    const docRef = doc(db, FIREBASE_USERS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

/**
 * Fetches all artworks, with optional filters for homepage and limiting the number of artworks.
 * @param {Function} setArtworks - The state setter function to update the artworks.
 * @param {number} limitCount - The number of artworks to fetch.
 * @param {boolean} isHomePage - Flag to determine if it's the homepage.
 */
export const getAllArtworks = (setArtworks, limitCount, isHomePage) => {
  let allDocuments = [];
  let limitedQuery;
  if (isHomePage) {
    limitedQuery = query(
      allArtworksCollection,
      limit(limitCount),
      where("type", "in", ["all", "all, fantasy", "all, SCI-FI"])
    );
  } else {
    limitedQuery = query(
      allArtworksCollection,
      limit(limitCount),
      where("type", "in", [
        "all",
        "all, fantasy",
        "all, SCI-FI",
        "fantasy",
        "SCI-FI",
      ])
    );
  }

  getDocs(limitedQuery)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        allDocuments.push({ id: doc.id, ...doc.data() });
      });
      setArtworks(allDocuments);
    })
    .catch((error) => {
      console.error("Error getting documents:", error);
    });
};

/**
 * Fetches all artworks categorized as 'fantasy'.
 * @param {Function} setArtworks - The state setter function to update the artworks.
 * @param {number} limitCount - The number of artworks to fetch.
 */
export const getFantasyArtworks = (setArtworks, limitCount) => {
  const queryOptions = [
    query(
      allArtworksCollection,
      where("type", "in", ["fantasy", "all, fantasy"]),
      limit(limitCount)
    ),
  ];

  getDocs(...queryOptions)
    .then((querySnapshot) => {
      const fantasyDocs = [];
      querySnapshot.forEach((doc) => {
        fantasyDocs.push({ id: doc.id, ...doc.data() });
      });
      setArtworks(fantasyDocs);
    })
    .catch((error) => {
      // console.error("Error getting documents:", error);
    });
};

/**
 * Fetches all artworks categorized as 'SCI-FI'.
 * @param {Function} setArtworks - The state setter function to update the artworks.
 * @param {number} limitCount - The number of artworks to fetch.
 */
export const getSciFiArtworks = (setArtworks, limitCount) => {
  const queryOptions = [
    query(
      allArtworksCollection,
      where("type", "in", ["SCI-FI", "all, SCI-FI"]),
      limit(limitCount)
    ),
  ];

  getDocs(...queryOptions)
    .then((querySnapshot) => {
      const fantasyDocs = [];
      querySnapshot.forEach((doc) => {
        fantasyDocs.push({ id: doc.id, ...doc.data() });
      });
      setArtworks(fantasyDocs);
    })
    .catch((error) => {});
};

/**
 * Saves an artwork to the user's saved posts.
 * @param {Object} currentUser - The currently authenticated user.
 * @param {string} artId - The ID of the artwork to be saved.
 * @returns {Promise<void>} - Resolves once the save action is complete.
 */
export const saveArtwork = async (currentUser, artId) => {
  // Get the current user's UID
  if (currentUser) {
    const currentUserUid = currentUser.uid;

    // Create a reference to the user's document in the saved-posts collection
    const userSavedPostsRef = doc(
      db,
      FIREABSE_SAVED_POSTS_COLLECTION,
      currentUserUid
    );

    try {
      // Fetch the user's document to get the current saved artwork IDs
      const userSavedPostsSnapshot = await getDoc(userSavedPostsRef);
      const userData = userSavedPostsSnapshot.data();

      if (userData && userData.savedPosts) {
        // Check if the artwork ID is already in the array
        const index = userData?.savedPosts?.indexOf(artId);

        if (index !== -1) {
          // If the artwork ID is found, remove it from the array
          userData.savedPosts.splice(index, 1);

          // Update the user's document with the updated saved artwork IDs
          await setDoc(userSavedPostsRef, {
            savedPosts: userData.savedPosts,
          });
        } else {
          // If the artwork ID is not found, add it to the array
          userData.savedPosts.push(artId);

          // Update the user's document with the updated saved artwork IDs
          await setDoc(userSavedPostsRef, {
            savedPosts: userData.savedPosts,
          });
        }
      } else {
        // Create a new document for the user if it doesn't exist
        await setDoc(userSavedPostsRef, {
          savedPosts: [artId],
        });
      }
    } catch (error) {
      console.error("Error updating saved-posts:", error);
    }
  }
};

/**
 * Saves a generated image for the current user.
 * @param {Object} currentUser - The currently authenticated user.
 * @param {string} generatedImageUrl - The URL of the generated image.
 * @param {string} prompt - The prompt used to generate the image.
 * @param {number} brightness - The brightness value of the generated image.
 * @param {number} contrast - The contrast value of the generated image.
 * @param {Function} setShowSnackBar - The function to show the snack bar on success.
 * @returns {Promise<void>} - Resolves once the save action is complete.
 */
export const saveGeneratedImage = async (
  currentUser,
  generatedImageUrl,
  prompt,
  brightness,
  contrast,
  setShowSnackBar
) => {
  // Get the current user's UID
  if (currentUser) {
    const currentUserUid = currentUser.uid;

    // Create a reference to the user's document in the saved-images collection
    const userSavedImagesRef = doc(
      db,
      FIREABSE_SAVED_POSTS_COLLECTION,
      currentUserUid
    );

    try {
      // Fetch the user's document to get the current saved image data
      const userSavedImagesSnapshot = await getDoc(userSavedImagesRef);
      const userData = userSavedImagesSnapshot.data();

      // Create an object to store the image URL and prompt
      const imageData = {
        generatedImageUrl,
        creator: currentUser.displayName,
        prompt,
        brightness,
        contrast,
      };

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
        } else {
          // If the image data is not found, add it to the array
          userData.savedPosts.push(imageData);

          // Update the user's document with the updated saved image data
          await setDoc(userSavedImagesRef, {
            savedPosts: userData.savedPosts,
          });
          setShowSnackBar(true);
        }
      } else {
        // Create a new document for the user if it doesn't exist
        await setDoc(userSavedImagesRef, {
          savedPosts: [imageData],
        });

        setShowSnackBar(true);
      }
    } catch (error) {
      console.error("Error updating saved-images:", error);
    }
  }
};

/**
 * Checks if an artwork is saved by the current user.
 * @param {Object} currentUser - The current user object.
 * @param {string} artId - The ID of the artwork.
 * @returns {Promise<boolean>} - Returns true if the artwork is saved, false otherwise.
 */
export const isArtworkSaved = async (currentUser, artId) => {
  if (currentUser) {
    // Get the current user's UID
    const currentUserUid = currentUser.uid;

    // Create a reference to the user's document in the saved-posts collection
    const userSavedPostsRef = doc(
      db,
      FIREABSE_SAVED_POSTS_COLLECTION,
      currentUserUid
    );

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

/**
 * Checks if an artwork is liked by the current user.
 * @param {Object} currentUser - The current user object.
 * @param {string} artId - The ID of the artwork.
 * @returns {Promise<boolean>} - Returns true if the artwork is liked, false otherwise.
 */

export const isArtworkLiked = async (currentUser, artId) => {
  if (!currentUser || !currentUser.uid) {
    // Check if a user is authenticated and has a UID
    return false;
  }

  const userId = currentUser.uid; // Get the user's UID
  // const activityRef = collection(db, "activity",userId);

  try {
    const userLikedActivity = doc(db, FIREBASE_ACTIVITY_COLLECTION, userId);

    // Fetch the user's document to get the current savedPosts array
    const userSavedPostsSnapshot = await getDoc(userLikedActivity);

    const userData = userSavedPostsSnapshot.data();

    if (userData) {
      const liked = userData.activities.some(
        (e) => e.artData.id === artId && e.activityType === "Like"
      );

      if (liked) {
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {
    console.error("Error checking if artwork is liked:", error);
    return false;
  }
};

/**
 * Fetches artwork data from the Firestore database.
 * @param {string} artId - The ID of the artwork.
 * @returns {Promise<Object>} - The artwork data.
 */
const fetchArtworkData = async (artId) => {
  const photoRef = doc(db, FIREBASE_MAIN_COLLECTION, artId);
  const photoDoc = await getDoc(photoRef);
  return { id: photoDoc.id, ...photoDoc.data() };
};

/**
 * Retrieves the list of saved artworks for the current user.
 * @param {Object} currentUser - The current user object.
 * @param {Function} setSavedPosts - Function to set the saved posts data.
 * @returns {Promise<void>} - Updates the saved posts.
 */
export const getSavedArtworks = async (currentUser, setSavedPosts) => {
  if (currentUser) {
    // Get the current user's UID
    const currentUserUid = currentUser;

    // Create a reference to the user's document in the saved-posts collection
    const userSavedPostsRef = doc(
      db,
      FIREABSE_SAVED_POSTS_COLLECTION,
      currentUserUid
    );

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
          nonBlobData.map((photoId) => fetchArtworkData(photoId))
        );

        const updatedSavedPosts = [...blobUrls, ...fetchedData];

        setSavedPosts(updatedSavedPosts);
      }
    } catch (error) {
      console.error("Error fetching saved artworks:", error);
    }
  }
};

/**
 * Adds a like or other activity to the user's activity feed.
 * @param {Object} currentUser - The current user object.
 * @param {string} artId - The ID of the artwork.
 * @param {string} activityType - The type of activity (e.g., "Like", "Comment").
 * @returns {Promise<void>} - Updates the user's activity feed.
 */
export const addToLikedActivity = async (currentUser, artId, activityType) => {
  if (!currentUser || !currentUser.uid) {
    // Check if a user is authenticated and has a UID
    return;
  }

  const userId = currentUser.uid; // Get the user's UID
  const activityRef = doc(db, FIREBASE_ACTIVITY_COLLECTION, userId); // Reference to the user's activity document in Firestore

  const artData = await fetchArtworkData(artId);

  const newActivityObject = {
    // artId: artId,
    artData: artData,
    activityType: activityType,
    userName: currentUser.displayName,
    timestamp: new Date().toISOString(), // You can add a timestamp for the activity
  };

  try {
    const activitySnapshot = await getDoc(activityRef);

    if (!activitySnapshot.exists()) {
      // If the activity document doesn't exist, create it with the new activity
      await setDoc(activityRef, {
        activities: [newActivityObject],
      });
    } else {
      const existingActivities = activitySnapshot.data().activities;

      // Check if the same activity (same artId and activityType) exists
      const existingIndex = existingActivities.findIndex(
        (activity) =>
          activity.artData.id === artId &&
          activity.activityType === activityType
      );

      if (existingIndex !== -1) {
        // If the activity already exists, remove it from the array
        existingActivities.splice(existingIndex, 1);

        // Update the activities array without the removed activity
        await updateDoc(activityRef, {
          activities: existingActivities,
        });
      } else {
        // If the activity doesn't exist, add the new activity
        await updateDoc(activityRef, {
          activities: [...existingActivities, newActivityObject],
        });
      }
    }
    await updateLikesCount(artId);
  } catch (error) {
    console.error("Error adding activity to user:", error);
  }
};

/**
 * Updates the likes count for a given artwork.
 * @param {string} artId - The ID of the artwork.
 * @returns {Promise<void>} - Updates the likes count in Firestore.
 */
async function updateLikesCount(artId) {
  const artworkRef = doc(db, FIREBASE_MAIN_COLLECTION, artId);

  const artworkDoc = await getDoc(artworkRef);

  const currentLikesCount = artworkDoc.data()?.likesCount || 0;

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
}

/**
 * Fetches artwork details from Firestore.
 * @param {string} id - The ID of the artwork.
 * @param {function} setArtworkDetail - State setter to store artwork details.
 * @param {function} setLikesCount - State setter to store like count.
 * @param {function} setCommentsCount - State setter to store comment count.
 * @param {function} setAllComments - State setter to store all comments.
 * @returns {function} Unsubscribe function to stop listening to comment updates.
 */
export const getArtworkDetails = async (
  id,
  setArtworkDetail,
  setLikesCount,
  setCommentsCount,
  setAllComments
) => {
  const documentRef = doc(db, FIREBASE_MAIN_COLLECTION, id);
  try {
    const documentSnapshot = await getDoc(documentRef);

    if (documentSnapshot.exists()) {
      const documentData = documentSnapshot.data();

      // Only update if the data has actually changed
      setArtworkDetail((prev) => {
        if (
          !prev ||
          prev.prompt !== documentData.prompt ||
          prev.likesCount !== documentData.likesCount ||
          prev.image !== documentData.image ||
          prev.type !== documentData.type
        ) {
          return documentData;
        }
        return prev; // No change, return previous state
      });

      setLikesCount((prev) => {
        if (prev !== documentData.likesCount) return documentData.likesCount;
        return prev; // No change
      });

      const commentsQuery = query(collection(documentRef, "comments"));
      const commentsSnapshot = await getDocs(commentsQuery);
      const commentsData = commentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCommentsCount((prev) => {
        if (prev !== commentsData.length) return commentsData.length;
        return prev; // No change
      });

      setAllComments((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(commentsData))
          return commentsData;
        return prev; // No change
      });
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
};

/**
 * Adds a comment to a specific artwork and logs the activity.
 * @param {Object} currentUser - The currently logged-in user.
 * @param {string} artId - The ID of the artwork.
 * @param {string} newComment - The content of the new comment.
 */
export const addCommentToActivity = async (currentUser, artId, newComment) => {
  if (currentUser) {
    const docRef = doc(db, FIREBASE_MAIN_COLLECTION, artId);

    try {
      // Get the current document data
      const docSnapshot = await getDoc(docRef);

      const activityRef = doc(
        db,
        FIREBASE_ACTIVITY_COLLECTION,
        currentUser.uid
      );

      const activitySnapshot = await getDoc(activityRef);

      // Create a new comment object
      const commentObject = {
        text: newComment,
        userName: currentUser.displayName,
        userId: currentUser.uid,
      };

      const commentsCollectionRef = collection(
        docRef,
        FIREBASE_COMMENTS_COLLECTION
      );

      // Add the comment to the comments collection
      const commentDocRef = await addDoc(commentsCollectionRef, commentObject);

      // Get the ID of the newly added comment
      const commentId = commentDocRef.id;

      // Add the comment ID to the comment object
      commentObject.commentId = commentId;

      const artData = await fetchArtworkData(artId);

      const newActivityObject = {
        artData: artData,
        activityType: "comment",
        commentId: commentId, // Add the comment ID to the activity
        commentText: newComment,
        userName: currentUser.displayName,
        timestamp: new Date().toISOString(),
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
      } else {
        // If the user hasn't liked the artwork, add the new activity
        await updateDoc(activityRef, {
          activities: [
            ...activitySnapshot.data().activities,
            newActivityObject,
          ],
        });
      }
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  }
};

/**
 * Fetches user activity for the specified user ID.
 * @param {string} uid - The user ID.
 * @param {function} setActivity - State setter to store the activity data.
 */

export const getUserActivity = async (uid, setActivity) => {
  if (uid) {
    const activityCollection = collection(db, FIREBASE_ACTIVITY_COLLECTION);

    let allActivity = [];

    getDocs(activityCollection)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is the data of each document
          if (uid === doc.id) {
            allActivity = [...allActivity, ...doc.data().activities];
          }
        });
        setActivity(allActivity);
      })
      .catch((error) => {
        console.error("Error getting documents:", error);
      });
  }
};

/**
 * Deletes a comment from an artwork and removes the activity entry.
 * @param {string} artId - The ID of the artwork.
 * @param {string} commentId - The ID of the comment to delete.
 * @param {string} userId - The ID of the user who made the comment.
 */
export const deleteComment = async (artId, commentId, userId) => {
  const commentDocRef = doc(
    db,
    FIREBASE_MAIN_COLLECTION,
    artId,
    FIREBASE_COMMENTS_COLLECTION,
    commentId
  );
  const activityRef = doc(db, FIREBASE_ACTIVITY_COLLECTION, userId);

  try {
    await deleteDoc(commentDocRef);

    // Retrieve the user's activity data
    const activitySnapshot = await getDoc(activityRef);

    if (activitySnapshot.exists()) {
      const activityData = activitySnapshot.data();

      // Check if the user has an 'activities' array
      if (activityData.activities) {
        const activities = activityData.activities;

        // Find the index of the activity associated with the deleted comment
        const index = activities.findIndex(
          (activity) => activity.commentId === commentId
        );

        if (index !== -1) {
          // Remove the activity at the found index
          activities.splice(index, 1);

          // Update the user's activity with the modified 'activities' array
          await updateDoc(activityRef, { activities: activities });
        }
      }
    }
  } catch (error) {
    console.error("Error deleting comment: ", error);
  }
};

/**
 * Edits the text of an existing comment.
 * @param {string} artId - The ID of the artwork.
 * @param {string} commentId - The ID of the comment to edit.
 * @param {string} userId - The ID of the user editing the comment.
 * @param {string} newText - The new text for the comment.
 */
export const editComment = async (artId, commentId, userId, newText) => {
  const commentDocRef = doc(
    db,
    FIREBASE_MAIN_COLLECTION,
    artId,
    FIREBASE_COMMENTS_COLLECTION,
    commentId
  );
  const activityRef = doc(db, FIREBASE_ACTIVITY_COLLECTION, userId);

  try {
    // Update the comment text
    await updateDoc(commentDocRef, { text: newText });

    // Retrieve the user's activity data
    const activitySnapshot = await getDoc(activityRef);

    if (activitySnapshot.exists()) {
      const activityData = activitySnapshot.data();

      // Check if the user has an 'activities' array
      if (activityData.activities) {
        const activities = activityData.activities;

        // Find the index of the activity associated with the edited comment
        const index = activities.findIndex(
          (activity) => activity.commentId === commentId
        );

        if (index !== -1) {
          // Update the comment text in the associated activity
          activities[index].commentText = newText;

          // Update the user's activity with the modified 'activities' array
          await updateDoc(activityRef, { activities: activities });
        }
      }
    }
  } catch (error) {
    console.error("Error editing comment: ", error);
  }
};

/**
 * Posts an artwork and saves it to the current user's saved images.
 * @param {Object} currentUser - The currently logged-in user.
 * @param {string} postUrl - The URL of the generated artwork.
 * @param {string} prompt - The prompt used for generating the artwork.
 * @param {function} setShowSnackBar - State setter to control snack bar visibility.
 */
export const postArtwork = async (
  currentUser,
  postUrl,
  prompt,
  setShowSnackBar
) => {
  // Get the current user's UID
  if (currentUser) {
    const currentUserUid = currentUser.uid;

    // Create a reference to the user's document in the saved-images collection
    const userSavedImagesRef = doc(
      db,
      FIREBASE_POSTS_COLLECTION,
      currentUserUid
    );

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
        } else {
          // If the image data is not found, add it to the array
          userData.posts.push(imageData);

          // Update the user's document with the updated saved image data
          await setDoc(userSavedImagesRef, {
            posts: userData.posts,
          });

          setShowSnackBar(true);
        }
      } else {
        // Create a new document for the user if it doesn't exist
        await setDoc(userSavedImagesRef, {
          posts: [imageData],
        });

        setShowSnackBar(true);
      }
    } catch (error) {
      console.error("Error updating saved-images:", error);
    }
  }
};

/**
 * Fetches the saved posts for the current user.
 * @param {string} currentUser - The current user's UID.
 * @param {function} setPosts - State setter to store saved posts.
 */
export const getPosts = async (currentUser, setPosts) => {
  if (currentUser) {
    // Get the current user's UID
    const currentUserUid = currentUser;

    // Create a reference to the user's document in the saved-posts collection
    const userSavedPostsRef = doc(
      db,
      FIREBASE_POSTS_COLLECTION,
      currentUserUid
    );

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

/**
 * Fetches the details of generated artwork from the saved posts or saved generated.
 * @param {Object} currentUser - The current user.
 * @param {function} setArtworkDetail - State setter to store the artwork details.
 * @param {string} generatedImageUrl - URL of the generated image.
 * @param {string} whichTab - Which tab the artwork details belong to.
 */
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
        await getPostDetail(
          currentUserUid,
          setArtworkDetail,
          generatedImageUrl
        );
      }
      if (whichTab === "saved-generated") {
        await getGeneratedDetail(
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

/**
 * Fetches the details of a generated artwork from the user's saved posts.
 * @param {string} currentUserUid - The unique ID of the current user.
 * @param {string} generatedImageUrl - The URL of the generated image.
 * @param {function} setArtworkDetail - The function to update the artwork details state.
 * @returns {Promise<void>} - A promise that resolves when the artwork details are set.
 */
async function getGeneratedDetail(
  currentUserUid,
  generatedImageUrl,
  setArtworkDetail
) {
  const userSavedImagesRef = doc(
    db,
    FIREABSE_SAVED_POSTS_COLLECTION,
    currentUserUid
  );
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

// TODO: For future use
export const unsaveFromProfile = async (
  currentUser,
  artId,
  generatedImageUrl = null
) => {
  if (!currentUser) return;

  try {
    if (artId) {
      const savedArtworkRef = doc(
        db,
        "saved-posts",
        currentUser.uid,
        "savedPosts",
        artId
      );
      await deleteDoc(savedArtworkRef);
    }

    router.go(-1);
  } catch (error) {
    console.error("🔥 Error unsaving artwork:", error);
  }
};

/**
 * Fetches the details of a post from the user's saved posts based on the post URL.
 * @param {string} currentUserUid - The unique ID of the current user.
 * @param {function} setArtworkDetail - The function to update the artwork details state.
 * @param {string} postUrl - The URL of the post.
 * @returns {Promise<void>} - A promise that resolves when the artwork details are set.
 */
async function getPostDetail(currentUserUid, setArtworkDetail, postUrl) {
  const userSavedImagesRef = doc(db, "posts", currentUserUid);
  // Fetch the user's document
  const userSavedImagesSnapshot = await getDoc(userSavedImagesRef);
  const userData = userSavedImagesSnapshot.data();

  if (userData && userData.posts) {
    // Use Array.find to find the object with the matching prompt
    const foundArtwork = userData.posts.find((artwork) => {
      return artwork.postUrl.slice(-50) === postUrl.slice(-50);
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
