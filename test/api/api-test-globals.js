const mockgoose = require('mockgoose');
const mongoose = require('mongoose');
const chai = require('chai');
const sinon = require('sinon');

chai.use(require('chai-shallow-deep-equal'));
chai.use(require('chai-moment'));
chai.use(require('sinon-chai'));


global.mockgoose = mockgoose;
global.mongoose = mongoose;
global.sinon = sinon;
global.expect = chai.expect;
global.should = chai.should();
