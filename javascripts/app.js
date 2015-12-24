(function(angular, data, _){
  var myAPP = angular.module('myAPP', []);
  var currentnum=0;
  var count=9;
  myAPP.controller('mainController', function($scope ) {
  	
  	currentnum = currentnum+count;
    $scope.books = data.books.slice(0, currentnum);
    $scope.selectedTip = "出版社";
    $scope.backctrl=function(){
    	document.getElementById("book-err").style.display="none";
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
      if(bookbuf != "")
        $scope.books = bookbuf;
     
   }
   	$scope.searchbook = function(searchContent){
   	  var bookbuf=_.filter(data.books, function(onebook){ 
        if(searchContent != null){
          if(onebook.title.indexOf(searchContent) > 0)
            return onebook;
        }
   	  });
   	  if(bookbuf != "")
   	  	$scope.books = bookbuf;
   	  else{
   	  	document.getElementById("book-err-info").innerHTML="没有符合要求的书籍~~~~(>_<)~~~~";
   	  	document.getElementById("book-err").style.display="block";
   	  }
   }
   $scope.loadmorebook = function(){
   	var bookbuf2=data.books.slice(currentnum, currentnum+count);
   	 currentnum = currentnum+count;
   	 
   	 if(bookbuf2 == ""){
   	 	document.getElementById("book-err-info").innerHTML="没有更多的书籍了~~~~(>_<)~~~~";
   	 	 document.getElementById("book-err").style.display="block";
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
 		var tagbuf=[];
 		for (var i = 0; i < selecttagbuf.length; i++){
 			var arr=selecttagbuf[i];
 			for(var j=0;j<arr.length;j++){
 				tagbuf.push(arr[j]);
 			}
 		}
 		var sellectpub=unique(selectpubbuf);
 		var selecttag=unique(tagbuf);
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

function unique(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}
