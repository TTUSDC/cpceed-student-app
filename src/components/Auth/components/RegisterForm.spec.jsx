/* eslint no-console: 0  */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

// Unwrapped Component
import { RegisterForm } from './RegisterForm.jsx';

describe('RegisterForm.jsx', () => {
  let props;
  let wrapper;
  let handleRegisterSpy;
  let validateSpy;

  beforeEach(() => {
    handleRegisterSpy = spy();
    validateSpy = spy();

    props = {
      handleRegister: handleRegisterSpy,
      regErr: '',
      waiting: false,
      classes: {},
      emailErr: '',
      passErr: '',
      confirmErr: '',
      validate: validateSpy,
    };

    wrapper = shallow(<RegisterForm {...props} />);
  });

  it('should not allow the user to submit the form at render', () => wrapper.instance().checkForErrors()
    .catch((err) => {
      expect(err).to.exist;
    }));

  it('should not allow the form to be submitted if there are errors or if we are waiting', () => {
    const propsWithErrors = {
      ...props,
      emailErr: 'Bad Email!',
      passErr: 'Bad Password!',
    };
    wrapper.setProps(propsWithErrors);
    return wrapper.instance().checkForErrors()
      .catch((err) => {
        expect(err).to.exist;
      });
  });

  it('should allow the form to be submitted if errors are cleared', () => {
    const propsWithoutErrors = {
      ...props,
    };

    const filledForm = {
      email: 'registration.form@ttu.edu',
      password: 'Password89067!',
      confirmPass: 'Password89067!',
      name: 'Student',
      role: 'student',
    };

    // Mock a change in input since the input components are tested seperately
    wrapper.setProps(propsWithoutErrors);
    wrapper.setState(filledForm);
    return wrapper.instance().checkForErrors()
      .then(() => {
        expect(true).to.equal(true);
      });
  });

  it('should call validate() when input is recieved', () => {
    const testState = {
      email: 'newEmail',
      password: 'newPasswordThatSucks',
      confirmPass: 'thisWillThrowAnError',
      name: 'Nils',
      role: 'BDFL',
      preventSubmit: false,
    };
    const changePasswordEvent = {
      target: { value: 'AnotherPassword' },
    };
    wrapper.setState(testState);
    wrapper.instance().handleInputChange('password')(changePasswordEvent);
    expect(props.validate.called).to.equal(true);
  });

  it('should call checkForErrors() when the submit button is clicked', () => {
    const checkForErrorsSpy = spy(wrapper.instance(), 'checkForErrors');
    wrapper.find('WithStyles(Button)').simulate('click');
    expect(checkForErrorsSpy.called).to.equal(true);
  });

  it('should submit the form without any changes to the values', (done) => {
    const formValues = {
      email: 'student.atTech@ttu.edu',
      password: 'ProperPassword1!',
      confirmPass: 'ProperPassword1!',
      name: 'Miggy',
      role: 'student',
      preventSubmit: false,
    };
    wrapper.setState(formValues);
    wrapper.instance().handleSubmit();
    setTimeout(() => {
      expect(handleRegisterSpy.calledWithExactly({
        email: 'student.atTech@ttu.edu',
        password: 'ProperPassword1!',
        name: 'Miggy',
        role: 'student',
      })).to.equal(true);
      done();
    }, 100);
  });
});
