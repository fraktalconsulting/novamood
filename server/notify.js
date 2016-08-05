/**
 * Created by MikaelKnutsson on 13/07/2016.
 */

import juice from 'juice';
import htmlMinifier from 'html-minifier';
import {logger} from './logger';
import { Email } from 'meteor/email';
import { PatientData } from '../imports/api/patientdata';
import { check } from 'meteor/check';


export class Notify{

	static setup(){
		logger.verbose('Setting up notifier');

		// TODO: read this from an environment varaiable
		Accounts.emailTemplates.siteName = "Novamood";
		Accounts.emailTemplates.from = "Novamood <no-reply@novamood.com>";

		Notify._registerUrlBuilders();
		Notify._setupTemplates();
		Notify._registerMeteorTemplates();

	}


	static notifyInvite(patientData, id){
		var user = Meteor.users.findOne({'emails.address': patientData.pendingEmail});
		if (user) {
			logger.verbose('sending invite to existing user');
			Notify._notify(user._id, 'Invited to join Nova Mood', 'Hej, Jag önskar att skapa kontakt med dig på Nova. Vi har gett dig tillgång till Nova Mood och ' +
				'önskar ta del av din information samt testresultat. Välj nedan att godkänna eller avböja denna kontakt. Med vänliga hälsningar, Teamet på Nova', 'invite', id, patientData.specialist);
		} else {
			logger.verbose('sending invite to not existing user');
			Notify._sendInvite(patientData, id);
		}
	}


	static _setupTemplates(){
		Notify.templateCss = Assets.getText('css/foundation.css');
		Notify.inviteTemplate = juice.inlineContent(htmlMinifier.minify(Assets.getText('templates/invite.html'), {
			collapseWhitespace: true
		}), Notify.templateCss);

		logger.verbose('Built email template');
	}

	static _registerMeteorTemplates(){
		Accounts.emailTemplates.resetPassword.subject = function () {
			return "Password Reset";
		};
		Accounts.emailTemplates.resetPassword.html = function (user, url) {
			return Notify.passwordTemplate.replace(/%URL%/g, url);
		};
		//logger.verbose('Registered meteor templates');
	}

	static _registerUrlBuilders(){
		Accounts.urls.resetPassword = function (token) {
			return Meteor.absoluteUrl('reset-password/' + token);
		};
		Accounts.urls.verifyEmail = function (token) {
			return Meteor.absoluteUrl('verify-email/' + token);
		};

		//logger.verbose('Registered meteor url builders');
	}

	static _send(to, subject, html){
		check(to, String);
		check(subject, String);
		check(html, String);
		try {
			Email.send({
				from: 'NovaMood <' + (process.env.MAIL_ADDRESS || 'no-reply@novamood.se') + '>',
				to: to,
				subject: subject,
				html: html
			});
			return true;
		}catch(ex){
			logger.warn('Email failed', ex);
		}
		return false;
	}

	static _sendInvite(patientData, id){

		console.log(patientData.patientId);
		let text = Notify.inviteTemplate;
		//text = text.replace(/%ORG%/g, patientData.firstName);
		let url = process.env.ROOT_URL + 'sv/signuppatient?token=' + id + '&mail=' + patientData.pendingEmail;
		text = text.replace(/%URL%/g, url);
		if(Notify._send(patientData.pendingEmail, 'Invited to organisations', text)){
			PatientData.update({_id: id}, { $set: { pendingSent: true, pendingSentAt: new Date() }});
		}
	}


	static _notify(userId, title, content, action, referenceId, specialist) {
		check(userId, String);
		check(title, String);
		check(content, String);

		logger.verbose('About to insert user notification', {userId: userId, referenceId: referenceId, specialist: specialist.toString()});
		Meteor.users.update({_id: userId}, {
			$addToSet: {
				messages: {
					messageId: new Mongo.ObjectID()._str,
					title: title,
					specialist: specialist.toString(),
					content: content,
					isRead: false,
					action: action,
					referenceId: referenceId,
					createdAt: new Date()
				},
			}
		}, null, (err)=>{
			if(err){
				Meteor.Error('Failed to notify');
			}else{
				logger.verbose('Notification inserted');
				var user = Meteor.users.findOne({_id: userId});
				if (user.sendEmail === null || user.sendEmail) {
					Notify._send(user.emails[0].address, title, content, specialist.toString())
				}
			}
		});

		return true;
	}
}
