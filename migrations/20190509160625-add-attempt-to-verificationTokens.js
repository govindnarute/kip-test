'use strict';

module.exports = {
    up(queryInterface) {
        const alterVerificationTokensTable = `
        ALTER TABLE verificationTokens
            ADD attempt TINYINT NOT NULL DEFAULT 0 COMMENT '0 attempt on Sign Up' AFTER isUsed;
        `.replace(/\s+/ig, ' ').trim();
        return queryInterface.sequelize.query(alterVerificationTokensTable);
    },
    down(queryInterface) {
        const alterVerificationTokensTable = `
        ALTER TABLE verificationTokens           
            DROP COLUMN attempt;
        `.replace(/\s+/ig, ' ').trim();
        return queryInterface.sequelize.query(alterVerificationTokensTable);
    }
};
