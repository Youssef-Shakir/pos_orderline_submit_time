# Author: Yousif Shakir - https://donialink.com
from odoo import api, fields, models


class PosOrderLine(models.Model):
    _inherit = "pos.order.line"

    x_submitted_time = fields.Char(
        string="Submitted Time",
        help="Local time (as shown on the POS terminal) at which this line was "
        "added / submitted to the order.",
    )

    @api.model
    def _load_pos_data_fields(self, config_id):
        """Make the new field available in the POS front-end."""
        fields_list = super()._load_pos_data_fields(config_id)
        if "x_submitted_time" not in fields_list:
            fields_list.append("x_submitted_time")
        return fields_list
