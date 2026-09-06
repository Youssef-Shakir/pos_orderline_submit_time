# Author: Yousif Shakir - https://donialink.com
from odoo import fields, models


class PosOrder(models.Model):
    _inherit = "pos.order"

    x_order_open_time = fields.Char(
        string="Order Open Time",
        help="Local time (in the POS user's timezone) at which this order was opened.",
    )

    # NOTE: no _load_pos_data_fields override here on purpose.
    # pos.order inherits pos.load.mixin's default, which returns [] -> "load all
    # fields". A stored field is therefore already sent to the POS front-end and
    # written back on save. Returning a non-empty list would REPLACE that "all"
    # with just our field and break the POS order load.
