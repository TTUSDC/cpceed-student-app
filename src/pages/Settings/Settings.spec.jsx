import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { Settings } from './Settings.jsx';

describe('Settings.jsx', () => {
  it('Pushes to the router', () => {
    const push = sinon.spy();
    const history = {
      push,
      location: { pathname: '' },
    };

    const wrapper = shallow(<Settings history={history} />);

    wrapper.find({ label: 'Profile' }).simulate('click');
    expect(push.calledOnce).to.equal(true);
  });
});
