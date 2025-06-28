📦 Setup Instructions

1. Clone the Repository
   bash
   git clone https://github.com/your-username/your-project-name.git
   cd your-project-name

2. Install Dependencies
   bash
   npm install
3. Environment Configuration
   Create a .env file in the root directory and add the following:
   PORT=3000
   MONGO_URI=mongodb://mongo:27017/horoscopeApp
   JWT_SECRET=your_jwt_secret_key

If you’re running MongoDB locally without Docker, use:
MONGO_URI=mongodb://localhost:27017/horoscopeApp

4. Start with Docker Compose
   This project uses Docker Compose to run both MongoDB and the Node server.

bash
docker-compose up --build
This will:

Start MongoDB container
Start Node.js server on http://localhost:3000

5. Rate Limiting
   Basic rate limiting is enabled using express-rate-limit:

Maximum 5 requests per minute per IP

If exceeded, the user will get:
json
{
"status": 429,
"message": "Too many requests. Please try again after a minute."
}
If the limit is exceeded, the server logs:

Edit
⚠️ Rate limit exceeded for IP: 127.0.0.1, Route: /api/user/horoscope/today

6. API Endpoints
   🔐 Auth
   POST /api/user/register – Register a new user
   POST /api/user/login – Login and receive JWT

🔮 Horoscope
POST /api/user/horoscope/today – Get today's horoscope (requires JWT)
GET /api/user/horoscope/history – Get last 7 days' horoscope (requires JWT)

For protected routes, pass the JWT token as:
Authorization: Bearer <token>

7. 🧪 View MongoDB Data (inside Docker any mongo-shell or mongocompass)
   Connect to your MongoDB container:

docker exec -it mongodb 
Then run inside the shell:
use horoscopeApp
db.users.find().pretty()


8. 📘 Swagger API Documentation
   Swagger is integrated to help you explore and test API routes via a web UI.
   Start your server.
   Visit: http://localhost:3000/api-docs




9.🧠 Design Decisions
Modular Structure: Code is split into controllers, routes, services, and middleware for maintainability and scalability.

Dockerized Setup: The app runs in isolated containers for MongoDB and the Node.js server, simplifying local and team-based development.

Rate Limiting: Implemented via express-rate-limit to protect critical endpoints (/login, /register, /horoscope) against abuse or brute-force attacks.

JWT Authentication: Token-based authentication ensures secure access to protected endpoints like /horoscope/today and /history.

Zodiac Calculation: On registration, the user's birthdate is used to derive and store their zodiac sign for horoscope personalization.

Swagger Integration: Auto-generates interactive API documentation from route annotations, improving usability for developers and API consumers.


10.⏳ Improvements with More Time
MongoDB Indexing: Add indexes on frequently queried fields like email or zodiacSign for faster lookups.

User Verification: Add email verification on signup for added security and trust.

Logging & Monitoring: Integrate Winston or Morgan with centralized logging (e.g., LogDNA, Datadog).

Rate Limiting Per User: Enhance rate limiting to consider user ID (via JWT), not just IP, for more granular control.

Caching: Cache daily/weekly horoscope responses (e.g., with Redis) to reduce recomputation and improve response time.

Tests: Add unit and integration tests using Jest or Mocha for stability and CI/CD readiness.

