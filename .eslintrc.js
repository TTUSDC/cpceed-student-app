module.exports = {
  "extends": "airbnb",
  "env": {
    "mocha": true,
    "node": true,
    "browser": true
  },
  "parser": "babel-eslint",
  "plugins": ["chai-friendly"],
  "rules": {
    "no-unused-expressions": 0,
    "no-control-regex": 0,
    "keyword-spacing": 0,
    "chai-friendly/no-unused-expressions": 2,

    "import/no-extraneous-dependencies": 0,
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "import/prefer-default-export": 0,

    "jsx-quotes": [2, "prefer-single"],

    "react/jsx-filename-extension": 0,
    "react/destructuring-assignment": 0,
    "react/no-access-state-in-setstate": 0,
    "react/prefer-stateless-function": 0,
    "react/jsx-one-expression-per-line": 0,
    "react/jsx-wrap-multilines": 0,
  }
}
