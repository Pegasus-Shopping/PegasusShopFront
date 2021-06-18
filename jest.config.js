module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testEnvironment: "jsdom",
  modulePaths: [
    "/shared/vendor/modules",
  ],
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(js|jsx)$",
  moduleFileExtensions: [
    "js",
    "jsx",
  ],
  moduleDirectories: [
    "node_modules",
    "bower_components",
    "shared",
    "Server",
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css)$": "identity-obj-proxy",
  },
};
