angular.module('CropApp', ['ngImgCrop', 'ngFileUpload', 'ngMaterial'])
.controller('CropCtrl', function($scope, $mdDialog, Upload) {
    $scope.myImage = '';
    $scope.myCroppedImage = '';

    $scope.handleFileSelect = function(evt) {
        var file = evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function($scope) {
                $scope.myImage = evt.target.result;
            });
        }
        reader.readAsDataURL(file);
    };

    


    $scope.selected = function(file, ev) {
        $scope.$apply(function() {
            Upload.dataUrl(file, true).then(function(url) {
                console.log(url);
                $scope.myImage = url;
            });
        });
    }
});

function DialogController($scope, $mdDialog) {
    angular
    .element(document.querySelector('#fileInput'))
    .on('change', $scope.handleFileSelect);
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
}
