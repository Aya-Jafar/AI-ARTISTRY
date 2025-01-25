/**
 * Establishes a WebSocket connection to the chatbot server and sends the initial message.
 * @param {function} setMessages - A function to update the state of messages.
 * @param {string} initialMessage - The initial message to be sent to the chatbot.
 * @returns {WebSocket} - The WebSocket connection instance.
 */
export const chatBotSocket = (setMessages, initialMessage) => {
  const chatSocket = new WebSocket(
    `${process.env.REACT_APP_WEBSOCKET_URL}/ws/chatbot/`
  );

  chatSocket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    setMessages((prevMessages) => [...prevMessages, data]);
  };

  chatSocket.onopen = () => {
    console.log("WebSocket connection opened");
    chatSocket.send(JSON.stringify({ message: initialMessage }));
  };

  chatSocket.onerror = (e) => {
    console.error("WebSocket error:", e);
  };

  chatSocket.onclose = (e) => {
    console.log("WebSocket closed:", e);
    console.log("Reason:", e.reason);
  };

  return chatSocket;
};

/**
 * Fetches a list of artists with similar artworks based on the provided image.
 * @param {string} base64Url - The base64 encoded image URL for which to find similar artists.
 * @param {function} setArtists - A function to update the state with the list of artists.
 * @returns {Promise<void>} - A promise that resolves when the artist names are fetched and set.
 */
export const getArtistsNameWithSimilarWork = async (base64Url, setArtists) => {
  if (base64Url) {
    const payload = {
      image_base64_url: base64Url,
      prompt: "Give me artist names with similar artworks for this image",
    };

    try {
      // Send the POST request
      const response = await fetch(
        `${process.env.REACT_APP_GEMINI_API_URL}/get-artists/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (data.artists) {
        setArtists(data.artists);
      } else if (data.error) {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  }
};
