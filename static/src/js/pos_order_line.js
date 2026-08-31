/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { PosOrderline } from "@point_of_sale/app/models/pos_order_line";
import { Orderline } from "@point_of_sale/app/generic_components/orderline/orderline";

// Allow the extra key produced by getDisplayData() below to pass the
// strict props validation of the generic Orderline component.
Orderline.props.line.shape.submittedTime = { type: String, optional: true };

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
