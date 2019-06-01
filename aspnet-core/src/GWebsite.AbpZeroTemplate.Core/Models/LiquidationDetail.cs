using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GWebsite.AbpZeroTemplate.Core.Models
{
    /// <summary>
    /// Entity Chi tiết thanh lý
    /// </summary>

    public class LiquidationDetail : FullAuditModel
    {
        //Mã thanh lý
        public string LiquidationID { get; set; }
        //Mã tài sản
        public string AssetID { get; set; }
        //Nguyên giá
        public float OriginalPrice { get; set; }
        //Giá trị còn lại
        public float ResidualValue { get; set; }
        //Tình trạng tài sản/ công cụ
        public string AssetStatus { get; set; }
        //Hình thức thanh lý
        public int LiquidationForm { get; set; }
        //Giá tiền thanh lý
        public string LiquidationPrice { get; set; }
    }
}
