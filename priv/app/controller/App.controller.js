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
      channel: {},
      socket: {},
      token: sessionStorage.getItem("token"),

      onInit: function() {
        this.getView().addStyleClass(
          this.getOwnerComponent().getContentDensityClass()
        );

        if (this.token == null) {
          window.location.href = "/login/";
        }

        this.setupModels();
        this.setupSocket();
        this.joinChannel("general");
      },

      setupModels: function() {
        //set current room
        this.getView().setModel(
          new JSONModel({ currentRoom: "general" }),
          "state"
        );

        //set list of rooms
        let roomsModel = new JSONModel();
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
        this.getMessages(this.currentRoom());
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
          Authorization: "Bearer: " + this.token
        };
      },

      logout: function() {
        sessionStorage.clear();
        window.location.href = "/login/";
      },

      changeRoom: function(event) {
        var newRoom = event
          .getSource()
          .getTitle()
          .slice(1);
        this.leaveChannel(this.currentRoom());
        this.getMessages(newRoom);
        this.getView()
          .getModel("state")
          .setData({ currentRoom: newRoom });

        this.joinChannel(newRoom);

        this.byId("app").toDetail(this.createId("room"));
      },

      onPressBack: function() {
        this.byId("app").backMaster();
      },

      currentRoom: function() {
        return this.getView()
          .getModel("state")
          .getData().currentRoom;
      },

      joinChannel: function(channel) {
        this.channel = this.socket.channel("room:" + this.currentRoom(), {});

        this.channel.on("new_msg", payload => {
          this.updateModel(payload);
        });

        this.channel
          .join()
          .receive("ok", resp => {
            MessageToast.show("Joined " + this.currentRoom());
          })
          .receive("error", resp => {
            "Joined " + this.currentRoom("Error joining " + this.currentRoom());
            console.error("Unable to join", resp);
          });
      },

      leaveChannel: function(channel) {
        this.channel.leave();
      },

      setupSocket: function() {
        this.socket = new Phoenix.Socket("/socket", { params: {} });
        this.socket.connect();
      },

      onPost: function(event) {
        this.channel.push("new_msg", {
          body: event.getParameter("value"),
          token: sessionStorage.getItem("token"),
          room: this.currentRoom()
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
      },

      newRoom: function() {}
    });
  }
);
