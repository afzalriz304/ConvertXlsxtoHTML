var myApp=angular.module("myApp",[]);

myApp.controller("myController",function($scope){
  
	$scope.UploadDeviceList=[];
	$scope.ExcelExport= function (event) {


    var input = event.target;
    var reader = new FileReader();
    reader.onload = function(){
        var fileData = reader.result;
        var wb = XLSX.read(fileData, {type : 'binary'});

        wb.SheetNames.forEach(function(sheetName){
        var rowObj =XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
		$scope.UploadDeviceList=rowObj;
		var jsonObj = JSON.stringify(rowObj);
        $scope.ExcelFormater($scope.UploadDeviceList);
		$('#myTable').DataTable();
        })
    };
    reader.readAsBinaryString(input.files[0]);
    };
	
	
	$scope.visibility=true;
	
	$scope.showHomePage=function(tab){
		$scope.visibility=true;
	}
	
	$scope.showMyProfile=function(tab){
		$scope.visibility=false;
	}
	
	$scope.ExcelFormater=function(fileObj){
		var header=Object.keys(fileObj[0]);
		var headerArr=[];
		header.forEach(function(head){
			console.log(head);
			headerArr.push(head)
			$("#headData").append("<td>"+head+"</td>");
		})
		var i=0;
		fileObj.forEach(function(data,i){
			var key=Object.keys(data);
			var rowId="row"+i;
			$("#tableBody").append("<tr id="+rowId+"></tr>")
			key.forEach(function(keyValue){
				$("#"+rowId).append("<td>"+data[keyValue]+"</td>")
			})
		})
	}
})
