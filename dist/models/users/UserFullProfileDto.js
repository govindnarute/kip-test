"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserFullProfileDto = undefined;

var _UserDto = require("./UserDto");

var _userProfessionals = require("../userProfessionals");

var _userCoaches = require("../userCoaches");

var _studentSchools = require("../studentSchools");

var _UserCompensationsDto = require("../userCompensations/UserCompensationsDto");

var _UserAvailabilityDto = require("../userAvailability/UserAvailabilityDto");

/**
 * @extends UserDto
 */
class UserFullProfileDto extends _UserDto.UserDto {
  constructor(userProfile) {
    super(userProfile);
    /**
     * @type {object}
     */
    this.professional = userProfile.get("userProfessional") ? new _userProfessionals.UserProfessionalDto(userProfile.get("userProfessional")) : null;

    /**
     * @type {object}
     */
    this.coach = userProfile.get("userCoach") ? new _userCoaches.UserCoachDto(userProfile.get("userCoach")) : null;

    /**
     * @type {object}
     */
    this.school = userProfile.get("studentSchool") ? _studentSchools.StudentSchoolDto.schoolArray(userProfile.get("studentSchool")) : [];

    /**
     * @type {object}
     */
    this.compensation = userProfile.get("userCompensation") ? new _UserCompensationsDto.UserCompensationsDto(userProfile.get("userCompensation")) : null;

    /**
     * @type {object}
     */
    this.availability = userProfile.get("userAvailability") ? new _UserAvailabilityDto.UserAvailabilityDto(userProfile.get("userAvailability")) : null;
  }

  static get schema() {
    return {
      title: "UserFullProfileSchema",
      type: "object",
      allOf: [super.schema, {
        type: "object",
        required: [],
        properties: {
          professional: _userProfessionals.UserProfessionalDto.schema,
          coach: _userCoaches.UserCoachDto.schema,
          school: {
            type: "array",
            items: _studentSchools.StudentSchoolDto.schema
          },
          compensation: _UserCompensationsDto.UserCompensationsDto.schema,
          availability: _UserAvailabilityDto.UserAvailabilityDto.schema
        }
      }]
    };
  }
}
exports.UserFullProfileDto = UserFullProfileDto;
//# sourceMappingURL=UserFullProfileDto.js.map