import { authPaths } from './auth-docs';

const docsets = [
  {
    paths: authPaths,
    definitions: null,
  },
];

export const swaggerDefinition = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'Escucourses - API',
    description: "Escoucourses's Restful API used by the Client",
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  host: '127.0.0.1:3000',
  basePath: '/',
  tags: [
    {
      name: 'Authentication',
      description: 'Authentication related endpoints',
    },
  ],
  schemes: ['https', 'http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {},
  definitions: {},
};

docsets.forEach((docset) => {
  if (docset.paths) {
    const pathsKeys = Object.keys(docset.paths);

    pathsKeys.forEach((key) => {
      swaggerDefinition.paths[key] = docset.paths[key];
    });
  }

  if (docset.definitions) {
    const definitionsKeys = Object.keys(docset.definitions);

    definitionsKeys.forEach((key) => {
      swaggerDefinition.definitions[key] = docset.definitions[key];
    });
  }
});
