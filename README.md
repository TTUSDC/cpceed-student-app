[![Build Status](https://travis-ci.org/TTUSDC/cpceed-student-app.svg?branch=master)](https://travis-ci.org/TTUSDC/cpceed-student-app)

# CPCEED Web App
This is a time logging app for the CPCEED program at Texas Tech University.

## Get Involved
Check out `CONTRIBUTING.md` in the `.github` folder of this project to learn about how to get started.

## Testing

Note: you have to rebuild if you alter the dependencies or code.
Altering dependecies will result in a long rebuild.
Altering code should be quick.

- Build test container: `docker build -f test.Dockerfile -t ttusdc/cpceed-student-app:test .`
- Run test container: `docker run -t --rm ttusdc/cpceed-student-app:test`
