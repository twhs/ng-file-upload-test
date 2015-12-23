(function(){
    'use strict';
    angular
    .module('UploadApp', ['ngFileUpload'])
    .directive('upload', function() {
        return {
            restrict: 'E',
            scope: {
                type: '@uploadType'
            },
            templateUrl: 'upload-templ.html'
        }
    })
    .controller('uploadCtrl', ['$scope', 'Upload', function ($scope, Upload) {
        $scope.submit = function () {
            if (form.file.$valid && $scope.file) {
                $scope.upload($scope.file);
            }
        };

        $scope.upload = function (file) {
            Upload.upload({
                url: 'upload.php',
                data: {file: file}
            })
            .then(function (res) {
                console.log('Success');
            }, function (res) {
                console.log('Error');
            }, function (ev) {
                var progressPercentage = parseInt(100.0 * ev.loaded / ev.total);
                console.log('progress: ' + progressPercentage + '%');
            });
        };
    }]);
}());
