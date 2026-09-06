/** @odoo-module **/
// Author: Yousif Shakir - https://donialink.com
//
// Central place for turning "now" into the string we store/display.
// We deliberately use the timezone Odoo is configured with for the current
// user (res.users.tz, delivered to the browser as `user.tz`) instead of
// `luxon.DateTime.now()` on its own, which follows whatever zone luxon
// currently defaults to and can end up showing plain UTC on a terminal
// whose OS clock is UTC.  When the user has no timezone set we fall back to
// the POS terminal's own system clock rather than UTC.

import { user } from "@web/core/user";

export const POS_DT_FORMAT = "dd/MM/yyyy HH:mm:ss";

/** The zone we resolve every timestamp in: Odoo user tz, else the OS clock. */
export function posZone() {
    return user.tz || "system";
}

/** luxon DateTime for the current instant, in the Odoo user's timezone. */
export function posNow() {
    return luxon.DateTime.now().setZone(posZone());
}

/** Format a luxon DateTime with the module's display/storage format. */
export function formatPosDateTime(dt) {
    return dt.toFormat(POS_DT_FORMAT);
}

/** "now", already formatted for storage/display. */
export function posNowString() {
    return formatPosDateTime(posNow());
}

/** Parse a string produced by posNowString() back into a luxon DateTime. */
export function parsePosDateTime(str) {
    return luxon.DateTime.fromFormat(str || "", POS_DT_FORMAT, { zone: posZone() });
}
