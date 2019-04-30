sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"

], function (Controller, MessageBox) {
	"use strict";

	return Controller.extend("cap.estimate.controller.Scope", {
		onInit: function () {
			this.router = this.getOwnerComponent().getRouter();
			var globalModel = this.getOwnerComponent().getModel("init_data");
			this.getView().setModel(globalModel);

			if (this.getView().getModel().getProperty("/tableData").length > 0) {
				this.parseData();
			}
			this.router.attachRouteMatched(this.handleRouteMatched, this);
		},
		handleRouteMatched: function (evt) {
			if (evt.getParameter("name") !== "Scope") {
				if (this.getView().getModel().getProperty("/tableData").length > 0) {
					this.parseData();
				}
			}

		},
		parseData: function () {
			if (this.getView().getModel().getProperty("/posting/sc_bp_ptp") > 0) {
				this.getView().byId("PTP_Check").setSelected(true);
			} else {
				this.getView().byId("PTP_Check").setSelected(false);
			}
			if (this.getView().getModel().getProperty("/posting/sc_bp_otc") > 0) {
				this.getView().byId("OTC_Check").setSelected(true);
			} else {
				this.getView().byId("OTC_Check").setSelected(false);
			}
			if (this.getView().getModel().getProperty("/posting/sc_bp_mts") > 0) {
				this.getView().byId("MTS_Check").setSelected(true);
			} else {
				this.getView().byId("MTS_Check").setSelected(false);
			}
			if (this.getView().getModel().getProperty("/posting/sc_bp_dts") > 0) {
				this.getView().byId("DTS_Check").setSelected(true);
			} else {
				this.getView().byId("DTS_Check").setSelected(false);
			}
			if (this.getView().getModel().getProperty("/posting/sc_bp_ftm") > 0) {
				this.getView().byId("FIN_Check").setSelected(true);
			} else {
				this.getView().byId("FIN_Check").setSelected(false);
			}
			if (this.getView().getModel().getProperty("/posting/sc_bp_other")) {
				this.getView().byId("OTH_Check").setSelected(true);
				this.getView().byId("OTH_Value").setValue(this.getView().getModel().getProperty("/posting/sc_bp_other"));
			} else {
				this.getView().byId("OTH_Check").setSelected(false);
			}

			this.getView().byId("Scenarios1").setSelectedKey(this.getView().getModel().getProperty("/posting/sc_ints_v").toString());
			this.getView().byId("Scenarios2").setSelectedKey(this.getView().getModel().getProperty("/posting/sc_unts_v").toString());
			this.getView().byId("Scenarios3").setSelectedKey(this.getView().getModel().getProperty("/posting/sc_user_v").toString());
			this.getView().byId("Lang_Select").setSelectedKey(this.getView().getModel().getProperty("/posting/sc_lang_v").toString());

			this.getView().byId("LATAM_Plants").setSelectedKey(this.getView().getModel().getProperty("/posting/sc_loc_latam_va").toString());
			this.getView().byId("LATAM_Off").setSelectedKey(this.getView().getModel().getProperty("/posting/sc_loc_latam_vb").toString());
			this.getView().byId("LATAM_Dcs").setSelectedKey(this.getView().getModel().getProperty("/posting/sc_loc_latam_vc").toString());
			this.getView().byId("LATAM_Sos").setSelectedKey(this.getView().getModel().getProperty("/posting/sc_loc_latam_vd").toString());

			this.getView().byId("EU_Plants").setSelectedKey(this.getView().getModel().getProperty("/posting/sc_loc_eu_va").toString());
			this.getView().byId("EU_Off").setSelectedKey(this.getView().getModel().getProperty("/posting/sc_loc_eu_vb").toString());
			this.getView().byId("EU_Dcs").setSelectedKey(this.getView().getModel().getProperty("/posting/sc_loc_eu_vc").toString());
			this.getView().byId("EU_Sos").setSelectedKey(this.getView().getModel().getProperty("/posting/sc_loc_eu_vd").toString());

			this.getView().byId("APAC_Plants").setSelectedKey(this.getView().getModel().getProperty("/posting/sc_loc_apac_va").toString());
			this.getView().byId("APAC_Off").setSelectedKey(this.getView().getModel().getProperty("/posting/sc_loc_apac_vb").toString());
			this.getView().byId("APAC_Dcs").setSelectedKey(this.getView().getModel().getProperty("/posting/sc_loc_apac_vc").toString());
			this.getView().byId("APAC_Sos").setSelectedKey(this.getView().getModel().getProperty("/posting/sc_loc_apac_vd").toString());

			this.getView().byId("NA_Plants").setSelectedKey(this.getView().getModel().getProperty("/posting/sc_loc_na_va").toString());
			this.getView().byId("NA_Off").setSelectedKey(this.getView().getModel().getProperty("/posting/sc_loc_na_vb").toString());
			this.getView().byId("NA_Dcs").setSelectedKey(this.getView().getModel().getProperty("/posting/sc_loc_na_vc").toString());
			this.getView().byId("NA_Sos").setSelectedKey(this.getView().getModel().getProperty("/posting/sc_loc_na_vd").toString());

		},
		nextPress: function () {
			this.getView().getModel().setProperty("/posting/sc_reg_na_x", "");
			this.getView().getModel().setProperty("/posting/sc_reg_na_x", "");
			this.getView().getModel().setProperty("/posting/sc_reg_na_x", "");
			this.getView().getModel().setProperty("/posting/sc_reg_na_x", "");

			var NA_Plants = parseInt(this.getView().byId("NA_Plants").getSelectedKey(), 10);
			var NA_Off = parseInt(this.getView().byId("NA_Off").getSelectedKey(), 10);
			var NA_Dcs = parseInt(this.getView().byId("NA_Dcs").getSelectedKey(), 10);
			var NA_Sos = parseInt(this.getView().byId("NA_Sos").getSelectedKey(), 10);

			this.getView().getModel().setProperty("/posting/sc_loc_na_va", NA_Plants);
			this.getView().getModel().setProperty("/posting/sc_loc_na_vb", NA_Off);
			this.getView().getModel().setProperty("/posting/sc_loc_na_vc", NA_Dcs);
			this.getView().getModel().setProperty("/posting/sc_loc_na_vd", NA_Sos);

			if (NA_Plants > 0 || NA_Off > 0 || NA_Dcs > 0 || NA_Sos > 0) {
				this.getView().getModel().setProperty("/posting/sc_reg_na_x", "X");
			}

			var LATAM_Plants = parseInt(this.getView().byId("LATAM_Plants").getSelectedKey(), 10);
			var LATAM_Off = parseInt(this.getView().byId("LATAM_Off").getSelectedKey(), 10);
			var LATAM_Dcs = parseInt(this.getView().byId("LATAM_Dcs").getSelectedKey(), 10);
			var LATAM_Sos = parseInt(this.getView().byId("LATAM_Sos").getSelectedKey(), 10);

			this.getView().getModel().setProperty("/posting/sc_loc_latam_va", LATAM_Plants);
			this.getView().getModel().setProperty("/posting/sc_loc_latam_vb", LATAM_Off);
			this.getView().getModel().setProperty("/posting/sc_loc_latam_vc", LATAM_Dcs);
			this.getView().getModel().setProperty("/posting/sc_loc_latam_vd", LATAM_Sos);

			if (LATAM_Plants > 0 || LATAM_Off > 0 || LATAM_Dcs > 0 || LATAM_Sos > 0) {
				this.getView().getModel().setProperty("/posting/sc_reg_latam_x", "X");
			}

			var APAC_Plants = parseInt(this.getView().byId("APAC_Plants").getSelectedKey(), 10);
			var APAC_Off = parseInt(this.getView().byId("APAC_Off").getSelectedKey(), 10);
			var APAC_Dcs = parseInt(this.getView().byId("APAC_Dcs").getSelectedKey(), 10);
			var APAC_Sos = parseInt(this.getView().byId("APAC_Sos").getSelectedKey(), 10);

			this.getView().getModel().setProperty("/posting/sc_loc_apac_va", APAC_Plants);
			this.getView().getModel().setProperty("/posting/sc_loc_apac_vb", APAC_Off);
			this.getView().getModel().setProperty("/posting/sc_loc_apac_vc", APAC_Dcs);
			this.getView().getModel().setProperty("/posting/sc_loc_apac_vd", APAC_Sos);

			if (APAC_Plants > 0 || APAC_Off > 0 || APAC_Dcs > 0 || APAC_Sos > 0) {
				this.getView().getModel().setProperty("sc_reg_apac_x", "X");
			}

			var EU_Plants = parseInt(this.getView().byId("EU_Plants").getSelectedKey(), 10);
			var EU_Off = parseInt(this.getView().byId("EU_Off").getSelectedKey(), 10);
			var EU_Dcs = parseInt(this.getView().byId("EU_Dcs").getSelectedKey(), 10);
			var EU_Sos = parseInt(this.getView().byId("EU_Sos").getSelectedKey(), 10);

			this.getView().getModel().setProperty("/posting/sc_loc_eu_va", EU_Plants);
			this.getView().getModel().setProperty("/posting/sc_loc_eu_vb", EU_Off);
			this.getView().getModel().setProperty("/posting/sc_loc_eu_vc", EU_Dcs);
			this.getView().getModel().setProperty("/posting/sc_loc_eu_vd", EU_Sos);

			if (EU_Plants > 0 || EU_Off > 0 || EU_Dcs > 0 || EU_Sos > 0) {
				this.getView().getModel().setProperty("/posting/sc_reg_eu_x", "X");
			}

			if (this.getView().getModel().getProperty("/posting/sc_reg_eu_x") !== "X" && this.getView().getModel().getProperty(
					"/posting/sc_reg_apac_x") !== "X" && this.getView().getModel().getProperty("/posting/sc_reg_latam_x") !== "X" && this.getView().getModel()
				.getProperty("/posting/sc_reg_na_x") !== "X") {
				MessageBox.information("Please input values at least for a single region", {
					title: "Information", // default
					onClose: null, // default
					styleClass: "", // default
					initialFocus: null, // default
					textDirection: sap.ui.core.TextDirection.Inherit // default
				});

				return;
			}

			//LOB Checkboxes
			var selected = 0;
			if (this.getView().byId("FIN_Check").getSelected()) {
				this.getView().getModel().setProperty("/posting/sc_bp_ftm", 1);
				selected++;
			}
			if (this.getView().byId("PTP_Check").getSelected()) {
				this.getView().getModel().setProperty("/posting/sc_bp_ptp", 1);
				selected++;
			}
			if (this.getView().byId("MTS_Check").getSelected()) {
				this.getView().getModel().setProperty("/posting/sc_bp_mts", 1);
				selected++;
			}
			if (this.getView().byId("OTC_Check").getSelected()) {
				this.getView().getModel().setProperty("/posting/sc_bp_otc", 1);
				selected++;
			}
			if (this.getView().byId("DTS_Check").getSelected()) {
				this.getView().getModel().setProperty("/posting/sc_bp_dts", 1);
				selected++;
			}
			if (this.getView().byId("OTH_Check").getSelected()) {
				this.getView().getModel().setProperty("/posting/sc_bp_other", this.getView().byId("OTH_Value").getValue());
				selected++;
			}
			if (selected === 0) {
				MessageBox.information("Please Select Business Process", {
					title: "Information", // default
					onClose: null, // default
					styleClass: "", // default
					initialFocus: null, // default
					textDirection: sap.ui.core.TextDirection.Inherit // default
				});

				return;
			}

			var Scenarios1 = parseInt(this.getView().byId("Scenarios1").getSelectedKey(), 10);
			this.getView().getModel().setProperty("/posting/sc_ints_v", Scenarios1);

			var Scenarios2 = parseInt(this.getView().byId("Scenarios2").getSelectedKey(), 10);
			this.getView().getModel().setProperty("/posting/sc_unts_v", Scenarios2);

			var Scenarios3 = parseInt(this.getView().byId("Scenarios3").getSelectedKey(), 10);
			this.getView().getModel().setProperty("/posting/sc_user_v", Scenarios3);

			var Lang_Select = parseInt(this.getView().byId("Lang_Select").getSelectedKey(), 10);
			this.getView().getModel().setProperty("/posting/sc_lang_v", Lang_Select);

			this.getView().getModel().setProperty("/Visited/" + "Scope" + "/status", 2);
			this.getView().getModel().setProperty("/Visited/" + "Infrastructure" + "/status", 1);
			this.getView().getModel().setProperty("/navSelectedKey", "Infrastructure");
			this.router.navTo("Infrastructure");
		},
		backPress: function (oEvent){
			this.router.navTo("Background");
		}

	});

});