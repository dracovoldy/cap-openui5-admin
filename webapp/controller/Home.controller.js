sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/m/Popover',
	'sap/m/Button'
], function (jQuery, Controller, Popover, Button) {
	"use strict";

	return Controller.extend("cap.estimate.controller.Home", {

		onInit: function () {
			var that = this;
			// alert("Im alive: View");
			this.router = this.getOwnerComponent().getRouter();

			var globalModel = this.getOwnerComponent().getModel("init_data");
			this.getView().setModel(globalModel);
			
			var url = "http://10.154.52.73:3000/api/estimate";

			$.ajax({
				url: url,
				type: 'GET',
				dataType: 'json',
				success: function (data) {
					console.log(data);

					that.getView().getModel().setProperty("/tableData", data);
				},
				error: function (e) {
					console.log(e);
				}
			});

		}

	});

});