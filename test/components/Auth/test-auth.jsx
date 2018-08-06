require('setup.js');
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Auth from 'layout/Auth/components/Auth.jsx';

describe('Auth.jsx', () => {
  it('Changes tabs', () => {
    const authTest = shallow(<Auth authCancelled={() => {}} />);
    authTest.instance().handleTabChange(1);
    expect(authTest.state().index).to.equal(1);
  });
});
