/**
 * Created by MikaelKnutsson on 11/07/2016.
 */
import './dailyquestion.html';
import './dailyquestion.css';
import {DailyQuestions} from './../../../api/dailyquestions';

export class DailyQuestionController {
	constructor($reactive, $scope, $mdToast, $logger, $state, $mdDialog) {
		'ngInject';
		this.$scope = $scope;
		$reactive(this).attach($scope);
		this.$mdToast = $mdToast;
		this.$logger = $logger;
		this.$state = $state;
		this.$mdDialog = $mdDialog;

		this.dailyQuestion = {};
		let a = new Date();
		this.dailyQuestion.createdAt = a.getDate() + "/" + (a.getMonth() + 1) + "/" + a.getFullYear()
		console.log(this.dailyQuestion.createdAt);

	}



	save() {

		if (document.cookie.indexOf("answered") >= 0) {
			// They've been here before.
			alert("Du har redan svarat på frågan idag");
			console.log(document.cookie);
		}
		else{

		DailyQuestions.insert(this.dailyQuestion, this.dailyQuestion.createdAt, this.$bindToContext((error) =>{
			console.log(this.dailyQuestion);
			if(error){
				this.$logger.error('Error while saving answer', error);
				this.$mdToast.show(
					this.$mdToast.simple()
						.textContent('Couldn\'t save your answer')
						.hideDelay(3000)
				);
			}else{

				let midnight = new Date();
				midnight.setHours(24,0,1,0);
				let expires = "expires="+ midnight.toUTCString();
				document.cookie = "answered=yes; expires=" + expires;
				console.log(document.cookie);

				this.$mdToast.show(
					this.$mdToast.simple()
						.textContent('Answer saved!')
						.hideDelay(3000)
				);
				this.$mdDialog.hide(this.dailyQuestion);
			}
		}));
		}
	}

	cancel() {
		this.$mdDialog.cancel();
	}

}
