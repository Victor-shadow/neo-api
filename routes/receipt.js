const express = require('express');
const Receipt = require('../models/Receipt');
const Vote = require('../models/Vote');
const {verifyToken} = require('../middleware/auth');

const router = express.Router();

//Get receipt for a vote
router.get('/:voteId', verifyToken, async (req, res) => {
    try{
        const vote = await Vote.findById(req.params.voteId);
        if(!vote){
            return res.status(404).json({ error: 'Vote not found'});
        }
        //check if this user owns this vote
        if(vote.user_id !== req.user.id){
            return res.status(403).json({error: 'Access denied'});
        }

        const receipt = await Receipt.findByVoteId(req.params.voteId);
        if(!receipt){
            return res.status(404).json({error: 'Receipt not found'});
        }

        res.json({receipt});
    } catch(error){
        console.error('Error fetching receipt:',error);
        res.status(500).json({error: 'Internal server error'});

    }
});

module.exports = router;
