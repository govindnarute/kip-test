"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BasicHandler = require("../../base/BasicHandler");

var _UserDto = require("../../models/users/UserDto");

var _ProvidersDto = require("../../models/users/ProvidersDto");

var _UserFullProfileDto = require("../../models/users/UserFullProfileDto");

var _UserSessionDto = require("../../models/users/UserSessionDto");

var _userCompensations = require("../../models/userCompensations");

var _EmptyDto = require("../../base/EmptyDto");

var _UserAvailabilityDto = require("../../models/userAvailability/UserAvailabilityDto");

var _erros = require("../../resources/erros");

class UsersRoutesHandler extends _BasicHandler.BasicHandler {
  constructor(container) {
    super();
    this.container = container;
    this.apiRoot = "/users";
  }

  setup() {
    const controller = this.container.UsersController;
    this.addRoute({
      path: "/providers",
      method: "get",
      summary: "",
      description: "",
      tags: ["Users"],
      auth: true,
      consumes: this.container.BaseSearchListSchema,
      produces: _ProvidersDto.ProvidersDto.schema,
      responseStatus: _erros.HttpStatusCode.OK,
      beforeHooks: [this.container.UsersService.checkProfileCompleted.bind(this.container.UsersService)],
      handler: controller.getProviders.bind(controller)
    });

    this.addRoute({
      path: "/providers/:providerId",
      method: "get",
      summary: "Get provider API",
      description: "Get provider profile",
      tags: ["Users"],
      auth: true,
      consumes: this.container.ProviderIdSchema,
      produces: _UserFullProfileDto.UserFullProfileDto.schema,
      responseStatus: _erros.HttpStatusCode.OK,
      beforeHooks: [],
      handler: controller.getProvider.bind(controller)
    });

    this.addRoute({
      path: "/",
      method: "post",
      summary: "Register API",
      description: "Register new user API (User types: 1 - seeker, 2 - provider, 3 - both)",
      tags: ["Users"],
      auth: false,
      consumes: this.container.UserSignUpSchema,
      produces: _UserSessionDto.UserSessionDto.schema,
      responseStatus: _erros.HttpStatusCode.Created,
      beforeHooks: [],
      handler: controller.createUser.bind(controller)
    });

    this.addRoute({
      path: "/me",
      method: "put",
      summary: "Update profile API",
      description: "Open schema for see optional fields. Set 'location = null' to clear user location. Identity (Student, Alum, Teacher, Coach)",
      tags: ["Users"],
      auth: true,
      consumes: this.container.UpdateUserInfoSchema,
      produces: _UserDto.UserDto.schema,
      responseStatus: _erros.HttpStatusCode.OK,
      beforeHooks: [],
      handler: controller.updateProfile.bind(controller)
    });

    this.addRoute({
      path: "/me",
      method: "get",
      summary: "Get profile API",
      description: "Get users profile",
      tags: ["Users"],
      auth: true,
      consumes: this.container.EmptySchema,
      produces: _UserFullProfileDto.UserFullProfileDto.schema,
      responseStatus: _erros.HttpStatusCode.OK,
      beforeHooks: [],
      handler: controller.profile.bind(controller)
    });

    this.addRoute({
      path: "/me/password",
      method: "put",
      summary: "Change user password API",
      description: "Change current password",
      tags: ["Users"],
      auth: true,
      consumes: this.container.PasswordChangeSchema,
      produces: _EmptyDto.EmptyDto.schema,
      responseStatus: _erros.HttpStatusCode.NoContent,
      beforeHooks: [this.container.UsersService.checkUserVerification.bind(this.container.UsersService)],
      handler: controller.changePassword.bind(controller)
    });

    this.addRoute({
      path: "/me/avatar",
      method: "put",
      summary: "Add avatar to user",
      description: "Add avatar to user",
      tags: ["Users"],
      auth: true,
      consumes: this.container.ImageIdBodySchema,
      produces: _EmptyDto.EmptyDto.schema,
      responseStatus: _erros.HttpStatusCode.NoContent,
      beforeHooks: [this.container.ImagesService.checkUploadedImageForUse.bind(this.container.ImagesService)],
      handler: controller.addAvatarToUser.bind(controller)
    });

    this.addRoute({
      path: "/compensations",
      method: "put",
      summary: "Set user compensations",
      description: "Set user compensations (Professional or Coach Identity)",
      tags: ["Users"],
      auth: true,
      consumes: this.container.UserCompensationsSchema,
      produces: _userCompensations.UserCompensationsDto.schema,
      responseStatus: _erros.HttpStatusCode.OK,
      beforeHooks: [],
      handler: controller.setCompensations.bind(controller)
    });

    this.addRoute({
      path: "/availability",
      method: "put",
      summary: "Set user availability. Open Schema to see all parameters",
      description: "Set 'connections: null' to mark options as 'unlimited'. Available for types: 1 - Everyone, 2 - Only Students, 3 - Only Professionals, 4 - Only People From My School(s)",
      tags: ["Users"],
      auth: true,
      consumes: this.container.UserAvailabilitySchema,
      produces: _UserAvailabilityDto.UserAvailabilityDto.schema,
      responseStatus: _erros.HttpStatusCode.OK,
      beforeHooks: [this.container.UsersService.checkUserIdentities.bind(this.container.UsersService)],
      handler: controller.setAvailability.bind(controller)
    });
  }
}
exports.default = UsersRoutesHandler;
//# sourceMappingURL=UsersRoutesHandler.js.map