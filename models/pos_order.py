# Author: Yousif Shakir - https://donialink.com
from odoo import api, fields, models


class PosOrder(models.Model):
    _inherit = "pos.order"

    x_order_open_time = fields.Char(
        string="Order Open Time",
        help="Local time (in the POS user's timezone) at which this order was opened.",
    )

    @api.model
    def _load_pos_data_fields(self, config_id):
        """Expose the field to the POS front-end so it is loaded with existing
        orders and written back when the order is saved."""
        fields_list = super()._load_pos_data_fields(config_id)
        if "x_order_open_time" not in fields_list:
            fields_list.append("x_order_open_time")
        return fields_list
