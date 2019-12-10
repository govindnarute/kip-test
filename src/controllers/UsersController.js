import { UnprocessableError, NotFoundError } from "../utils/http";
import { PasswordHelper } from "../helpers/PasswordHelper";
import { UserSessionDto } from "../models/users/UserSessionDto";
import { UserDto } from "../models/users/UserDto";
import { SessionDto } from "../models/sessions/SessionDto";
import { EmptyDto } from "../base/EmptyDto";
import { SessionType } from "../resources/sessions";
import { tokenTypes } from "../resources/users";
import { MaskHelper } from "../helpers/MaskHelper";
import { UserFullProfileDto } from "../models/users/UserFullProfileDto";
import { UserCompensationsDto } from "../models/userCompensations";
import { UserAvailabilityDto } from "../models/userAvailability";
import { ProvidersDto } from "../models/users/ProvidersDto";

export default class UsersController {
  constructor({
    SessionsService,
    UsersService,
    MailerService,
    VerificationsService,
    ImagesService,
    UsersImagesService,
    LocationsService
  }) {
    this.sessionsService = SessionsService;
    this.usersService = UsersService;
    this.mailerService = MailerService;
    this.verificationsService = VerificationsService;
    this.imagesService = ImagesService;
    this.usersImagesService = UsersImagesService;
    this.locationsService = LocationsService;
  }

  /**
   * @param {e.Request} request
   * @returns {Promise<UserDto>}
   */
  async getProvider(request) {
    const scope = ["withLocation"];

    let user = await this.usersService.getUserById(
      request.params.providerId,
      scope
    );

    if (!user) {
      throw new NotFoundError("USER_NOT_FOUND");
    }

    const mask = MaskHelper.parseMaskToFlags(user.identities);

    if (mask.isStudent || mask.isAlum) {
      scope.push("withStudentSchool");
    }
    if (mask.isProfessional) {
      scope.push("withUserProfessional");
    }
    if (mask.isCoach) {
      scope.push("withUserCoach");
    }
    if (mask.isProfessional || mask.isCoach) {
      scope.push("withUserCompensation", "withUserAvailability");
    }

    user = await this.usersService.getUserById(
      request.params.providerId,
      scope
    );

    return new UserFullProfileDto(user);
  }

  /**
   * @param {e.Request} request
   * @returns {Promise<ProvidersDto>}
   */
  async getProviders(request) {
    const list = await this.usersService.getProviders(
      request.query,
      request.user.userId
    );

    return new ProvidersDto(list);
  }

  /**
   * @param {e.Request} request
   * @returns {Promise<UserSessionDto>}
   */
  async createUser(request) {
    let user = await this.usersService.getUserByEmail(request.body.email);

    if (user) {
      throw new UnprocessableError("EMAIL_ALREADY_EXIST");
    }

    user = await this.usersService.createUser(request.body);
    const token = await this.verificationsService.generateToken(
      user,
      request.body.tokenLifeTime
    );
    await this.verificationsService.saveToken(
      user.id,
      token,
      tokenTypes.verification
    );

    this.mailerService.sendVerificationEmail(user, token);

    const tokens = await this.sessionsService.create(user.id, {
      type: SessionType.User,
      lifeTime: request.body.lifeTime
    });

    return new UserSessionDto(new UserDto(user), new SessionDto(tokens));
  }

  /**
   * @param {e.Request} request
   * @returns {Promise<UserDto>}
   */
  async updateProfile(request) {
    let user = await this.usersService.getUserById(request.user.userId);

    if (!user) {
      throw new NotFoundError("USER_NOT_FOUND");
    }

    if (request.body.location && user.locationId !== request.body.location.id) {
      const location = await this.locationsService.getLocationById(
        request.body.location.id
      );

      if (!location) {
        throw new NotFoundError("LOCATION_NOT_FOUND");
      }
    }

    request.body.locationId =
      request.body.location === null ? null : request.body.location.id;

    // set mask based on checkboxes
    request.body.identities = MaskHelper.setMask(request.body.identities);

    await user.update(request.body);
    user = await this.usersService.getUserById(request.user.userId, [
      "withLocation"
    ]);

    return user.toDto();
  }

  /**
   * @param {e.Request} request
   * @returns {Promise<UserDto>}
   */
  async profile(request) {
    const scope = ["withLocation"];
    let user = await this.usersService.getUserById(request.user.userId, scope);

    if (!user) {
      throw new NotFoundError("USER_NOT_FOUND");
    }

    const mask = MaskHelper.parseMaskToFlags(user.identities);

    if (mask.isStudent || mask.isAlum) {
      scope.push("withStudentSchool");
    }
    if (mask.isProfessional) {
      scope.push("withUserProfessional");
    }
    if (mask.isCoach) {
      scope.push("withUserCoach");
    }
    if (mask.isProfessional || mask.isCoach) {
      scope.push("withUserCompensation", "withUserAvailability");
    }

    user = await this.usersService.getUserById(request.user.userId, scope);

    return new UserFullProfileDto(user);
  }

  /**
   * @param {e.Request} request
   * @returns {UserDto}
   */
  async changePassword(request) {
    const user = await this.usersService.getUserById(request.user.userId);

    if (!user) {
      throw new UnprocessableError("USER_NOT_FOUND");
    }

    if (
      !PasswordHelper.compare(
        `${request.body.password}${user.salt}`,
        user.password
      )
    ) {
      throw new UnprocessableError("CURRENT_PASSWORD_INVALID");
    }

    await user.update({ password: request.body.newPassword });

    return new EmptyDto();
  }

  /**
   * Add avatar to user
   * @param request
   * @returns {Promise.<EmptyDto>}
   */
  async addAvatarToUser(request) {
    const userImage = await this.usersImagesService.getByUser(
      request.user.userId
    );

    await this.imagesService.addAvatar(
      userImage,
      request.body.imageId,
      request.user.userId
    );

    return new EmptyDto();
  }

  /**
   * Set user compensations
   * @param request
   * @returns {Promise.<UserCompensationsDto>}
   */
  async setCompensations(request) {
    let userCompensation = await this.usersService.getUserCompensations(
      request.user.userId
    );

    if (userCompensation) {
      // TODO: if hideCompensation and isCompensationRequire is exist set to default values (this flag is not used)
      request.body.hideCompensation = false;
      request.body.isCompensationRequire = false;
      request.body.rate = request.body.rate || null;

      await userCompensation.update(Object.assign({}, request.body));
    } else {
      // TODO: set hideCompensation and isCompensationRequire to default values (this flags is not used)
      const data = {
        userId: request.user.userId,
        isCompensationRequire: false,
        hideCompensation: false,
        rate: request.body.rate || null,
        notes:
          request.body.notes || request.body.notes === ""
            ? request.body.notes
            : null
      };

      userCompensation = await this.usersService.saveUserCompensations(data);
    }

    return new UserCompensationsDto(userCompensation);
  }

  /**
   * Set user availability
   * @param request
   * @returns {Promise.<UserAvailabilityDto>}
   */
  async setAvailability(request) {
    let userAvailability = await this.usersService.getUserAvailability(
      request.user.userId
    );
    const dataForSave = {
      connections: request.body.connections,
      availableFor: request.body.availableFor.id
    };

    if (userAvailability) {
      await userAvailability.update(Object.assign({}, dataForSave));
    } else {
      dataForSave.userId = request.user.userId;
      userAvailability = await this.usersService.saveUserAvailability(
        dataForSave
      );
    }

    return new UserAvailabilityDto(userAvailability);
  }
}
