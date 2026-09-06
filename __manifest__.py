{
    "name": "POS Orderline Submit Time",
    "version": "18.0.1.0.0",
    "category": "Point of Sale",
    "summary": "Record and display the time each line was submitted to a POS order",
    "description": """
Adds a small note under every order line in the Point of Sale showing the
local time at which the line was added / submitted to the order.

The time is stored on pos.order.line (field x_submitted_time) so it is kept
on the saved order and printed information.
""",
    "author": "Yousif Shakir",
    "website": "https://donialink.com",
    "depends": ["point_of_sale"],
    "assets": {
        "point_of_sale._assets_pos": [
            "pos_orderline_submit_time/static/src/js/pos_local_time.js",
            "pos_orderline_submit_time/static/src/js/pos_order_line.js",
            "pos_orderline_submit_time/static/src/js/pos_order.js",
            "pos_orderline_submit_time/static/src/js/order_open_timer.js",
            "pos_orderline_submit_time/static/src/css/order_open_timer.css",
            "pos_orderline_submit_time/static/src/xml/orderline.xml",
            "pos_orderline_submit_time/static/src/xml/order_open_timer.xml",
        ],
    },
    "installable": True,
    "license": "LGPL-3",
}
