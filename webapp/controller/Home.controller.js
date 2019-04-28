sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/m/Popover',
	'sap/m/Button',
	'sap/ui/model/json/JSONModel',
	'sap/ui/model/Filter'
], function (jQuery, Controller, Popover, Button, JSONModel, Filter) {
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

		},
		loadRecord: function (oEvent) {
			this.getView().getModel().setProperty("/posting", oEvent.getSource().getBindingContext().getObject());
			this.router.navTo("Customer");
		},
		GoPress: function (oEvent) {
			var CompanyName = this.getView().byId("name").getValue().trim();
			var SectorValue = "";
			if (this.getView().byId("Sector_Select").getSelectedKey() === "X") {
				SectorValue = "";
			} else {
				SectorValue = this.getView().byId("Sector_Select").getSelectedKey();
			}
			var RegionValue = "";
			if (this.getView().byId("Region_Select").getSelectedKey() === "X") {
				RegionValue = "";
			} else {
				RegionValue = this.getView().byId("Region_Select").getSelectedKey();
			}
			var ClientValue = this.getView().byId("client_name").getValue().trim();
			var CapgValue = this.getView().byId("capg_contact").getValue().trim();

			var oFilter = [];
			var andFilter = [];

			if (CompanyName.length > 0) {
				var filterKey = new Filter(
					"comp_name",
					sap.ui.model.FilterOperator.Contains, CompanyName
				);
				oFilter.push(filterKey);
			}

			if (SectorValue.length > 0) {
				var filterKey = new Filter(
					"comp_sector",
					sap.ui.model.FilterOperator.EQ, SectorValue
				);
				oFilter.push(filterKey);
			}
			
			if (RegionValue.length > 0) {
				var filterKey = new Filter(
					"comp_region",
					sap.ui.model.FilterOperator.EQ, RegionValue
				);
				oFilter.push(filterKey);
			}
			
			if (ClientValue.length > 0) {
				var filterKey = new Filter(
					"client_name",
					sap.ui.model.FilterOperator.Contains, ClientValue
				);
				oFilter.push(filterKey);
			}
			
			if (CapgValue.length > 0) {
				var filterKey = new Filter(
					"cap_name",
					sap.ui.model.FilterOperator.Contains, CapgValue
				);
				oFilter.push(filterKey);
			}
			
			// andFilter.push(new sap.ui.model.Filter(oFilter, false));
			this.getView().byId("idProductsTable").getBinding("items").filter(new sap.ui.model.Filter(oFilter, true));
		}

	});

});