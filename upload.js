(function(){
    'use strict';
    angular
    .module('UploadApp', ['ngFileUpload', 'ngImgCrop'])
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

        $scope.myImage='';
        $scope.myCroppedImage='';

        var handleFileSelect=function(evt) {
            var file=evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function($scope){
                    console.log(evt.target.result);
                    $scope.myImage=evt.target.result;
                    console.log($scope.myImage);
                });
            };
            console.log(reader.readAsDataURL(file));
        };
        angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
    }]);
}());
