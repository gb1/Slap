sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  function(Controller, JSONModel) {
    "use strict";

    return Controller.extend("slap.ui.controller.Login", {
      onInit: function() {},

      onShowHello: function() {
        // show a native JavaScript alert
        alert("Hello World");
      }
    });
  }
);
