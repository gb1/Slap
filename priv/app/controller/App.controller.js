sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/ui/model/json/JSONModel",
  "slap/libs/phoenix"
], function (Controller, MessageToast, JSONModel) {
  "use strict";
  return Controller.extend("slap.controller.App", {
     onInit : function () {
       
      var socket = new Phoenix.Socket("/socket", {params: {userToken: "123"}})
      socket.connect()

      let channel = socket.channel("room:lobby", {})
      channel.join()
        .receive("ok", resp => { console.log("Joined successfully", resp) })
        .receive("error", resp => { console.log("Unable to join", resp) })
        
        // set data model on view
        var oData = {
           recipient : {
              name : "World"
           }
        };
        var oModel = new JSONModel(oData);
        this.getView().setModel(oModel);
     },
     onShowHello : function () {
        MessageToast.show("Hello World");
     }
  });
});