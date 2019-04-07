var app = angular.module('neo-visualizer', ['ng', 'ngResource', 'nvd3']);

app.controller('MainCtrl', function($scope, $q, AnalogSignalData) {
 $scope.options = {
            chart: {
                type: 'lineWithFocusChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 40
                },
                duration: 50,
                xAxis: {
                    axisLabel: 'X Axis',
                    tickFormat: function(d){
                        return d3.format(',.f')(d);
                    }
                },
                x2Axis: {
                    tickFormat: function(d){
                        return d3.format(',.f')(d);
                    }
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    tickFormat: function(d){
                        return d3.format(',.f')(d);
                    },
                    rotateYLabel: false
                },
                y2Axis: {
                    tickFormat: function(d){
                        return d3.format(',.f')(d);
                    }
                }

            }
        };

        var base_url = "https://object.cscs.ch/v1/AUTH_c0a333ecf7c045809321ce9d9ecdfdea/Migliore_2018_CA1/exp_data/abf-int-bAC/Ivy_960711AHP3/96711008.abf";

        var promises = [
            AnalogSignalData.get({url: base_url, segment_id: "12", analog_signal_id: "0", type: null}).$promise,
            AnalogSignalData.get({url: base_url, segment_id: "14", analog_signal_id: "0", type: null}).$promise
        ];

        $q.all(promises).then(
            function(signals) {
                var graph_data = [];
                signals.forEach(
                    function(signal, j) {
                        var t_start = signal.times[0];
                        var xy_data = signal.values.map(
                            function(val, i){
                                return {x: 1000 * (signal.times[i] - t_start), y: val};
                            }
                        );
                        graph_data.push({
                            key: "Segment" + j,  // to fix: maybe add segment id to document returned by analogsignal endpoint?
                            values: xy_data
                        });
                    }
                );
                $scope.data = graph_data;
            },
            function(error) {
                console.log(error);
            }
        );

});
