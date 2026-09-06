/** @odoo-module **/
// Author: Yousif Shakir - https://donialink.com

import { patch } from "@web/core/utils/patch";
import { PosOrder } from "@point_of_sale/app/models/pos_order";
import { posNowString } from "@pos_orderline_submit_time/js/pos_local_time";

patch(PosOrder.prototype, {
    setup(vals) {
        super.setup(...arguments);
        // Stamp the moment the order is created/opened, in the Odoo user's
        // timezone. Existing orders reloaded from the server already carry a
        // value, so we never overwrite it.
        if (!this.x_order_open_time) {
            this.x_order_open_time = posNowString();
        }
    },
});
