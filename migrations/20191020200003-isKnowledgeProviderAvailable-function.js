'use strict';

module.exports = {
    up(queryInterface) {
        const createIsKnowledgeProviderAvailable = `
        CREATE FUNCTION isKnowledgeProviderAvailable (_userId int(11)) RETURNS BOOL
        BEGIN
            RETURN (
                SELECT connections IS NULL OR (connections - (SELECT count(*) FROM connections WHERE toUserId = _userId AND createdAt > CURRENT_DATE - INTERVAL 1 MONTH) > 0)
                FROM userAvailability WHERE userId = _userId
            );
        END;
`.replace(/\s+/ig, ' ').trim();

        return queryInterface.sequelize.query(createIsKnowledgeProviderAvailable);
    },
    down(queryInterface) {
        return queryInterface.sequelize.query('DROP FUNCTION IF EXISTS isKnowledgeProviderAvailable;');
    }
};
