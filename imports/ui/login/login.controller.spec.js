/**
 * Created by MikaelKnutsson on 08/07/2016.
 */
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai'
import { LoginController } from './login.controller.js';

if(Meteor.isClient) {

	describe('test', function () {
		it('Expect LoginController to be defined', function () {
			expect(LoginController).to.not.be.undefined;
		});
	});

}
