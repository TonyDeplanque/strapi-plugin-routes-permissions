'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */
const fs = require('fs');
const fg = require('fast-glob');

module.exports = {
  async configureRoutesPermissions() {
    const roles = await strapi
      .query("role", "users-permissions")
      .find()

    const findRoleByType = (type) => {
      return roles.find(role => role.type === type)
    }

    const routesPath = fg.sync(['**/config/routes.json'], {dot: true});
    routesPath.forEach(routePath => {
      fs.readFile(routePath, async (err, data) => {
        if (err) {
          console.log("File can't be read", err)
          return
        }

        let parsing = {routes: []}
        try {
          parsing = JSON.parse(data)
        } catch (err) {
          console.warn(`Error during parsing JSON data for ${routePath}`, err)
          return
        }

        for (const route of parsing.routes) {
          const permissions = route.config?.permissions
          if (permissions) {
            const {handler} = route;
            const [controller, action] = handler.split('.')
            const rolesTypes = Object.keys(permissions || {})

            for (const roleType of rolesTypes) {
              const role = findRoleByType(roleType.toLowerCase())
              if (!role) {
                console.warn(`Role permission "${roleType}" for controller : "${controller}" and action : "${action}" is not found in ${routePath}`)
                continue
              }

              try {
                await strapi
                  .query("permission", "users-permissions")
                  .update({
                    controller: controller.toLowerCase(),
                    action: action.toLowerCase(),
                    role: role.id
                  }, {enabled: permissions[roleType]})
              } catch (e) {
                console.log('ERROR', e)
              }

            }
          }
        }
      })
    })
  }
};
