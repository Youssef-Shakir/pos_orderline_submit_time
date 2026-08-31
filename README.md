# POS Orderline Submit Time

Odoo 18 module that records and displays the time each line was submitted to a
Point of Sale order.

When a product is added to the order, a small note appears under the line in the
POS showing the local time it was submitted, e.g.:

```
Coca-Cola                          2.00
1 x 2.00 / Units
🕐 Submitted: 31/08/2026 14:35:07
```

## Features

- New field `x_submitted_time` on `pos.order.line`.
- The time is stamped on the POS terminal the moment the product is added to the
  order (which is what you see after clicking **Order**).
- The value is saved with the order, so it stays on the stored order and is
  available on receipts and the customer display.
- Existing lines reloaded from the server keep their original timestamp.

## Installation

1. Copy the `pos_orderline_submit_time` folder into your Odoo addons path.
2. Restart the Odoo service and update the apps list.
3. Install **POS Orderline Submit Time**.
4. Close and reopen the POS session so the front-end assets rebuild.

## Compatibility

- Odoo 18.0
- Depends on: `point_of_sale`

## Technical notes

| File | Purpose |
| --- | --- |
| `models/pos_order_line.py` | Adds `x_submitted_time` and exposes it via `_load_pos_data_fields`. |
| `static/src/js/pos_order_line.js` | Patches `PosOrderline` to stamp the time and feed it to the UI. |
| `static/src/xml/orderline.xml` | Extends the `point_of_sale.Orderline` template to render the note. |

If you want the timestamp to be set only when the line is fired to the kitchen
(`pos_restaurant` **Order** button) instead of at add time, hook `submitOrder` /
the preparation-change flow instead of `setup()`.

## Author

Yousif Shakir — <https://donialink.com>

## License

LGPL-3
