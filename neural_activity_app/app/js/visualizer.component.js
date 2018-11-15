// Register visualizer directive, along with its associated controller and template
Visualizer = angular.module('Visualizer', [
    'ui.router',
    'ng',
    'ngResource',
    'ApiCommunicationServices',
    'FileServices',

    'GraphicsServices',
    'ngCookies',
    'nvd3',
    'ngTextTruncate',
]);

Visualizer.config(
    function($cookiesProvider, $httpProvider, $stateProvider, $locationProvider, $rootScopeProvider, $resourceProvider, $urlRouterProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
        $stateProvider

            .state('visualizer', {
                parent: 'home',
                abstract: true
            })
            .state('visualizer.block', {
                url: '/block',
                views: {
                    'detail@home': {
                        component: 'blockView'
                    }
                }
            })

        .state('visualizer.segment', {

                url: '/segment/{segment_id:[0-9]{1,8}}',
                views: {
                    'detail@home': {
                        component: 'segmentView'
                    }
                }
            })
            .state('visualizer.analog_signal', {

                url: '/analog_signal/{segment_id:[0-9]{1,8}}?{analog_signal_id:[0-9]{1,8}}',

                views: {
                    'detail@home': {
                        component: 'analogsignalView'
                    }
                }
            })
            // .state('visualizer.spiketrain', {

        //     url: '/spiketrain/{segment_id:[0-9]{1,8}}?{spiketrain_id:[0-9]{1,8}}',

        //     views: {
        //         'detail@home': {
        //             component: 'spiketrainView'
        //         }
        //     }
        // })
    });

Visualizer.controller('MenuCtrl', ['$scope', '$rootScope', '$http', '$location', '$stateParams', '$state', 'FileService',

    function($scope, $rootScope, $http, $location, $stateParams, $state, FileService) {
        var ctrl = this;
        $scope.detailTemplate = "<block-view></block-view>";
        $scope.menu_segments_to_show = [];

        $scope.showBlock = function() {
            $scope.detailTemplate = "<block-view></block-view>";
        }

        $scope.showSegment = function(segment_id) {
            var id = segment_id;
            if (!$scope.isInArray(id, $scope.menu_segments_to_show)) {
                $scope.menu_segments_to_show.push(id);
                document.getElementById("arrow-segment-" + id).className = "glyphicon glyphicon-menu-up";
            } else {
                var i = $scope.menu_segments_to_show.indexOf(id);
                if (i == 0) {
                    $scope.menu_segments_to_show.splice(0, 1);
                } else { $scope.menu_segments_to_show.splice(i, i); }
                document.getElementById("arrow-segment-" + id).className = "glyphicon glyphicon-menu-down";
            };
        }


        $scope.isInArray = function(value, array) {
            return array.indexOf(value) > -1;
        }

        $scope.$on('data_updated', function() {
            $scope.data = FileService.getData();
            $scope.$apply();
        });
        //code

        FileService.setService($stateParams.file_name).then(function() {
            $scope.data = FileService.getData();
            console.log("data", $scope.data)
            $scope.$apply();
        });

    }
]);

Visualizer.directive("visualizerView", ['FileService', '$stateParams', function(FileService, $stateParams) {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        templateUrl: '/static/templates/visualizer.tpl.html',
        controller: 'MenuCtrl'
    }

}]);