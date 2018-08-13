/* eslint no-console: 0  */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { Login } from './Login.jsx';

describe('Login.jsx', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      handleLogin: () => {},
      logErr: '',
      waiting: false,
      classes: {},
    };

    wrapper = shallow(<Login {...props} />);
  });

  it('Handles input changes', () => {
    const event = {
      target: {
        value: 'test@ttu.edu',
      },
    };

    wrapper.instance().handleInputChange('email')(event);
    expect(wrapper.state().email).to.equal('test@ttu.edu');
  });

  it('button should be disabled when waiting prop is true', () => {
    wrapper.setProps({
      ...props,
      waiting: true,
    });

    const button = wrapper.find('#login-button');
    expect(button.props().disabled).to.equal(true);
  });

  it('button should be not disabled when waiting prop is false', () => {
    wrapper.setProps({
      ...props,
      waiting: false,
    });

    const button = wrapper.find('#login-button');
    expect(button.props().disabled).to.equal(false);
  });
});
