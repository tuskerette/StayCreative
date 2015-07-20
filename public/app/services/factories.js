(function pdfFactoryIIFE() {
  var pdfFactory = function($http) {
    return {
    createPdf : function(dataId) {
      var pdfSource = $('[data-id="' + dataId + '"]').html();
      var postData = JSON.stringify({pdfSource: pdfSource});
      $http.post("/pdf", postData)
      .success(function(data) {
        var dataUri = 'data:application/pdf;base64:' + btoa(data);

        console.log("successfully created pdf");
      })
      .error(function(data) {
        console.log("error in creating the pdf");
      })
    }

    }
  }

pdfFactory.$inject = ['$http'];

angular.module('stayCreative').factory('pdfFactory', pdfFactory);

})();

