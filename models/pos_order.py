from odoo import fields, models


class PosOrder(models.Model):
    _inherit = "pos.order"

    x_order_open_time = fields.Char(
        string="Order Open Time",
        help="Local time (as shown on the POS terminal) at which this order was opened.",
    )
