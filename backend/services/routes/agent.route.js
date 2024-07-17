const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agent.controller');

router.post('/', agentController.createAgent);
router.get('/', agentController.getAllAgents);
router.get('/:id', agentController.getAgentById);
router.put('/:id', agentController.updateAgent);
router.delete('/:id', agentController.deleteAgent);
router.post('/login', agentController.loginAgent);

module.exports = router;
