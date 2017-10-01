sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/ui/model/json/JSONModel",
  "slap/libs/phoenix"
], function (Controller, MessageToast, JSONModel) {
  "use strict";
  return Controller.extend("slap.controller.App", {
     
    chan : {},
    
    onInit : function () {
       
      var socket = new Phoenix.Socket("/socket", {params: {}})
      socket.connect()

      let channel = socket.channel("room:lobby", {})

      this.chan = channel;

      channel.on("new_msg", payload => {
        console.log(payload.body);
      })

      channel.join()
        .receive("ok", resp => { 
          console.log("Joined successfully", resp)
          channel.push("new_msg", {body: "boop!"})
        })
        .receive("error", resp => { console.log("Unable to join", resp) })

        // set data model on view
        var oData = {
           messages : [
              {
              from : "Ched",
              message: "yo!"
           },
          {
            from : "Ched",
            message: "hi"
          }
          ]
        };
        var oModel = new JSONModel(oData);
        this.getView().setModel(oModel);
     },

     onPost : function() {
       console.log("send");
       this.chan.push("new_msg", {body: "send!"})
     },

     addMessageToModel : function() {
      //  			// update model
			// var oModel = this.getView().getModel();
			// var aEntries = oModel.getData().EntryCollection;
			// aEntries.unshift(oEntry);
			// oModel.setData({
			// 	EntryCollection : aEntries
			// });
     }

  });
});