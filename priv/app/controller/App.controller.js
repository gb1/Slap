sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/ui/model/json/JSONModel",
  "slap/libs/phoenix"
], function (Controller, MessageToast, JSONModel) {
  "use strict";
  return Controller.extend("slap.controller.App", {

    chan: {},

    onInit: function () {
      this.setupModels();
      this.setUserName(this);
      this.setupSocket();
    },

    setupModels: function () {
      var oModel = new JSONModel();
      oModel.loadData("/api/messages");
      this.getView().setModel(oModel);
    },

    onPost: function (event) {
      console.log("send");
      this.chan.push("new_msg",
        {
          body: event.getParameter("value"),
          name: "GB"
        })
    },

    addMessageToModel: function () {
      //  			// update model
      var oModel = this.getView().getModel();
      var aEntries = oModel.getData().EntryCollection;
      debugger;
      // aEntries.unshift(oEntry);
      // oModel.setData({
      // 	EntryCollection : aEntries
      // });
    },

    setUserName: function () {

      var dialog = new sap.m.Dialog("Dialog1", {
        title: "What is your name Brave Traveller?",
        type: "Message",
        beginButton: new sap.m.Button("OK", {
          text: "OK",
          press: function () {
            dialog.close();
          }
        }),
        content: [
          new sap.m.Input("name", { value: "{/name}" }
          )
        ]
      });

      this.getView().addDependent(dialog);
      dialog.open();
    },

    updateModel: function (payload) {
      var model = this.getView().getModel().getData();
      model.data.push({ name: payload.name, message: payload.body });
      this.getView().getModel().setData(model);
    },

    setupSocket: function () {
      var socket = new Phoenix.Socket("/socket", { params: {} })
      socket.connect()

      let channel = socket.channel("room:lobby", {})

      this.chan = channel;

      channel.on("new_msg", payload => {
        console.log(payload);
        this.updateModel(payload);
      });

      channel.join()
        .receive("ok", resp => {
          console.log("Joined successfully", resp)
        })
        .receive("error", resp => { console.log("Unable to join", resp) });

    }

  });
}); 