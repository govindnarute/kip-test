'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _url = require('url');

var _http = require('../../utils/http');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LinkedInService {
  constructor({ config, LoggerFactory }) {
    this.config = config;
    this.linkedInLogger = LoggerFactory.createLogger('Linked_In');
  }

  /**
   * Get LinkedIn accessToken by Auth Code
   * @param {object} params
   * @returns {Promise<string>}
   */
  async getAccessToken(params) {
    const { code, redirectUri } = params;
    const queryParams = new _url.URLSearchParams();

    queryParams.append('grant_type', this.config.linkedIn.grantType);
    queryParams.append('code', code);
    queryParams.append('redirect_uri', redirectUri);
    queryParams.append('client_id', this.config.linkedIn.clientId);
    queryParams.append('client_secret', this.config.linkedIn.secret);

    return (0, _nodeFetch2.default)('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'post',
      body: queryParams,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(data => data.json()).then(res => {
      if (res && res.error) {
        this.linkedInLogger.error('LinkedIn error:', res.error);
        throw new _http.UnauthorizedError('LINKEDIN_REQUEST_ERROR');
      }
      if (res && !res.access_token) {
        throw new _http.UnprocessableError('LINKEDIN_ERROR');
      }

      return res.access_token;
    });
  }

  /**
   * Get LinkedIn user profile by accessToken
   * @param {string} accessToken
   * @returns {Promise<object>}
   */
  async getUserInfo(accessToken) {
    return (0, _nodeFetch2.default)('https://api.linkedin.com/v2/me?projection=(id,localizedLastName,localizedFirstName,localizedHeadline,profilePicture(displayImage~:playableStreams))', {
      method: 'get',
      headers: { Authorization: 'Bearer ' + accessToken }
    }).then(res => res.json()).then(info => ({
      socialUserId: info.id,
      firstName: info.localizedFirstName ? info.localizedFirstName : null,
      lastName: info.localizedLastName ? info.localizedLastName : null,
      profilePicture: info.profilePicture ? this.getProfilePicture(info.profilePicture) : null,
      headline: info.localizedHeadline ? info.localizedHeadline : null
    })).then(user => {
      if (!user.socialUserId) {
        throw new _http.UnprocessableError('LINKEDIN_USER_ID_ERROR');
      }

      return (0, _nodeFetch2.default)('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
        method: 'get',
        headers: { Authorization: 'Bearer ' + accessToken }
      }).then(res => res.json()).then(emailData => {
        if (!emailData.elements[0] || !emailData.elements[0]['handle~']) {
          throw new _http.UnprocessableError('LINKEDIN_USER_EMAIL_ERROR');
        }

        user.email = emailData.elements[0]['handle~'].emailAddress;
        return user;
      });
    });
  }

  getProfilePicture(profilePicture) {
    if (!profilePicture['displayImage~'] || !profilePicture['displayImage~'].elements.length) {
      return null;
    }

    const pictureElement = profilePicture['displayImage~'].elements[profilePicture['displayImage~'].elements.length - 1];

    if (pictureElement.data['com.linkedin.digitalmedia.mediaartifact.StillImage'].storageSize.width < 400 || !pictureElement.identifiers.length) {
      return null;
    }

    return pictureElement.identifiers[0].identifier;
  }
}
exports.default = LinkedInService; /* eslint-disable node/prefer-global/url-search-params */
//# sourceMappingURL=LinkedInService.js.map