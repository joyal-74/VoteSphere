# 🗳️ VoteSphere (MERN Stack)
**Real-Time Polling Application with Live Chat & Typing Indicators**

VoteSphere is a full-stack real-time application that allows users to create/participate in polls and engage in synchronized discussions. Built using the MERN stack, it leverages WebSockets for instantaneous data updates across all connected clients.

---

## 🚀 Features

### 📊 Real-Time Polling
* **Instant Vote Casting:** Users can vote on options with immediate UI feedback.
* **Live Results:** Uses Socket.IO to broadcast updated vote counts to all users without page refreshes.
* **Visual Data:** Dynamic progress bars representing current standings.

### 💬 Interactive Chat
* **Live Messaging:** Real-time chat integration alongside the polling interface.
* **Typing Indicator:** A "dot animation" that triggers when a user is actively typing.
* **User Identity:** Each message is tied to a unique username established via a basic authentication layer.

### 🛠️ Technical Implementation
* **WebSockets:** Bi-directional communication between the React client and Node.js server.
* **Data Management:** MongoDB integration for persistent poll options and message history.
* **Component-Based UI:** Modular React components for high performance and clean code.

---

## 📂 Project Structure

```text
votesphere/
├── backend/             # Node application      
│   ├── src/
│   │   ├── app/ 
│   │   ├── domain/ 
│   │   ├── infra/ 
│   │   ├── presentation/ 
│   │── app.js 
│   │── server.js 

├── frontend/            # React Application
│   ├── src/
│   │   ├── api/
│   │   ├── app/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── features/
│   │   ├── routes/
│   │   ├── types/
│   │   ├── utils/
│   │   └── App.tsx   
│   │   └── main.tsx   
│   └── package.json
└── README.md
```

---


## 📋 Installation & Setup

Follow these steps to set up both the **Backend** and **Frontend** environments.

### 1. Clone the repository

```bash
git clone https://github.com/joyal-74/votesphere.git
cd votesphere

```

---

### 2. Backend Setup

Navigate to the server directory to configure the API.

```bash
cd Backend 
npm install

```

**Configure Environment:**
Create a `.env` file inside the `backend` folder:

```env
PORT = 3000
MONGO_URI = your-mongo-uri
JWT_ACCESS_SECRET = your_access_secret
JWT_REFRESH_SECRET = your_refresh_secret
NODE_ENV = development/production
CLIENT_URL = http://localhost:5173 #frontend server url

```

---

### 3. Frontend Setup

Open a new terminal tab and navigate to the client directory.

```bash
cd Frontend 
npm install

```

**Configure Environment:**
Create a `.env` file inside the `frontend` folder if you need to point to your local API:

```env
VITE_API_URL=http://localhost:3000 #or your backend port

```

---

### 4. Running the Application

To get the full system running, you need to start both servers:

* **Start Backend:**
Inside the `backend` folder:
```bash
npm run dev

```


* **Start Frontend:**
Inside the `frontend` folder:
```bash
npm run dev

```



> [!TIP]
> Once both are running, the frontend is typically accessible at `http://localhost:5173`.

---

## 🏗️ Architecture & Implementation

The application follows a **Client-Server Architecture** utilizing WebSockets for state synchronization.

### **How it works:**

1. **Connection:** When a user joins, the server establishes a persistent socket connection and assigns a unique ID or links their authenticated username.
2. **Voting:** When a user clicks a vote button, a `vote-cast` event is emitted to the server. The server updates the internal data structure and broadcasts a `results-update` event to all connected sockets.
3. **Chatting:** Message events carry the payload (text + username). The server appends this to the session history and broadcasts it.
4. **Typing Indicator:** `typing` and `stop-typing` events are triggered on the client-side `input` listeners to provide real-time UI feedback.

---

## 🧪 Evaluation Criteria Met

* [x] **Functionality:** Seamless integration of polls and chat.
* [x] **Real-time Communication:** High-efficiency Socket.IO implementation.
* [x] **UX/UI:** Differentiated sections with intuitive navigation.
* [x] **Authentication:** User tracking for chat accountability.

---

## 🛡️ License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Developed by Joyal Kuriakose**