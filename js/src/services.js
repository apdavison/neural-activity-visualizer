import angular from 'angular';

export function BlockData($resource, baseURL) {
    return $resource(baseURL + 'blockdata/', { id: '@eUuid' }, {
        get: { method: 'GET', params: { format: 'json' }, isArray: false },
    })
}

export function SegmentData($resource, baseURL) {
    return $resource(baseURL + 'segmentdata/', { id: '@eUuid' }, {
        get: { method: 'GET', params: { format: 'json' }, isArray: false },
    })
}

export function AnalogSignalData($resource, baseURL) {
    return $resource(baseURL + 'analogsignaldata/', { id: '@eUuid' }, {
        get: { method: 'GET', params: { format: 'json' }, isArray: false },
    })
}

//BlockData.$inject = ['$resource', 'baseURL'];
//SegmentData.$inject = ['$resource', 'baseURL'];
//AnalogSignalData.$inject = ['$resource', 'baseURL'];


angular.module('neoVisualizer')

.value('baseURL', 'https://neo-viewer.brainsimulation.eu/')

.factory('BlockData', ['$resource', 'baseURL', BlockData])

.factory('SegmentData', ['$resource', 'baseURL', SegmentData])

.factory('AnalogSignalData', ['$resource', 'baseURL', AnalogSignalData])