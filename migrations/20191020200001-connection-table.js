'use strict';

module.exports = {
    up(queryInterface) {
        const createConnectionTableSql = `
        CREATE TABLE connections (
            id int(11) NOT NULL AUTO_INCREMENT,
            fromUserId int(11) NOT NULL,
            toUserId int(11) NOT NULL,
            createdAt datetime DEFAULT CURRENT_TIMESTAMP,
            updatedAt datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY fromUser (fromUserId),
            KEY toUser (toUserId),
            CONSTRAINT connections_fromUser FOREIGN KEY (fromUserId) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
            CONSTRAINT connections_toUser FOREIGN KEY (toUserId) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
          );`
            .replace(/\s+/gi, ' ')
            .trim();

        return queryInterface.sequelize.query(createConnectionTableSql);
    },
    down(queryInterface) {
        return queryInterface.sequelize.query('DROP TABLE IF EXISTS connections;');
    }
};
