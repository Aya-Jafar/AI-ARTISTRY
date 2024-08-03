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
  