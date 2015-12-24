(function(angular, data, _){
  var myAPP = angular.module('myAPP', []);
  var currentnum=0;
  var count=9;
  
  myAPP.controller('mainController', function($scope ) {
  	
  	currentnum = currentnum+count;
    $scope.books = data.books.slice(0, currentnum);
    $scope.selectedTip = "出版社";
    $scope.searchvisible = false;
    $scope.isShow = false;
    $scope.showorhide = function () {
        $scope.searchvisible = !$scope.searchvisible;
    }

    $scope.searchbookinlist = function(selectedTip,selectedGenre){
      var bookbuf=_.filter(data.books, function(onebook){ 
        if(selectedTip.name == "出版社"){
          return  onebook.publisher == selectedGenre;
        }
        if(selectedTip.name  == "标签"){
          var tagif=_.some(onebook.tags, function(tagg){ return tagg.name == selectedGenre; });
          if(tagif)
            return onebook;
        }
        
      });
      if(!_.isEmpty(bookbuf))
        $scope.books = bookbuf;
     
   }
   	$scope.searchbook = function(searchContent){
   	  var bookbuf=_.filter(data.books, function(onebook){ 
        if(searchContent != null){
          if(_.contains(onebook.title, searchContent))
            return onebook;
        }
   	  });
   	  if(_.isEmpty(bookbuf)){
        $scope.searchvisible = true;
        $scope.isShow = true;
      }
   	  else{
        $scope.books = bookbuf;
   	  	
   	  }
      console.log($scope.searchvisible+"****"+$scope.isShow);
   }
   $scope.loadmorebook = function(){
   	var bookbuf2=data.books.slice(currentnum, currentnum+count);
   	 currentnum = currentnum+count;
   	 
   	 if(_.isEmpty(bookbuf2)){
        $scope.searchvisible = true;
        $scope.isShow = false;
   	 }
   	 else
   	 	$scope.books = data.books.slice(0, currentnum);
   }
   	
  });
 
 myAPP.controller("SelectCtrl", function($scope){
 	  var selectpubbuf;
 		var selecttagbuf=[];
 		selectpubbuf=_.pluck(data.books, 'publisher');
 		_.map(data.books, function(onebook){
 			selecttagbuf.push(_.pluck(onebook.tags, 'name'));
 			return _.pluck(onebook.tags, 'name');
 		});

 		var tagbuf=_.flatten(selecttagbuf);
 		var sellectpub=_.uniq(selectpubbuf);
 		var selecttag=_.uniq(tagbuf);
    $scope.selecttip = [
                    {
                        id: 0,
                        name: '标签',
                        interest: selecttag
                    },
                    {
                        id: 1,
                        name: '出版社',
                        interest: sellectpub
                    }
                ];
});

 
})(angular, data, _);
