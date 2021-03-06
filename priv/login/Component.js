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
        rootView: "slap.ui.view.Login"
      },
      init: function() {
        // call the init function of the parent
        UIComponent.prototype.init.apply(this, arguments);
      },
      getContentDensityClass: function() {
        if (!this._sContentDensityClass) {
          if (!sap.ui.Device.support.touch) {
            this._sContentDensityClass = "sapUiSizeCompact";
          } else {
            this._sContentDensityClass = "sapUiSizeCozy";
          }
        }
        return this._sContentDensityClass;
      }
    });
  }
);
