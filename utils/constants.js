const ELECTION_STATUS = {
    UPCOMING: 'upcoming',
    ACTIVE: 'active',
    ENDED: 'ended'
};

const VOTE_STATUS = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    FAILED: 'failed'
};

const USER_ROLES = {
    ADMIN: 'admin',
    VOTER: 'voter'
};


const ERROR_MESSAGES = {
    UNAUTHORIZED: 'Unauthorized access',
    INVALID_TOKEN: 'Invalid or expired token',
    USER_NOT_FOUND: 'User not found',
    ELECTION_NOT_FOUND: 'Election not found',
    VOTE_ALREADY_CAST: 'Vote already cast for the election',
    INVALID_CANDIDATE: 'Invalid candidate',
    ELECTION_ENDED: 'Election has ended',
    ELECTION_NOT_STARTED: 'Election has not started yet',

};

const SUCCESS_MESSAGES = {
   VOTE_CAST: 'Vote Cast sucessfully',
   ELECTION_CREATED: 'Election created successfully',
   USER_REGISTERED: 'User registered sucessfully',
   PROFILE_UPDATED: 'Profile updated successfully'
};

module.exports = {
    ELECTION_STATUS,
    VOTE_STATUS,
    USER_ROLES,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES
};
