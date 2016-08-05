/**
 * Created by MikaelKnutsson on 15/07/2016.
 */
import './colleagues.modal.html';
import {Roles} from 'meteor/alanning:roles';


export class ColleagueModalController {

    constructor($scope, $mdDialog, $q, $reactive, $mdToast, colleague,  $logger) {
        'ngInject';
        this.$scope = $scope;
        this.$mdDialog = $mdDialog;
        this.$q = $q;
        this.$mdToast = $mdToast;
        this.$logger = $logger;
        $reactive(this).attach($scope);
        this.$scope.vm = this;

        this.isColleague = false;

        if (colleague) {
            this.colleague = colleague;
            if (!this.colleague.colleagues) {
                this.colleague.colleagues = [];
            }
        } else {
            this.colleague = {};
            this.colleague.colleagues = [];
            this.colleague.colleagues.push(Meteor.userId());


        }

        this.auto = {
            isDisabled: false,
            noCache: true,
            selectedItem: null,
            searchText: ''
        };

        this.subscribe('specialistdata');

        this.helpers({
            colleague(){
                return Meteor.users.findOne({_id: this.userId});
            }
        })


    }


    cancel() {
        this.$mdDialog.cancel();
    }


}
