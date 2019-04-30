sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function (Controller, MessageBox) {
	"use strict";

	return Controller.extend("cap.estimate.controller.Others", {

		onInit: function () {
			this.router = this.getOwnerComponent().getRouter();
			var globalModel = this.getOwnerComponent().getModel("init_data");
			this.getView().setModel(globalModel);
		},
		nextPress: function () {
			var that = this;
			console.log(this.getView().getModel().getProperty("/posting"));

			var Customer = this.getView().getModel().getProperty("/posting/comp_name");
			var CapgContact = this.getView().getModel().getProperty("/posting/cap_name");

			var payload = this.getView().getModel().getProperty("/posting");
			var id = this.getView().getModel().getProperty("/posting/entry_id");
			//prepare post
			var url = "http://10.154.52.73:3000/api/estimate/" + id ;

			$.ajax({
				url: url,
				type: 'PUT',
				data: payload,
				dataType: 'json',
				contentType: 'application/x-www-form-urlencoded',
				success: function (data) {
					console.log(data);

					
					MessageBox.success("Estimate Modified for: " + Customer + "\n Capgemini PoC: " + CapgContact, {
						title: "Success",
						actions: [sap.m.MessageBox.Action.OK],
						onClose: function (sAction) {
							that.router.navTo("FinalDashBoard");
						},
						styleClass: "",
						initialFocus: null,
						textDirection: sap.ui.core.TextDirection.Inherit
					});
				},
				error: function (e) {
					console.log(e);
				}
			});

		}

	});

});