import { UserDto } from "./UserDto";
import { UserProfessionalDto } from "../userProfessionals";
import { UserCoachDto } from "../userCoaches";
import { StudentSchoolDto } from "../studentSchools";
import { UserCompensationsDto } from "../userCompensations/UserCompensationsDto";
import { UserAvailabilityDto } from "../userAvailability/UserAvailabilityDto";

/**
 * @extends UserDto
 */
export class UserFullProfileDto extends UserDto {
  constructor(userProfile) {
    super(userProfile);
    /**
     * @type {object}
     */
    this.professional = userProfile.get("userProfessional")
      ? new UserProfessionalDto(userProfile.get("userProfessional"))
      : null;

    /**
     * @type {object}
     */
    this.coach = userProfile.get("userCoach")
      ? new UserCoachDto(userProfile.get("userCoach"))
      : null;

    /**
     * @type {object}
     */
    this.school = userProfile.get("studentSchool")
      ? StudentSchoolDto.schoolArray(userProfile.get("studentSchool"))
      : [];

    /**
     * @type {object}
     */
    this.compensation = userProfile.get("userCompensation")
      ? new UserCompensationsDto(userProfile.get("userCompensation"))
      : null;

    /**
     * @type {object}
     */
    this.availability = userProfile.get("userAvailability")
      ? new UserAvailabilityDto(userProfile.get("userAvailability"))
      : null;
  }

  static get schema() {
    return {
      title: "UserFullProfileSchema",
      type: "object",
      allOf: [
        super.schema,
        {
          type: "object",
          required: [],
          properties: {
            professional: UserProfessionalDto.schema,
            coach: UserCoachDto.schema,
            school: {
              type: "array",
              items: StudentSchoolDto.schema
            },
            compensation: UserCompensationsDto.schema,
            availability: UserAvailabilityDto.schema
          }
        }
      ]
    };
  }
}
