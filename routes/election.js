const express = require('express');
const Election = require('../models/Election');
const Vote = require('../models/Vote');
const {verifyToken} = require('../middleware/auth');

const router = express.Router();

//Create a new election
router.post('/', verifyToken, async (req, res) => {
    try{
        const election = await Election.create(req.body);
        res.status(201).json({message: 'Election created successfully', election});

    } catch(error){
        console.error('Error creating election:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

//Get all elections
router.get('/', async(req, res) => {
    try{
        const elections = await Election.findAll();
        res.json({elections});
    } catch(error){
        console.error('Error fetching elections: ', error);
        res.status(500).json({error: 'Internal server error'});

    }
});

//Get election by ID
router.get('/:id', async(req, res) => {
   try{
    const election = await Election.findById(req.params.id);
    if(!election){
        return res.status(404).json({error: 'Election not found'});

    }
    res.json({election});
   }  catch(error){
    console.error('Error fetching election: ', error);
    res.status(500).json({error: 'Internal server error'});
   }
});

//Update elections
router.put('/:id', verifyToken, async(req, res)=> {
    try{
        const election = await Election.update(req.params.id, req.body);
        if(!election){
            return res.status(404).json({error: 'Election not found'});

        }
        res.json({message: 'Election updated successfully', election});

    } catch(error){
        console.error('Error updating election:', error);
        res.status(500).json({error: 'Internal server error'})
    }
});

// Delete election
router.delete('/id:', verifyToken, async(req, res) => {
    try{
        const election = await Election.delete(req.params.id);
        if(!election){
            return res.status(404).json({error: 'Election not found'});
        }
        res.json({message: 'Election deleted successfully'})
    } catch(error){
        console.error('Error deleting election:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

// Get election results
router.get('/:id/results', async(req, res) => {
    try{
        const election = await Election.findById(req.params.id);
        if(!election){
            return res.status(404).json({error:'Election not found'});
        }

        const totalVotes = await Vote.countByElectionId(req.params.id);
        const results = [];

        for(const candidate of election.candidates){
            const voteCount = await Vote.countByCandidateId(req.params.id, candidate.id);
            results.push({
                candidate: candidate.name,
                votes: voteCount,
                percentage: totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0           
            });
        }

        res.json({election: election.title, totalVotes, results});
    } catch(error){
        console.error('Error fetching election results:', error);
        res.status(500).json({error: 'Internal server error'});    
    }
});

module.exports = router;