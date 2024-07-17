const { User } = require('../models/user.model');
const { TicketAssigment } = require('../models/ticketassignment.model');
const redisClient = require('./redis');

const assignAgent = async (ticketId, level = 'l1') => {
    let agent = await findAvailableAgent(level);
    
    if (!agent) {
        return {
            ticketId,
            agentAssignment: [],
            currentEscalationLevel: level,
            ticketStatus: 'waiting',
            createdAt: Date.now()
        };
    }

    return {
        ticketId,
        agentAssignment: [{
            agentId: agent._id,
            ticketStatus: 'assigned',
            agentComment: '',
            issueType: ''
        }],
        currentEscalationLevel: level,
        ticketStatus: 'active',
        createdAt: Date.now()
    };
};

const findAvailableAgent = async (level) => {
    const agent = await User.findOne({ userLevel: level, accountStatus: 'active' });
    return agent;
};

const escalateTicket = async (ticketId, currentLevel) => {
    const nextLevel = getNextLevel(currentLevel);
    return await assignAgent(ticketId, nextLevel);
};

const getNextLevel = (currentLevel) => {
    const levels = ['l1', 'l2', 'l3', 'admin', 'cxo'];
    const currentIndex = levels.indexOf(currentLevel);
    return currentIndex !== -1 && currentIndex < levels.length - 1 ? levels[currentIndex + 1] : 'others';
};

module.exports = {
    assignAgent,
    escalateTicket
};
