export default class LocationsService {
  constructor({ DBConnection }) {
    this.Location = DBConnection.model('Location');
  }

  /**
   * Get location by id
   * @param locationId
   * @returns {Promise.<Promise.<Model>|Bluebird<any | TInstance>>}
   */
  async getLocationById(locationId) {
    return this.Location.findByPk(locationId);
  }
}
