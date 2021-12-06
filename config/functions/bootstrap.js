'use strict';

module.exports = async () => {
  await strapi.plugins['strapi-plugin-routes-permissions'].services.routespermissions.configureRoutesPermissions()
};
