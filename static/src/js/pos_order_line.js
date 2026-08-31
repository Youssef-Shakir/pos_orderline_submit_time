/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { PosOrderline } from "@point_of_sale/app/store/models";

patch(PosOrderline.prototype, {
    setup(vals) {
        super.setup(...arguments);
        // Stamp the moment the line is created (i.e. the product is added to
        // the order). Existing lines reloaded from the server already have a
        // value, so we never overwrite it.
        if (!this.x_submitted_time) {
            this.x_submitted_time = luxon.DateTime.now().toFormat("dd/MM/yyyy HH:mm:ss");
        }
    },

    getDisplayData() {
        return {
            ...super.getDisplayData(),
            submittedTime: this.x_submitted_time || "",
        };
    },
});
