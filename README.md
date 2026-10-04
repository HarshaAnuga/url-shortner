## Snip
A full-stack URL shortener built with the MERN stack. Snip converts long URLs into short, shareable links and generates a QR code for every shortened URL.

Features
Shorten long URLs into compact links.

Generate unique short URLs.

Redirect users to the original URL.

Generate QR codes for shortened links.

Copy generated links quickly.

Responsive and user-friendly interface.

Store shortened URLs in MongoDB.

REST API-based backend architecture.

Environment variable support for sensitive configuration.

Tech Stack
Frontend
React.js

HTML5

CSS3

JavaScript

Axios

Backend
Node.js

Express.js

MongoDB

Mongoose

Additional Tools
QR code generation library

REST APIs

dotenv

Git and GitHub

How It Works
Enter a long URL into Snip.

The application sends the URL to the backend.

The backend generates a unique short identifier.

The URL and identifier are stored in MongoDB.

Snip returns a shortened URL.

A QR code is generated for the shortened link.

Opening the short link redirects the user to the original URL.

Project Structure
text
snip/
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── App.jsx
│       └── main.jsx
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── .env
│
├── .gitignore
├── package.json
└── README.md
API Endpoints
Method	Endpoint	Description
POST	/api/urls/shorten	Creates a shortened URL
GET	/api/urls/:shortCode	Redirects to the original URL
GET	/api/urls/:shortCode/qr	Generates or returns the QR code
Example Request
text
POST /api/urls/shorten
Content-Type: application/json
json
{
  "originalUrl": "https://www.example.com/very-long-url"
}
Example Response
json
{
  "success": true,
  "originalUrl": "https://www.example.com/very-long-url",
  "shortUrl": "https://your-domain.com/abc123",
  "shortCode": "abc123",
  "qrCode": "data:image/png;base64,..."
}
Installation
Prerequisites
Make sure you have the following installed:

Node.js

npm

MongoDB

Git

Clone the Repository
bash
git clone https://github.com/your-username/snip.git
cd snip
Install Backend Dependencies
bash
cd server
npm install
Install Frontend Dependencies
bash
cd ../client
npm install
Environment Variables
Create a .env file inside the server directory:

text
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
BASE_URL=http://localhost:5000
Replace your_mongodb_connection_string with your MongoDB connection string.

Running the Application
Start the Backend
bash
cd server
npm run dev
The backend will run on:

text
http://localhost:5000
Start the Frontend
Open a new terminal:

bash
cd client
npm run dev
The frontend will run on:

text
http://localhost:5173
Screenshots
Add screenshots of your application here:

text
![Snip homepage](./screenshots/homepage.png)

![Generated short link](./screenshots/generated-link.png)

![QR code generation](./screenshots/qr-code.png)
Future Improvements
User authentication and personal dashboards.

Link expiration dates.

Click analytics and traffic tracking.

Custom aliases for shortened URLs.

Password-protected links.

Link management and deletion.

Dark mode.

Deployment with Docker and CI/CD.

Rate limiting and improved URL validation.

Learning Outcomes
Through this project, I learned how to:

Build a full-stack application using the MERN stack.

Create and consume REST APIs.

Connect a React frontend with an Express backend.

Store and retrieve data using MongoDB and Mongoose.

Generate unique identifiers for shortened URLs.

Implement URL redirection.

Generate QR codes dynamically.

Manage environment variables securely.

Structure a scalable full-stack project.

Contributing
Contributions are welcome.

Fork the repository.

Create a new branch.

bash
git checkout -b feature/your-feature
Commit your changes.

bash
git commit -m "Add your feature"
Push the branch.

bash
git push origin feature/your-feature
Open a pull request.

License
This project is licensed under the MIT License.
