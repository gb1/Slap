sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "slap/ui/libs/phoenix"
  ],
  function(Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("slap.ui.controller.App", {
      chan: {},

      onInit: function() {
        this.getView().addStyleClass(
          this.getOwnerComponent().getContentDensityClass()
        );

        this.getView().byId("feedInput").onkeyup = function() {
          MessageToast.show("GB is typing...", { duration: 100 });
          console.log("someone is typing!");
        };

        const token = sessionStorage.getItem("token");
        if (token == null) {
          window.location.href = "/login/";
        }

        // let rooms = {
        //   data: [
        //     {
        //       room: "ABAP",
        //       id: 1,
        //       description: "everyones favorite language!"
        //     }
        //   ]
        // };

        // let messages = {
        //   data: [
        //     {
        //       room: "ABAP",
        //       posted: "2017-10-18T18:44:05.042576",
        //       name: "jesse",
        //       message: "hola",
        //       id: 1
        //     }
        //   ]
        // };

        let roomsModel = new JSONModel();

        // roomsModel.attachRequestCompleted(function(response) {
        //   // console.log(response);
        //   data = response.getSource().getData();
        //   roomsModel.setData(data);
        // });
        // roomsModel.attachRequestFailed(function(response) {
        //   console.log("Failed!" + response);
        // });

        roomsModel.loadData(
          "/api/rooms",
          {},
          true,
          "GET",
          false,
          false,
          this.getAuthHeader()
        );

        this.getView().setModel(roomsModel, "rooms");
        // this.getMessages("");

        this.setupSocket();
      },

      onShowHello: function() {
        // show a native JavaScript alert
        alert("Hello World");
      },

      getMessages: function(room) {
        let messagesModel = new JSONModel();

        messagesModel.loadData(
          "/api/rooms/" + room + "/messages",
          {},
          true,
          "GET",
          false,
          false,
          this.getAuthHeader()
        );

        this.getView().setModel(messagesModel, "messages");
      },

      getAuthHeader: function() {
        return {
          Authorization:
            "Bearer: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJVc2VyOjE2IiwiZXhwIjoxNTEwODIxNjY5LCJpYXQiOjE1MDgyMjk2NjksImlzcyI6IlNsYXAiLCJqdGkiOiI0YmU5YzllNC05NmYxLTQyMTAtOGQzNC03YjUxYWRmZmQ3MTIiLCJwZW0iOnt9LCJzdWIiOiJVc2VyOjE2IiwidHlwIjoiYWNjZXNzIn0.vO81KcOV3zRDHbTlSYhatwNhijuuKeuXh-4Pxk888PlJq5P4FE_r6MTESMQsLDJo_FTYqBv5S4TAZoeWtW5W3Q"
        };
      },

      logout: function() {
        sessionStorage.clear();
        window.location.href = "/login/";
      },

      changeRoom: function(event) {
        this.getMessages(event.getSource().getTitle());
      },

      setupSocket: function() {
        var socket = new Phoenix.Socket("/socket", { params: {} });
        socket.connect();

        let channel = socket.channel("room:ABAP", {});

        this.chan = channel;

        channel.on("new_msg", payload => {
          console.log(payload);
          this.updateModel(payload);
        });

        channel
          .join()
          .receive("ok", resp => {
            console.log("Joined successfully", resp);
          })
          .receive("error", resp => {
            console.log("Unable to join", resp);
          });
      },

      onPost: function(event) {
        console.log("send");
        this.chan.push("new_msg", {
          body: event.getParameter("value"),
          token: sessionStorage.getItem("token"),
          room: "ABAP"
        });
      },

      updateModel: function(payload) {
        var model = this.getView()
          .getModel("messages")
          .getData();
        model.data.unshift(payload);
        this.getView()
          .getModel("messages")
          .setData(model);
      }
    });
  }
);
