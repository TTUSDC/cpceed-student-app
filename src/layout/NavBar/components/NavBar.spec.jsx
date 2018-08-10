/* eslint no-console: 0  */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import { ModalView } from 'components/';
import { NavBar } from './NavBar.jsx';

describe.only('NavBar Component', () => {
  let wrapper;
  const initProps = {
    user: {
      role: 'guest',
      name: 'James',
    },
    classes: {},
    navigate: () => null,
    logout: () => null,
  };
  it('should close modal when auth state is set to false', () => {
    wrapper = mount(<NavBar {...initProps} />);
    expect(wrapper.exists()).to.equal(true);
    const modal = wrapper.find(ModalView);
    expect(modal.exists()).to.equal(true);
    expect(modal.props().open).to.equal(false);

    wrapper.setState({
      auth: true,
    });

    expect(modal.props().open).to.equal(false);
  });
});
