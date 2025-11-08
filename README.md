# NeoVote Backend API

A blockchain-based voting system backend built with Node.js, Express, PostgreSQL, and Solana.

## Features

- User authentication via Firebase
- Election management
- Secure voting on Solana blockchain
- Vote receipts and verification
- SMS notifications via Twilio
- Push notifications via Firebase
- Rate limiting and security middleware

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- Firebase project with authentication enabled
- Solana wallet and devnet setup
- Twilio account for SMS

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/neovote-backend.git
   cd neovote-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Set up the database:
   - Create a PostgreSQL database
   - Run the schema creation script (see database setup below)

5. Start the development server:
   ```bash
   npm run dev
   ```

## Database Setup

Create the following tables in your PostgreSQL database:

```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  firebase_uid VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Elections table
CREATE TABLE elections (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  candidates JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Votes table
CREATE TABLE votes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  election_id INTEGER REFERENCES elections(id) ON DELETE CASCADE,
  candidate_id VARCHAR(255) NOT NULL,
  transaction_hash VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Receipts table
CREATE TABLE receipts (
  id SERIAL PRIMARY KEY,
  vote_id INTEGER REFERENCES votes(id) ON DELETE CASCADE,
  receipt_data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Elections
- `POST /api/elections` - Create a new election
- `GET /api/elections` - Get all elections
- `GET /api/elections/:id` - Get election by ID
- `PUT /api/elections/:id` - Update election
- `DELETE /api/elections/:id` - Delete election
- `GET /api/elections/:id/results` - Get election results

### Votes
- `POST /api/votes` - Cast a vote
- `GET /api/votes/my-votes` - Get user's votes
- `GET /api/votes/:id` - Get vote by ID

### Receipts
- `GET /api/receipts/:voteId` - Get receipt for a vote

## Environment Variables

See `.env.example` for all required environment variables.

## Development

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## Testing

```bash
npm test
```

## Deployment

1. Set `NODE_ENV=production` in your environment
2. Ensure all environment variables are set
3. Run database migrations if needed
4. Start the server with `npm start`

## Security

- Firebase authentication for user management
- Rate limiting on all endpoints
- Helmet for security headers
- Input validation and sanitization
- CORS configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
# neo-api
