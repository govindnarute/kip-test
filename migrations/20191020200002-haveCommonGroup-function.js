'use strict';

module.exports = {
	up(queryInterface) {
		const createHaveCommonGroups = `
		CREATE FUNCTION haveCommonGroups (_user1Id int(11), _user2Id int(11)) RETURNS BOOL
	BEGIN
		RETURN FALSE;
	END;
`.replace(/\s+/ig, ' ').trim();

		return queryInterface.sequelize.query(createHaveCommonGroups);
	},
	down(queryInterface) {
		return queryInterface.sequelize.query('DROP FUNCTION IF EXISTS haveCommonGroups;');
	}
};
