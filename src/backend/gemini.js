export const chatBotSocket = (setMessages, initialMessage) => {
  const chatSocket = new WebSocket("ws://localhost:8000/ws/chatbot/");

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
    console.log("Code:", e.code);
    console.log("Reason:", e.reason);
  };

  return chatSocket;
};

export const getArtistsNameWithSimilarWork = async (base64Url , setArtists) => {
  if (base64Url) {
    const payload = {
      image_base64_url: base64Url,
    };

    try {
      // Send the POST request
      const response = await fetch("http://localhost:8000/get-artists/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.artists) {
        console.log("Artists:", data);
        setArtists(data.artists);
      } else if (data.error) {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  }
};
