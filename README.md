# Strapi plugin routes permissions

Manage easly routes permissions from routes configuration files.

## ⏳ Installation

```bash
npm i -S strapi-plugin-routes-permissions
```

To restart the configuration of the routes each time the server is restarted, use the configureRoutesPermissions method in a bootstrap.

Example
 
``config/functions/bootstrap.js``
````javascript
module.exports = async () => {
  await strapi.plugins['routes-permissions'].services.routespermissions.configureRoutesPermissions()
};
````

If you want to run the route configuration only once, you can use the same method with my other plugin https://www.npmjs.com/package/strapi-plugin-migrations.

Example

``migrations/v1_configureRoutesPermissions.js``
````javascript
module.exports = async () => {
  await strapi.plugins['routes-permissions'].services.routespermissions.configureRoutesPermissions()
};
````

## ⚙ Configuration
Just add `permissions` key in your routes methods and the roles type permission value.

Example

``api/test/config/routes.js``

````json
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

## 🤝 Contributing

Feel free to fork and make a Pull Request to this plugin project. All the input is warmly welcome!

## ⭐️ Show your support

Give a star if this project helped you.