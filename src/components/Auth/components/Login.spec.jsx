import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import FormHelperText from '@material-ui/core/FormHelperText';

import Login from './Login.jsx';

describe('Login.jsx', () => {
  let props;

  beforeEach(() => {
    props = {
      handleLogin: () => {},
      logErr: '',
      waiting: false,
      classes: {},
    };
  });

  it('Handles input changes', () => {
    const wrapper = shallow(<Login {...props} />).dive();
    const event = {
      target: {
        value: 'test@ttu.edu',
      },
    };

    wrapper.instance().handleInputChange('email')(event);
    expect(wrapper.state().email).to.equal('test@ttu.edu');
  });

  it('Displays server errors', () => {
    props.logErr = 'Message';
    const wrapper = shallow(<Login {...props} />).dive();

    expect(wrapper.contains(
      <FormHelperText error>
        {props.logErr}
      </FormHelperText>,
    )).to.equal(true);
  });

  it('Disables submit while waiting for server', () => {
    props.handleLogin = sinon.spy();
    props.waiting = true;
    const wrapper = shallow(<Login {...props} />).dive();

    wrapper.find('#login-button').simulate('click');
    expect(props.handleLogin.calledOnce).to.equal(false);
  });

  it('Calls handleLogin when submit is pressed', () => {
    props.handleLogin = sinon.spy();
    const wrapper = shallow(<Login {...props} />).dive();

    wrapper.find('#login-button').simulate('click');
    expect(props.handleLogin.calledOnce).to.equal(true);
  });
});
