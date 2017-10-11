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
      this.chan.push("new_msg",
        {
          body: event.getParameter("value"),
          name: this.getView().getModel().getData().name
        })
    },

    addMessageToModel: function () {
      var oModel = this.getView().getModel();
      var aEntries = oModel.getData().EntryCollection;
      debugger;
    },

    setUserName: function () {

      var dialog = new sap.m.Dialog("Dialog1", {
        title: "What is your name Brave Traveller?",
        type: "Message",
        beginButton: new sap.m.Button("OK", {
          text: "OK",
          press: () => {
            dialog.close();
            if (this.getView().getModel().getData().name == undefined) {
              this.getView().getModel().getData().name = this.pickRandomName();
            }

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
      model.data.unshift({ name: payload.name, message: payload.body });
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

    },

    pickRandomName: function () {
      let names = ["Ned Stark",
        "Robert Baratheon",
        "Jaime Lannister",
        "Catelyn Stark",
        "Daenerys Targaryen",
        "Jon Snow",
        "Robb Stark",
        "Arya Stark",
        "Hodor",
        "Theon Greyjoy",
        "Tyrion Lannister",
        "Khal Drogo",
        "Stannis Baratheon"]

      return names[Math.floor(Math.random() * names.length)]
    }

  });
}); 