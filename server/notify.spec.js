/**
 * Created by MikaelKnutsson on 14/07/2016.
 */
import {expect} from 'chai';
import * as sinon from 'sinon';
import { logger } from './logger';
import { Notify, _notify } from './notify';
import { Email } from 'meteor/email';

describe('Notify', function () {
	describe('Exports', function (){
		it('Export \'Notify\' should be defined', sinon.test(function (done){
			// TODO: suppress warning for below statement
			expect(Notify).not.be.undefined;
			done();
		}));
	});

	describe('Setup()', function(){
		let _registerMeteorTemplates,
			_registerUrlBuilders,
			_setupTemplates,
			verbose;
		before(sinon.test(function(done){
			verbose = this.stub(logger, 'verbose', ()=>{});
			_registerUrlBuilders = this.stub(Notify, '_registerUrlBuilders', ()=>{});
			_setupTemplates = this.stub(Notify, '_setupTemplates', ()=>{});
			_registerMeteorTemplates = this.stub(Notify, '_registerMeteorTemplates', ()=>{});
			Notify.setup();
			done();
		}));

		it('Should write to console', sinon.test(function (done) {
			expect(verbose.calledWith('Setting up notifier')).to.equal(true);
			done();
		}));

		it('Should call _registerUrlBuilders()', sinon.test(function (done) {
			expect(_registerUrlBuilders.calledOnce).to.equal(true);
			done();
		}));

		it('Should call _setupTemplates()', sinon.test(function (done) {
			expect(_setupTemplates.calledOnce).to.equal(true);
			done();
		}));

		it('Should call _registerMeteorTemplates()', sinon.test(function (done) {
			expect(_registerMeteorTemplates.calledOnce).to.equal(true);
			done();
		}));
	});

	describe('notifyInvite()', function(){

	});

	describe('_send()', function(){
		before(sinon.test(function (done){
			done();
		}));

		it('Should call email with correct params with env', sinon.test(function(done){
			let mail = this.stub(Email, 'send');
			let to = 'test <test@test.io>';
			let sub = 'test';
			let html = '<p>Hello World!</p>';
			process.env.MAIL_ADDRESS = 'admin@test.io';
			Notify._send( to, sub, html);
			expect(JSON.stringify(mail.args[0][0])).to.equal(JSON.stringify({
				from: 'NovaMood <admin@test.io>',
				to: to,
				subject: sub,
				html: html
			}));
			done();
		}));
		it('Should call email with correct params withou env', sinon.test(function(done){
			let mail = this.stub(Email, 'send');
			let to = 'test <test@test.io>';
			let sub = 'test';
			let html = '<p>Hello World!</p>';
			delete process.env.MAIL_ADDRESS;
			Notify._send( to, sub, html);
			expect(JSON.stringify(mail.args[0][0])).to.equal(JSON.stringify({
				from: 'NovaMood <no-reply@novamood.se>',
				to: to,
				subject: sub,
				html: html
			}));
			done();
		}));
		it('Should throw when wrong email', sinon.test(function(done){
			let mail = this.stub(Email, 'send');
			let send = this.spy(Notify, '_send');
			let to = null;
			let sub = 'test';
			let html = '<p>Hello World!</p>';
			try {
				Notify._send(to, sub, html);
			}catch(ex){
				// we just need to catch the exception in order to continue the flow
			}finally{
				expect(mail.called).to.equal(false);
				expect(send.threw()).to.equal(true);
			}

			done();
		}));
		it('Should throw when wrong subject');
		it('Should throw when wrong html');
		it('Should return true when email succeds');
		it('Should return false when email fails');

	})
});
