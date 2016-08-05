/**
 * Created by MikaelKnutsson on 11/07/2016.
 */

import './madrs.html';
import {MadrsQuestions} from '../../../api/madrsquestions';

export class MadrsController {
	constructor($reactive, $scope, $mdToast, $logger, $state, $mdDialog) {
		'ngInject';
		this.$scope = $scope;
		$reactive(this).attach($scope);
		this.$mdToast = $mdToast;
		this.$logger = $logger;
		this.$state = $state;
		this.$mdDialog = $mdDialog;

		let data = Meteor.users.findOne({_id: Meteor.userId()});
		console.log(data);

		this.madrs = {};
		let a = new Date();
		this.madrs.createdAt = a.getDate() + "/" + (a.getMonth() + 1) + "/" + a.getFullYear()
		console.log(this.madrs.createdAt);

		this.parseFloat = function(value)
		{
			test = parseFloat(value)
			return test;
			console.log(test);
		}
	}

	save() {

		let data = Meteor.users.findOne({_id: Meteor.userId()});
		console.log(data);
		this.date = data.madrsDateOfPerforming[0].madrsDate;
		this.specialistId = data.madrsDateOfPerforming[0].specialist;
		this.isReported = data.madrsDateOfPerforming[0].isReported;

		console.log("alla 3:", this.date , this.specialistId, this.isReported  )


		Meteor.users.update(data._id, {
			$pull: {
				madrsDateOfPerforming: {
					madrsDate: this.date,
					specialist:  this.specialistId,
					isReported: this.isReported
				}

			}
		})

		MadrsQuestions.insert(this.madrs, this.madrs.createdAt,  this.$bindToContext((error) =>{
				if(error){
					this.$logger.error('Error while saving questions', error);
					this.$mdToast.show(
						this.$mdToast.simple()
							.textContent('Couldn\'t save questions')
							.hideDelay(3000)
					);
				}else{
					this.$mdToast.show(
						this.$mdToast.simple()
							.textContent('Questions saved!')
							.hideDelay(3000)
					);
					this.$mdDialog.hide(this.madrs);
				}
			}));
		}

	cancel() {
		this.$mdDialog.cancel();
	}

	total(){
		console.log(this.madrs.question1);
	}

}
