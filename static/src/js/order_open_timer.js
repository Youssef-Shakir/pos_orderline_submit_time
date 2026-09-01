/** @odoo-module **/

import { Component, useState, onMounted, onWillUnmount } from "@odoo/owl";
import { Navbar } from "@point_of_sale/app/navbar/navbar";

export class OrderOpenTimer extends Component {
    static template = "pos_orderline_submit_time.OrderOpenTimer";
    static props = {
        order: { type: Object, optional: true },
    };

    setup() {
        this.state = useState({
            elapsedTime: "00:00:00",
            openTime: "",
        });
        this.intervalId = null;

        onMounted(() => {
            this.updateTimer();
            this.intervalId = setInterval(() => this.updateTimer(), 1000);
        });

        onWillUnmount(() => {
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
        });
    }

    get hasTable() {
        return this.props.order && this.props.order.table_id;
    }

    updateTimer() {
        const order = this.props.order;
        if (!order || !order.x_order_open_time) {
            this.state.elapsedTime = "00:00:00";
            this.state.openTime = "";
            return;
        }

        this.state.openTime = order.x_order_open_time;

        // Parse the open time and calculate elapsed
        const openDateTime = luxon.DateTime.fromFormat(
            order.x_order_open_time,
            "dd/MM/yyyy HH:mm:ss"
        );

        if (!openDateTime.isValid) {
            this.state.elapsedTime = "00:00:00";
            return;
        }

        const now = luxon.DateTime.now();
        const diff = now.diff(openDateTime, ["hours", "minutes", "seconds"]);

        const hours = Math.floor(diff.hours).toString().padStart(2, "0");
        const minutes = Math.floor(diff.minutes).toString().padStart(2, "0");
        const seconds = Math.floor(diff.seconds).toString().padStart(2, "0");

        this.state.elapsedTime = `${hours}:${minutes}:${seconds}`;
    }
}

// Register component so it's available in templates
Navbar.components = {
    ...Navbar.components,
    OrderOpenTimer,
};
