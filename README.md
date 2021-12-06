# Strapi plugin manage users permissions

Manage easly users permissions from routes configuration files.
Just add `permissions` key in your routes methods and the roles type permission value.

Example
````
{
  "routes": [
    {
      "method": "GET",
      "path": "/tests",
      "handler": "test.find",
      "config": {
        "policies": [],
        "permissions": { <-- add permissions key
          "public": true, <-- add role type and if you want enabled or not
          "authenticated": false
        }
      }
    },
    {
      "method": "POST",
      "path": "/tests",
      "handler": "test.create",
      "config": {
        "policies": [],
        "permissions": {
          "public": true,
        }
      }
    },
  ]
}
````

To restart the configuration of the routes each time the server is restarted, use the configureRoutesPermissions method in a bootstrap.

Example

``config/functions/bootstrap.js``
````
module.exports = async () => {
  await strapi.plugins['strapi-plugin-routes-permissions'].services.routespermissions.configureRoutesPermissions()
};
````

If you want to run the route configuration only once, you can use the same method with my other plugin https://www.npmjs.com/package/strapi-plugin-migrations.

Example

``migrations/v1_configureRoutesPermissions.js``
````
module.exports = async () => {
  await strapi.plugins['strapi-plugin-routes-permissions'].services.routespermissions.configureRoutesPermissions()
};
````
