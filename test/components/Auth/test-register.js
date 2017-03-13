import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Register from 'components/Auth/Register.js';

export default describe("Register.js", () => {
  it("Handles password changes", () => {
    const wrapper = shallow(<Register />);
    const password = 'test';
    const event = {
      target: {
        value: password
      }
    };

    wrapper.setState({
      confirmPass: 'temp',
      err: {
        confirmErr: 'temp'
      }
    });

    wrapper.instance().handlePasswordChange(event);
    expect(wrapper.state().password).to.equal(password);
    expect(wrapper.state().confirmPass).to.equal('');
    expect(wrapper.state().err.confirmErr).to.equal('');
  });

  it("Handles input changes", () => {
    const wrapper = shallow(<Register />);
    const event = {
      target: {
        value: 'test@ttu.edu',
        name: 'email'
      }
    };

    wrapper.instance().handleInputChange(event);
    expect(wrapper.state().email).to.equal('test@ttu.edu');
  });

  it("Handles selection changes", () => {
    const wrapper = shallow(<Register />);
    const option = 'admin';
    const event = {
      target: {
        name: 'role'
      },
      option: option
    };

    wrapper.setState({
      studentID: '12345678',
      err: {
        stuIDErr: 'temp'
      }
    });

    wrapper.instance().handleSelectChange(event);
    expect(wrapper.state().role).to.equal(option);
    expect(wrapper.state().studentID).to.equal('');
    expect(wrapper.state().err.stuIDErr).to.equal('');
  });

  it("Calls handleRegister when submit is pressed and fields are not empty",
    () => {
      const handleRegister = sinon.spy();
      const wrapper = shallow(<Register handleRegister={handleRegister} />);
      const event = {
        preventDefault: () => {}
      };

      wrapper.setState({
        email: 'test@ttu.edu',
        password: 'test',
        studentID: '12345678'
      });

      wrapper.find({label: 'Register'}).simulate('click', event);
      expect(handleRegister.calledOnce).to.equal(true);
    }
  );

  it("Sets errors when submit is pressed and fields are empty",
    () => {
      const handleRegister = sinon.spy();
      const wrapper = shallow(<Register handleRegister={handleRegister} />);
      const event = {
        preventDefault: () => {}
      };

      wrapper.find({label: 'Register'}).simulate('click', event);
      expect(handleRegister.calledOnce).to.equal(false);

      const err = wrapper.state().err;

      expect(err.emailErr).to.equal('Please enter an email');
      expect(err.passErr).to.equal('Please enter a password');
      expect(err.stuIDErr).to.equal('Please enter a student ID');
    }
  );

  it("Displays server errors", () => {
    const regErr = 'Message';
    const wrapper = shallow(<Register regErr={regErr} />);

    expect(wrapper.contains(
      <span style={{color: 'red'}}>{regErr}</span>)
    ).to.equal(true);
  });

  it("Disables submit while waiting for server", () => {
    const handleRegister = sinon.spy();
    const wrapper = shallow(
      <Register
        handleRegister={handleRegister}
        waiting={true} />
    );

    wrapper.find({label: 'Register'}).simulate('click');
    expect(handleRegister.calledOnce).to.equal(false);
  });
});
