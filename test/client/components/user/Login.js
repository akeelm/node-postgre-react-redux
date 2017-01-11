require('dotenv').config();
import React from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme'

import { reducer as formReducer } from 'redux-form'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView

import LoginComponent from '../../../../client/components/user/Login'

describe('LoginComponent', () => {
  let store
  let onSave
  let subject
	beforeEach(() => {
    store = createStore(combineReducers({ form: formReducer }))
		onSave = sinon.stub().returns(Promise.resolve())
		const props = {
			onSave,
		}
		subject = mount(
			<Provider store={store}>
				<LoginComponent {...props}/>
			</Provider>
		)
	})
  it('should have an e-mail field that is required', () => {
    const input = subject.find("[name='email']").first();
    input.simulate('blur');
    const inputField = subject.find('.text-danger');
    expect(inputField).to.have.length.of(1);
    expect(inputField.text()).to.equal('Required');
  })
  it('should have a password field that is required', () => {
    const input = subject.find("[name='password']").first();
    input.simulate('blur');
    const inputField = subject.find('.text-danger');
    expect(inputField).to.have.length.of(1);
    expect(inputField.text()).to.equal('Required');
  })
  it('should allow submission of the form', () => {
    subject.find('input[name="email"]').simulate('change', {target: {value: process.env.TEST_EMAIL}});
    subject.find('input[name="password"]').simulate('change', {target: {value: process.env.TEST_PASSWORD}});
    debugger
    expect(inputField.text()).to.equal('Required');
  })
})
