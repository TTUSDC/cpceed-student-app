import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Auth from './Auth.jsx';

describe('Auth.jsx', () => {
  it('Changes tabs', () => {
    const authTest = shallow(<Auth authCancelled={() => {}} />);
    authTest.instance().handleTabChange(null, 'two');
    expect(authTest.state().index).to.equal('two');
  });
});
