const messageTemplate = (trackId, userId, message) => `
TRACK-ID : ${trackId} 
USER-ID : ${userId}
MESSAGE : ${message}
`;

module.exports = messageTemplate;
