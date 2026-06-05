export async function send(sender, text) {
  try {
    const res = await fetch("http://127.0.0.1:8000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // 1. Define the operation explicitly as a mutation using GraphQL variables
        query: `
            mutation SendMessage($sender: String!, $text: String!) {
              message(sender: $sender, text: $text) {
                sender
                text
              }
            }
          `,
        // 2. Pass your runtime JS variables into the variables payload object
        variables: {
          sender: sender,
          text: text,
        },
      }),
    });
    if (!res.ok) {
      throw new Error(`Http error! status:`);
    }
    const json = await res.json();
    return json.data?.product || [];
  } catch (error) {
    console.error("GraphQL Fetch Failed", error);
    return [];
  }
}

export function connectMessageStream(onMessageReceived) {
    // 1. Open the raw WebSocket connection using the standard GraphQL WS protocol
    const ws = new WebSocket("ws://127.0.0.1:8001/graphql", "graphql-transport-ws");
    
    // A unique ID to track this specific subscription transaction
    const streamId = "chat-subscription-id";
  
    // 2. Step 1 of Handshake: Once connection opens, initialize the GraphQL session
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "connection_init" }));
    };
  
    // 3. Step 2 & 3: Handle incoming control acknowledgments and message frames
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
  
      // A. Backend says hello back. Now we send the exact subscription query layout.
      if (response.type === "connection_ack") {
        ws.send(JSON.stringify({
          id: streamId,
          type: "subscribe",
          payload: {
            query: `
              subscription {
                messages {
                  sender
                  text
                }
              }
            `
          }
        }));
      }
  
      // B. Live data chunk arrives. This maps directly to your Python 'yield message' line.
      if (response.type === "next" && response.id === streamId) {
        const payload = response.payload.data?.messages;
        if (payload) {
          onMessageReceived(payload); // Push the raw { sender, text } data to your handler
        }
      }
  
      // C. Respond to server pings to keep the pipe open and prevent connection drops
      if (response.type === "ping") {
        ws.send(JSON.stringify({ type: "pong" }));
      }
    };
  
    ws.onerror = (error) => {
      console.error("GraphQL WebSocket Stream Error:", error);
    };
  
    ws.onclose = (event) => {
      console.log(`WebSocket disconnected. Code: ${event.code}`);
    };
  
    // 4. Return the closure token. 
    // Calling this function breaks the backend's 'while True' loop and triggers 'finally:'
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        // Gracefully tell the backend to stop sending frames
        ws.send(JSON.stringify({ id: streamId, type: "complete" }));
        ws.close();
      }
    };
  }

 
   