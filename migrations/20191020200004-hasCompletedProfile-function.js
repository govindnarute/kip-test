'use strict';

module.exports = {
	up(queryInterface) {
		const createHasCompletedProfileFunction = `
		CREATE FUNCTION hasCompletedProfile (_userId int(11)) RETURNS BOOL
		BEGIN
			DECLARE _identities tinyint;
		
			SELECT identities INTO _identities FROM users
			WHERE id = _userId
				 AND firstName IS NOT NULL AND firstName != ''
				AND lastName IS NOT NULL AND lastName != ''
				AND email IS NOT NULL AND email != ''
				AND isVerified;
		
			 IF _identities IS NULL THEN
				RETURN FALSE;
			END IF;

			SELECT identities INTO _identities FROM users WHERE id = _userId;
		
			IF _identities & 0b1 AND (SELECT NOT EXISTS(SELECT 1 FROM studentSchools WHERE userId = _userId AND isCurrent)) THEN
				RETURN FALSE;
			END IF;
		
			IF _identities & 0b10 AND (SELECT NOT EXISTS(SELECT 1 FROM studentSchools WHERE userId = _userId AND NOT isCurrent)) THEN
				RETURN FALSE;
			END IF;
		
			IF _identities & 0b100 AND (SELECT NOT EXISTS(
				SELECT * FROM userProfessionals AS p
					INNER JOIN professionalCompanies AS c ON p.id = c.userProfessionalId
					INNER JOIN professionalFunctions AS f ON p.id = f.userProfessionalId
					INNER JOIN professionalIndustries AS i ON p.id = i.userProfessionalId
					WHERE p.userId = _userId
				)) THEN
				RETURN FALSE;
			END IF;
		
			IF _identities & 0b1000
				AND (SELECT NOT EXISTS(SELECT 1 FROM userCoaches AS c INNER JOIN coachExpertise AS e ON e.userCoachId = c.id WHERE userId = _userId AND c.yearOfExperience > 0)) THEN
					RETURN FALSE;
			END IF;
		
			RETURN TRUE;
		END;
`.replace(/\s+/ig, ' ').trim();

		return queryInterface.sequelize.query(createHasCompletedProfileFunction);
	},
	down(queryInterface) {
		return queryInterface.sequelize.query('DROP FUNCTION IF EXISTS hasCompletedProfile;');
	}
};
