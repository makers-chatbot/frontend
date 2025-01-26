class WebSocketService {
    constructor() {
        this.ws = null;
        this.callbacks = new Set();
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
    }

    connect() {
        if (this.ws?.readyState === WebSocket.OPEN) return;

        this.ws = new WebSocket('ws://localhost:8001/ws/chat');
        
        this.ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                this.callbacks.forEach(callback => callback(message));
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };

        this.ws.onclose = () => {
            console.log('WebSocket connection closed');
            if (this.reconnectAttempts < this.maxReconnectAttempts) {
                this.reconnectAttempts++;
                setTimeout(() => this.connect(), 2000);
            }
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        this.ws.onopen = () => {
            console.log('WebSocket connected');
            this.reconnectAttempts = 0;
        };
    }

    sendMessage(message) {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({ message }));
        } else {
            console.error('WebSocket is not connected');
            // Try to reconnect
            this.connect();
        }
    }

    onMessage(callback) {
        this.callbacks.add(callback);
        return () => this.callbacks.delete(callback);
    }
}

export default new WebSocketService(); 
