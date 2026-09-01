/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { PosOrder } from "@point_of_sale/app/models/pos_order";

patch(PosOrder.prototype, {
    setup(vals) {
        super.setup(...arguments);
        // Stamp the moment the order is created/opened.
        // Existing orders reloaded from the server already have a value.
        if (!this.x_order_open_time) {
            this.x_order_open_time = luxon.DateTime.now().toFormat("dd/MM/yyyy HH:mm:ss");
        }
    },
});
