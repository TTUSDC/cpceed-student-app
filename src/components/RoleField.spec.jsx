/* eslint no-console: 0  */
import React from 'react';
import { spy } from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import RoleField from './RoleField.jsx';

const onNewValueSpy = spy();

const initProps = {
  name: 'role',
  currentValue: 'student',
  onNewValue: onNewValueSpy,
};

describe('RoleField.jsx', () => {
it('should call the handler function that was passed as a prop', () => {
  const wrapper = shallow(<RoleField {...initProps} />);
  wrapper.find('#selector').simulate('change', { target: { value: 'new Role' } });
  expect(onNewValueSpy.calledOnce).to.equal(true);
});
})
