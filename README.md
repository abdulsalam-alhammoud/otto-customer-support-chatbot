# OTTO Customer Support Chatbot (Academic Demo)

A rule-based customer support chatbot developed as a second-semester university web development project. The demo uses an OTTO-inspired customer service scenario; it is **not affiliated with or endorsed by OTTO**.

## Features
- German-language customer service chat interface
- Keyword-based answers about customer accounts, orders, and payments
- Fallback responses for unrecognized questions
- Supporting information pages for common customer service topics
- Express backend with a `POST /chat` endpoint
- WebSocket server setup for demonstration purposes
- Optional local JSON chat history (not included in the public repository)

## Tech Stack
HTML, CSS, JavaScript, Node.js, Express, body-parser, and ws. The original package also lists Mongoose as a dependency.

## Run Locally
1. Install Node.js.
2. Run `npm install`.
3. Start the server with `node server.js`.
4. Visit `http://localhost:3001`.

## Notes
- This is a **rule-based chatbot**, not a generative AI system.
- The original implementation stores messages locally in `chats.json`. Do not enter real personal information in this demo.
- The WebSocket server is attached to the HTTP server, so the actual WebSocket endpoint uses port **3001**; an original console message mentioning 8080 is inaccurate.
- The original project code is preserved for educational purposes, including its limitations.
- The original archive contains installed dependencies and chat history; these should not be published.
- Some images used by the original demo may be third-party assets; verify their usage rights before publishing them.

## Known Limitations
- Keyword matching can misunderstand complex questions.
- The original client has duplicate click handling for the send button.
- Chat history is written without robust input validation or concurrency handling.
- No authentication or production security controls are implemented.
