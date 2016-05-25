App.controller('AppController', function($scope,DataStore, $http) {
    $scope.isUpload = true;
    var changeEvent = function (event) {
        console.log("file change event");
        $scope.mainImage = null;
        $scope.cropper = {};
        $scope.image = {};
        console.log("change file");
        var file=event.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function($scope){
                $scope.myImage=evt.target.result;
                console.log($scope.myImage);
                var image = new Image;
                    image.src = evt.target.result;
                //console.log(image);
                //PopUp.show("the recomended height :"+image.height+" width :"+image.width);
                if(image.width===1024&&image.height===1024)
                {
                    setImage(evt.target.result);
                }
                else{
                    PopUp.show("the recomended image dimension is 1024 X 1024");
                }
            });
        };
        reader.readAsDataURL(file);
    };
    function sendPostdata(data) {
        console.log(JSON.stringify(data));
        $http.post(Constants.URL + "/save", data).success(function (res) {
            console.log(res);
            PopUp.show("images are stored");
            $scope.clearUploadImages();
        }).error(function (err, status) {
            PopUp.show("error while storing images");
        });
    }
    function getImagedata(id) {
        $http.get(Constants.URL + "/" +id).success(function (res) {
            PopUp.show("recieved images");
            console.log(JSON.stringify(res));
            setViewImages(res[0]);
        }).error(function (err, status) {
            PopUp.show("error while recieving images");
        });
    }
    $scope.getServerImages = function(){
        if(Utils.validate($scope.userName)&&$scope.userName!=="")
        {
            getImagedata($scope.userName);
        }
        else{
            PopUp.show("please enter user name");
        }
    };
    function getPostData(){
        var data = {};
        data['id'] = $scope.userName;
        data['horizontal'] = $scope.image.horizontal;
        data['vertical'] = $scope.image.vertical;
        data['horizontalSmall'] = $scope.image.horizontalSmall;
        data['gallery'] = $scope.image.gallery;
        return data;
    }
    function setViewImages(res){
        console.log(res);
        $scope.viewHorizontal = res['horizontal'];
        $scope.viewVertical = res['vertical'];
        $scope.viewHorizontalSmall = res['horizontalSmall'];
        $scope.viewGallery = res['gallery'];
    }
    function setImage(result)
    {
        $scope.mainImage = new Image;
        $scope.mainImage.onload = function() {
            //alert($scope.mainImage.width); // image is loaded; sizes are available
            //alert($scope.mainImage.height); // image is loaded; sizes are available
            //console.log($scope.mainImage.src);

        };
        $scope.mainImage.src = result;
    }
    $scope.clearUploadImages = function(){
        $scope.mainImage.src = null;
        $scope.mainImage = null;
        $scope.image.horizontal = null;
        $scope.image.vertical = null;
        $scope.image.horizontalSmall = null;
        $scope.image.gallery = null;
    };
    $scope.clearViewImages = function(){
        $scope.viewHorizontal = null;
        $scope.viewVertical = null;
        $scope.viewHorizontalSmall = null;
        $scope.viewGallery = null;
    };
    $scope.uploadData = function(){
        if(Utils.validate($scope.userName)&&$scope.userName!=="")
        {
            var data = getPostData();
            sendPostdata(data);
        }
        else{
            PopUp.show("please enter username");
        }
    };
    $scope.setUploadView = function(){
        console.log("load upload view");
        $scope.isUpload = true;
    };
    $scope.uploadViewEvents = function(){
        var event = angular.element(document.querySelector('#fileInput'));
        event.off('change');
        event.on('change',changeEvent);
        console.log(event);
    };
    $scope.setImageView = function(){
        console.log("load image view");
        $scope.isUpload = false;
    };
    $scope.setPhotoView = function(){
        console.log("load image view");
        $scope.isUpload = false;
        console.log(event);
    };
    $scope.getData = function(){

    };
    $scope.setUploadView();
});