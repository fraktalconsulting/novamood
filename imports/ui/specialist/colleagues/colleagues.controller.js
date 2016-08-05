/**
 * Created by MikaelKnutsson on 14/07/2016.
 */
import angular from 'angular';
import './colleagues.html';

export class ColleagueController {
    constructor($reactive, $scope, $mdDialog, $mdToast) {
        'ngInject';
        this.$mdDialog = $mdDialog;
        this.$mdToast = $mdToast;
        $reactive(this).attach($scope);

        this.showDeleted = false;
        this.searchInput = '';

        this.subscribe('users.specialists');

        this.helpers({
            colleagues() {
                if (Roles.userIsInRole(Meteor.userId(), ['specialist'])) {
                    return Meteor.users.find();
                }

            }
        });


        this.query = {
            order: 'username',
            limit: 5,
            page: 1
        };

        this.fab = {
            hidden: false,
            isOpen: false,
            hoover: true
        };

        this.selected = [];
        this.rowSelection = true;
        this.multiSelect = true;
    }



    openColleague(ev, colleague) {
        this.$mdDialog.show({
            controller: 'ColleagueModalController',
            controllerAs: 'vm',
            templateUrl: 'imports/ui/specialist/colleagues/colleagues.modal.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            locals: {
                colleague: this.colleague

            }
        }).then(()=> {

        }, ()=> {

        });
    }

    deleteRows(ev) {
        this.$mdDialog.show(this.$mdDialog.confirm()
            .title('Delete absences')
            .textContent('Are you sure you want to delete this absence instance?')
            .ariaLabel('Delete absence')
            .targetEvent(ev)
            .ok('Delete')
            .cancel('Cancel')).then(()=> {
            this.selected.forEach((entry)=> {
                Meteor.users.update({
                    _id: entry._id
                }, {
                    $set: {
                        deleted: true
                    }
                });
            });
            this.selected = [];
        });
    }

    inviteColleague(ev) {
        this.colleagues = [];
        this.$mdDialog.show(this.$mdDialog.confirm()
            .title('Lägg till kollega')
            .textContent('Vill du lägga till den här personen som din kollega?')
            .targetEvent(ev)
            .ok('Lägg till')
            .cancel('Avbryt')).then(()=> {
            this.selected.forEach((entry)=> {
                Meteor.users.update(Meteor.userId(), {$addToSet: { colleagues: this.colleagues }});

                    this.$mdToast.show(
                        this.$mdToast.simple()
                            .textContent('Answer saved!')
                            .hideDelay(3000)
                    );
            });
            this.$mdToast.show(
                this.$mdToast.simple()
                    .textContent('Kolleaga tillagd!')
                    .hideDelay(3000)
            );
            this.selected = [];
        });
    }




    getFirstName(userId){
        let user = Meteor.users.findOne({_id: userId});
        if(user) {
            return user.profile.firstName;
        }
        else{
            return null;
        }
    }

    getLastName(userId){
        let user = Meteor.users.findOne({_id: userId});
        if(user) {
            return user.profile.lastName;
        }
        else{
            return null;
        }
    }

    getPhoneNumber(userId){
        let user = Meteor.users.findOne({_id:userId});
        if(user){
            return user.profile.phoneNumber;
        }
        else{
            return null;
        }
    }

}
