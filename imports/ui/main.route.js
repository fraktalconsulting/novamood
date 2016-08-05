
export function router($stateProvider, $urlRouterProvider, $locationProvider) {
    'ngInject';

    $stateProvider
        .state('app', {
            url: '/{locale:[a-z]{2}}',
            template: '<ui-view></ui-view>',
            abstract: true,
            params: {
                locale: () => {
                    return 'sv';
                }
            }
        })
        .state('app.login', {
            url: '/login',
            templateUrl: 'imports/ui/login/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        })

        .state('app.signupSpecialist', {
            url: '/signupspecialist',
            templateUrl: 'imports/ui/signup/signupspecialist.html',
            controller: 'SignupSpecialistController',
            controllerAs: 'vm'
        })

        .state('app.signupPatient', {
            url: '/signuppatient',
            templateUrl: 'imports/ui/signup/signuppatient.html',
            controller: 'SignupPatientController',
            controllerAs: 'vm'
        })

        .state('app.home', {
            url: '/home',
            templateUrl: 'imports/ui/main/main.html',
            controller: 'MainController',
            controllerAs: 'vm'
        })

        .state('app.account', {
            url: '/account',
            templateUrl: 'imports/ui/account/account.html',
            controller: 'AccountController',
            controllerAs: 'vm',
            data: {
                title: 'Account'
            }
        })

        .state('app.resetpassword', {
            url: '/resetpassword',
            templateUrl: 'imports/ui/account/resetpassword.html',
            controller: 'ResetPasswordController',
            controllerAs: 'vm'
        })

        .state('app.dailyquestion', {
            url: '/dailyquestion',
            templateUrl: 'imports/ui/patient/dailyquestion/dailyquestion.html',
            controller: 'DailyQuestionController',
            controllerAs: 'vm'
        })

        .state('app.dashboardSpecialist', {
            url: '/dashboard',
            templateUrl: 'imports/ui/specialist/dashboard/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'vm'
        })

        .state('app.patientRegister',{
            url: '/patientregister',
            templateUrl: 'imports/ui/specialist/patientregister/patientregister.html',
            controller: 'PatientRegisterController',
            controllerAs: 'vm',
            data: {
                title: 'Patientregister'
            }
        })

        .state('app.healthProvider',{
            url: '/healthprovider',
            templateUrl: 'imports/ui/patient/healthprovider/healthprovider.html',
            controller: 'PatientHealthProviderController',
            controllerAs: 'vm'
        })

        .state('app.colleagues',{
            url: '/colleagues',
            templateUrl: 'imports/ui/specialist/colleagues/colleagues.html',
            controller: 'ColleagueController',
            controllerAs: 'vm'
        })

    $urlRouterProvider.otherwise(($injector) => {
        var $state = $injector.get('$state');

        $state.go('app.login');
    });

    $locationProvider.html5Mode(true);
}

