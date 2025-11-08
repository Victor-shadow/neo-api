// Type definitions and interfaces for the NeoVote application

/**
 * @typedef {Object} User
 * @property {number} id - Unique identifier for the user
 * @property {string} name - User's full name
 * @property {string} email - User's email address
 * @property {String} password - User's password
 * @property {string} phone - User's phone number
 * @property {string} firebase_uid - Firebase UID for authentication
 * @property {Date} created_at - Account creation timestamp
 * @property {Date} updated_at - Last update timestamp
 */

/**
 * @typedef {Object} Election
 * @property {number} id - Unique identifier for the election
 * @property {string} title - Election title
 * @property {string} description - Election description
 * @property {Date} start_date - Election start date
 * @property {Date} end_date - Election end date
 * @property {Array<Candidate>} candidates - List of candidates
 * @property {Date} created_at - Election creation timestamp
 * @property {Date} updated_at - Last update timestamp
 */

/**
 * @typedef {Object} Candidate
 * @property {string} id - Unique identifier for the candidate
 * @property {string} name - Candidate's name
 * @property {string} description - Candidate's description
 * @property {string} image_url - URL to candidate's image
 */

/**
 * @typedef {Object} Vote
 * @property {number} id - Unique identifier for the vote
 * @property {number} user_id - ID of the user who cast the vote
 * @property {number} election_id - ID of the election
 * @property {string} candidate_id - ID of the selected candidate
 * @property {string} transaction_hash - Solana transaction hash
 * @property {Date} created_at - Vote creation timestamp
 */

/**
 * @typedef {Object} Receipt
 * @property {number} id - Unique identifier for the receipt
 * @property {number} vote_id - ID of the associated vote
 * @property {Object} receipt_data - Receipt data (JSON)
 * @property {Date} created_at - Receipt creation timestamp
 */

/**
 * @typedef {Object} VoteRequest
 * @property {number} electionId - ID of the election
 * @property {string} candidateId - ID of the selected candidate
 */

/**
 * @typedef {Object} ElectionRequest
 * @property {string} title - Election title
 * @property {string} description - Election description
 * @property {Date} startDate - Election start date
 * @property {Date} endDate - Election end date
 * @property {Array<Candidate>} candidates - List of candidates
 */

/**
 * @typedef {Object} UserRequest
 * @property {string} name - User's full name
 * @property {string} email - User's email address
 * @property {string} phone - User's phone number
 * @property {string} firebaseUid - Firebase UID
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Indicates if the request was successful
 * @property {string} message - Response message
 * @property {Object} data - Response data
 * @property {string} [error] - Error message (if applicable)
 */

module.exports = {};
