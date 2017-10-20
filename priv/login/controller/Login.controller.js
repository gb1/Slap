sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  function(Controller, JSONModel) {
    "use strict";

    return Controller.extend("slap.ui.controller.Login", {
      onInit: function() {},

      onShowHello: function() {
        // show a native JavaScript alert
        alert("Hello World");
      },

      onLogin: function(){
        var email = this.getView().byId("loginEmail").getValue();
        var password = this.getView().byId("loginPassword").getValue();


        var jqxhr = $.post( "/api/sessions", {email: email, password: password}, function(r) {
          console.log(r);
        }, "json")
          .done(function(resp) {
            console.log(resp);
            document.cookie = "slap_token=" + resp.meta.token;
          })
          .fail(function(a) {
            //console.log(a.responseText);
            alert( "error" );
          })
          .always(function() {
            //alert( "finished" );
          });

        //ebugger;
      }

    });
  }
);
