// @flow

// Input Error handling is tested in FormChecker.spec.jsx
// Server Error handling will be handled by redux

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { Account } from './Account.jsx';
import type { Props, State } from './Account.jsx';

describe('Account.jsx', () => {
  let props: Props;
  let wrapper;

  // Prop Method Spies
  let handlePasswordSpy = sinon.spy()
  let handleEmailSpy = sinon.spy()

  let handlePasswordChangeSubmitSpy;
  let handleEmailChangeSubmitSpy;
  let checkForPasswordErrorsSpy;
  let checkForEmailErrorsSpy;
  let errorHandlerSpy;

  beforeEach(() => {
    props = {
      handlePassword: handlePasswordSpy,
      handleEmail: handleEmailSpy,
      user: {
        email: '',
      },
      passErr: '',
      confirmErr: '',
      emailErr: '',
      newPassErr: '',
      waiting: {
        password: false,
        email: false,
      },
      validate: (name: string, newValues: State ) => null,
      classes: {},
    };
    wrapper = shallow(<Account {...props} />);

    handlePasswordChangeSubmitSpy = sinon.spy(wrapper.instance(), 'handlePasswordChangeSubmit');
    handleEmailChangeSubmitSpy = sinon.spy(wrapper.instance(), 'handleEmailChangeSubmit');
    checkForEmailErrorsSpy = sinon.spy(wrapper.instance(), 'checkForEmailErrors');
    checkForPasswordErrorsSpy = sinon.spy(wrapper.instance(), 'checkForPasswordErrors');
    errorHandlerSpy = sinon.spy(wrapper.instance(), 'errorHandler');
  });

  afterEach(() => {
    handlePasswordSpy.resetHistory();
    handleEmailSpy.resetHistory();
    handleEmailChangeSubmitSpy.resetHistory();
    handlePasswordChangeSubmitSpy.resetHistory();
    checkForPasswordErrorsSpy.resetHistory();
    checkForEmailErrorsSpy.resetHistory();
  })

  it('should handle input changes to password', () => {
    const testValue = 'test';
    const event = { target: { value: testValue } };

    // Set temporary values to check if the values are cleared
    wrapper.setState({
      confirmPass: 'temp',
    });
    wrapper.setProps({
      confirmErr: 'temp',
    })

    wrapper.instance().handleInputChange('password')(event);
    expect(wrapper.state().password).to.equal(testValue);
    expect(wrapper.state().confirmPass).to.equal('');
  });

  it('should handle input changes to confirm password', () => {
    const testValue = 'anothertest';
    const event = { target: { value: testValue } };

    wrapper.instance().handleInputChange('confirmPass')(event);
    expect(wrapper.state().confirmPass).to.equal(testValue);
  });

  it('should handle input changes to new password', () => {
    const testValue = 'moretests';
    const event = { target: { value: testValue } };

    wrapper.instance().handleInputChange('newPassword')(event);
    expect(wrapper.state().newPassword).to.equal(testValue);
  });

  // TODO: These spies are not being created correctly. Passes manual test but not the written ones
  it('should call handlePasswordChangeSubmit when button is pressed', () => {
    wrapper.find('#password-submit-button').simulate('click');
    expect(handlePasswordChangeSubmitSpy.calledOnce).to.equal(true);
  });

  it('should call handleEmailChangeSubmit when button is pressed', () => {
    wrapper.find('#email-submit-button').simulate('click');
    expect(handleEmailChangeSubmitSpy.calledOnce).to.equal(true);
  });

  it('should always check for errors when we click sumbit, even if there are errors', () => {
    const emailSubmitButton = wrapper.find('#email-submit-button');

    // set props without errors
    wrapper.setProps({...props})
    emailSubmitButton.simulate('click');
    expect(checkForEmailErrorsSpy.calledOnce).to.equal(true);

    // reset call count
    checkForEmailErrorsSpy.resetHistory();

    // set props with errors
    wrapper.setProps({
      ...props,
      passErr: 'Hello!',
      confirmErr: 'This is an error!',
      emailErr: 'A need more values to put here',
      newPassErr: 'I am running out of ideas',
    })
    emailSubmitButton.simulate('click');
    expect(checkForEmailErrorsSpy.calledOnce).to.equal(true);
    expect(errorHandlerSpy.called).to.equal(true);
    checkForEmailErrorsSpy.resetHistory();
  })
});
