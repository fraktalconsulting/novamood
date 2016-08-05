import './navbar.html';
import angular from 'angular';
import {Roles} from 'meteor/alanning:roles';
import {Notifications} from '../../api/notifications/notifications.collection';
import {PatientData} from '../../api/patientdata';

import {itemsPatient} from './menuitems';
import {itemsSpecialist} from './menuitems';

export class NavbarController{
	constructor( $mdColors, $mdSidenav, $reactive, $scope, $state, $mdDialog, $mdToast){
		'ngInject';
		this.$mdSidenav = $mdSidenav;
		this.$state = $state;
		this.$mdDialog = $mdDialog;
		this.$mdToast = $mdToast;
		$reactive(this).attach($scope);
		this.sidenavStyle = NavbarController.getSidenavStyle($mdColors);

		this.menu = {};
		this.menu.sections = [];
		this.hasUnreadMessages = false;


		this.subscribe('users');
		this.subscribe('patientdata');
		this.subscribe('notifications');

		this.helpers({

			initSections(){

				this.menu.sections = [];

				if (Roles.userIsInRole(Meteor.userId(), ['patient'])) {
					this.menu.sections.push(itemsPatient);
				}
				if (Roles.userIsInRole(Meteor.userId(), ['specialist'])) {
					this.menu.sections.push(itemsSpecialist);
				}
			},

			user(){
				return Meteor.user();
			},
			isLoggedIn(){
				return !!Meteor.userId();
			},

			userMessages() {
				return Meteor.user();
			}
		});
	}

	static getSidenavStyle($mdColors){
		let sidenavColor1 = $mdColors.getThemeColor('primary-800');
		let sidenavColor2 = $mdColors.getThemeColor('primary-600');
		return 'linear-gradient(' + sidenavColor1 + ',' + sidenavColor2 + ')';
	}

	openMessageNav(){
		this.$mdSidenav('right')
			.toggle();
	}


	toggleMessages() {
		var timer;
		this.$timeout.cancel(timer);
		timer = this.$timeout(()=> {
			timer = undefined;
			this.$mdSidenav('right').toggle().then(()=> {
				Meteor.call('users.setMessagesRead');
			});
		})
	}

	toggleSidenav() {
		var timer;
		this.$timeout.cancel(timer);
		timer = this.$timeout(()=> {
			timer = undefined;
			this.$mdSidenav('left').toggle();
		})
	}


	logout(ev) {
		this.$mdDialog.show(
			this.$mdDialog.confirm()
				.parent(angular.element(document.body))
				.clickOutsideToClose(true)
				.title("Vill du logga ut?")
				.targetEvent(ev)
				.ok('Ja')
				.cancel('Avbryt')
		).then(()=> {
			Meteor.logout();
			this.$state.go('app.login');
		})
	}

	isOpen(section) {
		return section.selected || false;
	}

	toggleOpen(section) {
		section.selected = !section.selected;
	}

	openMenu(mdOpenMenu, event) {
		mdOpenMenu(event);
	}

	getUser(specialist){
		let test = Meteor.users.findOne({_id: specialist});
		if(test) {
			return test.profile.firstName + ' ' + test.profile.lastName;
		}
		else{
			return null;
		}
	}

	openMessage(ev, message) {
		if (message.action === 'message') {
			this.$mdDialog.show(
				this.$mdDialog.alert()
					.parent(angular.element(document.body))
					.clickOutsideToClose(true)
					.title(message.title)
					.textContent(message.content)
					.ariaLabel(message.title)
					.ok('Ok')
					.targetEvent(ev)
			);
		} else if (message.action === 'invite') {
			this.$mdDialog.show(
				this.$mdDialog.confirm()
					.parent(angular.element(document.body))
					.title(message.title)
					.textContent(message.content)
					.ariaLabel(message.title)
					.targetEvent(ev)
					.ok('Acceptera')
					.cancel('Avbryt')
			).then(()=> {
				//this.$logger.verbose('Confirming invite with reference id: ' + message.referenceId);
				Meteor.call('patientdata.confirm', message.referenceId);
				this.$mdToast.show(
					this.$mdToast.simple()
						.textContent('Du accepterade inbjudan!')
						.hideDelay(3000)
				);
				this.$mdSidenav('right').toggle()
			}, ()=> {
				// can only be accesed through cancel button
			});
		}
	}


}
