sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
  ],
  function(UIComponent, JSONModel, ResourceModel) {
    "use strict";
    return UIComponent.extend("slap.ui.Component", {
      metadata: {
        manifest: "json"
      },
      // metadata: {
      //   rootView: "slap.ui.view.Login"
      // },
      init: function() {
        // call the init function of the parent
        UIComponent.prototype.init.apply(this, arguments);
        // set data model
        var oData = {
          recipient: {
            name: "World"
          }
        };
        var oModel = new JSONModel(oData);
        this.setModel(oModel);

        // create the views based on the url/hash
        this.getRouter().initialize();
      }
    });
  }
);
