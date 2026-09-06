/** @odoo-module **/
// Author: Yousif Shakir - https://donialink.com

import { Component, useState, onWillUnmount } from "@odoo/owl";
import { Navbar } from "@point_of_sale/app/navbar/navbar";
import { posNow, parsePosDateTime } from "@pos_orderline_submit_time/js/pos_local_time";

export class OrderOpenTimer extends Component {
    static template = "pos_orderline_submit_time.OrderOpenTimer";
    static props = { pos: Object };

    setup() {
        this.state = useState({ elapsedTime: "00:00:00", openTime: "" });

        // A single ticking interval; the render reads reactive `state`.
        this.updateTimer();
        this.intervalId = setInterval(() => this.updateTimer(), 1000);
        onWillUnmount(() => clearInterval(this.intervalId));
    }

    /** Current order, tolerant of the get_order()/getOrder() naming. */
    get order() {
        const pos = this.props.pos;
        if (typeof pos.get_order === "function") {
            return pos.get_order();
        }
        if (typeof pos.getOrder === "function") {
            return pos.getOrder();
        }
        return null;
    }

    updateTimer() {
        const order = this.order;
        const openTime = order && order.x_order_open_time;
        if (!openTime) {
            this.state.elapsedTime = "00:00:00";
            this.state.openTime = "";
            return;
        }
        this.state.openTime = openTime;

        const openDateTime = parsePosDateTime(openTime);
        if (!openDateTime.isValid) {
            this.state.elapsedTime = "00:00:00";
            return;
        }

        const diff = posNow().diff(openDateTime);
        let totalSeconds = Math.floor(diff.as("seconds"));
        if (totalSeconds < 0) {
            totalSeconds = 0;
        }
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const pad = (n) => n.toString().padStart(2, "0");
        this.state.elapsedTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
}

// Make the component resolvable from the inherited Navbar template.
Navbar.components = { ...(Navbar.components || {}), OrderOpenTimer };
