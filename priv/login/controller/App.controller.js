sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  function(Controller, JSONModel) {
    "use strict";

    return Controller.extend("slap.ui.controller.App", {
      onInit: function() {
        let rooms = {
          data: [
            {
              room: "ABAP",
              id: 1,
              description: "everyones favorite language!"
            }
          ]
        };

        let messages = {
          data: [
            {
              room: "ABAP",
              posted: "2017-10-18T18:44:05.042576",
              name: "jesse",
              message: "hola",
              id: 1
            }
          ]
        };

        let roomsModel = new JSONModel(rooms);
        let messagesModel = new JSONModel(messages);

        this.getView().setModel(roomsModel, "rooms");
        this.getView().setModel(messagesModel, "messages");
      },

      onShowHello: function() {
        // show a native JavaScript alert
        alert("Hello World");
      }
    });
  }
);
