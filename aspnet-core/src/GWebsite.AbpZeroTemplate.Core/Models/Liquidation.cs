using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GWebsite.AbpZeroTemplate.Core.Models
{
    /// <summary>
    /// Entity Thanh lý
    /// </summary>
    public class Liquidation : FullAuditModel
    {
        //Mã thanh lý
        public string LiquidationId { get; set; }
        //Ngày thanh lý
        public string LiquidationDate { get; set; }
        //Trạng thái duyệt
        public string StatusApproved { get; set; }
        //Đơn vị mua
        public string PurchaseUnit { get; set; }
        //Loại thanh lý
        public int LiquidationType { get; set; }
        //Số tiền thanh lý
        public float AmountOfLiquidation { get; set; }
        // tổng tài sản thanh lý
        public string TotalAsset { get; set; }
        //Trạng thái thanh lý
        public int LiquidationStatus { get; set; }
        //Ghi chú
        public string Note { get; set; }
    }
}
