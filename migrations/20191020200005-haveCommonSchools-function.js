'use strict';

module.exports = {
	up(queryInterface) {
		const createHaveCommonSchools = `
		CREATE FUNCTION haveCommonSchools (_user1Id int(11), _user2Id int(11)) RETURNS BOOL
		BEGIN
			RETURN (SELECT EXISTS(
				SELECT 1 FROM studentSchools AS s1 WHERE s1.userId = _user1Id AND EXISTS(
					SELECT 1 FROM studentSchools AS s2 WHERE s2.userId = _user2Id AND s1.schoolId = s2.schoolId
				)
			));
		END;
`.replace(/\s+/ig, ' ').trim();

		return queryInterface.sequelize.query(createHaveCommonSchools);
	},
	down(queryInterface) {
		return queryInterface.sequelize.query('DROP FUNCTION IF EXISTS haveCommonSchools;');
	}
};
