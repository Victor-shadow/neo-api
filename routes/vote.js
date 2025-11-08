const express = require('express');
const Vote = require('../models/Vote');
const Receipt = require('../models/Receipt');
const {verifyToken} = require('../middleware/auth');
const solanaService = require('../services/solanaService');

const router = express.Router();

// Cast a vote
router.post('/', verifyToken, async(req, res) => {
  try {
    const {electionId, candidateId} = req.body;

    // Check if user has already voted in the election
    const existingVote = await Vote.findByUserId(req.user.id).find(vote => vote.electionId == electionId);
    if(existingVote){
        return res.status(400).json({error: 'User has already voted in this election'}); 
    }

    //Cast vote on Solana Blockchain
    const transactionHash = await solanaService.castVote(electionId, candidateId, req.user.id);

    // Save vote in database
    const vote = await Vote.create({
        userId: req.user.id,
        electionId,
        candidateId,
        transactionHash
    });

    // Generate and save receipt
    const receiptData = {
        voteId: vote.id,
        electionId,
        candidateId,
        transactionHash,
        timestamp: new Date().toISOString()
    };

    const receipt = await Receipt.create({voteId: vote.id, receiptData });
    res.status(201).json({message: 'Vote cast successfully', vote, receipt});

  } catch(error){
    console.error('Error casting votes:', error);
    res.status(500).json({error: 'Internal server error'});
  }
});

//Get user's votes
router.get('/user-votes', verifyToken, async(req, res) => {
    try{
        const votes = await Vote.findByUserId(req.user.id);
        res.json({votes});
    } catch(error){
        console.error('Error fetching user votes:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

//Get Vote by ID
router.get('/:id', verifyToken, async (req, res) => {
    try{
        const vote = await Vote.findById(req.params.id);
        if(!vote){
            return res.status(404).json({error: 'Vote not found'});
        }

        //Check if user owns a vote
        if(vote.user_id !== req.user.id){
         return res.status(403).json({error: 'Access denied'});
        }
        res.json({vote});
    } catch(error){
        console.error('Error fetching vote:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});
module.exports = router;