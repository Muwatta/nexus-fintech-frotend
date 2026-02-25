let socket: WebSocket | null = null;

export const connectTransactionsWS = (onMessage: (data: any) => void) => {
  socket = new WebSocket("ws://localhost:8000/ws/transactions/");

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  socket.onclose = () => {
    console.log("WS closed. reconnecting...");
    setTimeout(() => connectTransactionsWS(onMessage), 3000);
  };
};

export const disconnectWS = () => {
  socket?.close();
};
