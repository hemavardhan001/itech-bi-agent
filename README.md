# iTech BI Agent 📊🤖

An intelligent, full-stack Business Intelligence (BI) conversational agent designed to bridge the gap between complex relational databases and non-technical business managers. The application converts natural language queries into real-time structured data analytics and interactive visual charts with zero page-reload lag.

---

## 🚀 Key Features

* **Natural Language to Query Engine:** Translates simple text prompts (e.g., *"Show me a bar chart of the top 5 highest selling products"*) into accurate backend data operations.
* **Dynamic Visualization Deck:** Built using React and Recharts to render crisp, dark-mode responsive analytics.
* **On-the-Fly View State Management:** Toggle seamlessly between different graphical structures (Bar columns vs. Line trendlines) instantly.
* **Decoupled Architecture:** Asynchronous FastAPI backend connected to a modular React client interface for ultra-low latency queries.

---

## 🛠️ Tech Stack

| Layer | Technology Used |
| :--- | :--- |
| **Frontend** | React, Vite, Recharts, TailwindCSS, Lucide React |
| **Backend** | FastAPI, Uvicorn, Python 3.1x |
| **Database** | SQLite / Relational Core |
| **AI Processing**| OpenAI API Engine |

---

## 📦 Project Structure

```text
avit-itech-agent/
├── main.py                 # FastAPI Application Entry point
├── .env                    # Local Environment Configuration (Ignored by Git)
├── .gitignore              # Git Rules Framework
├── frontend/               # React Client Workspace
│   ├── src/
│   │   ├── App.jsx         # Primary Dashboard Layout Matrix
│   │   └── main.jsx        # Frontend Core Bootstrapper
│   ├── package.json
│   └── vite.config.js
└── README.md               # Documentation Engine
⚙️ Setup & Installation
Prerequisite Checklist
Python 3.1x or higher installed

Node.js & npm installed

Git CLI tool configured

1. Backend Engine Initialization
Navigate to the root directory and install your core python service configurations:

Bash
pip install fastapi uvicorn
Create a .env file in the root directory and securely append your processing key:

Code snippet
OPENAI_API_KEY=your_secret_api_key_here
Launch the asynchronous live application server:

Bash
python -m uvicorn main:app --reload
The server thread will spin up actively on: http://127.0.0.1:8000

2. Frontend Interface Initialization
Open a separate, second terminal window, shift context to the client package layer, and deploy dependencies:

Bash
cd frontend
npm install lucide-react recharts
Fire up the local Vite client server thread:

Bash
npm run dev
The application UI panel will go live instantly on: http://localhost:5173/

🧪 Quick Verification Pass
Launch both the backend and frontend terminals simultaneously.

Direct your browser search engine path to http://localhost:5173/.

Input this prompt sequence into the central interaction matrix:

Show me a bar chart of the top 5 highest selling products

Click Execute and watch the system construct data columns smoothly. Toggle the internal visualization modes instantly using the layout utilities.

📄 License
Distributed under the MIT License. See LICENSE for more information.


---

### 🚀 Push the Documentation to GitHub Now
To get this README on your public page right away, open your terminal and run these 3 quick commands:

```powershell
git add README.md
git commit -m "Docs: Implement professional repository architectural README documentation"
git push origin main
