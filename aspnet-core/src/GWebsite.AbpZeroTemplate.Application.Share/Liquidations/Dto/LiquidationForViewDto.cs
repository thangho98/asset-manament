using GWebsite.AbpZeroTemplate.Core.Models;

namespace GWebsite.AbpZeroTemplate.Application.Share.Liquidations.Dto
{
    /// <summary>
    /// <model cref="Liquidation"></model>
    /// </summary>
    public class LiquidationForViewDto
    {
        //Ngày thanh lý
        public string LiquidationDate { get; set; }
        //Mã tài sản
        public string AssetID { get; set; }
        //Trạng thái duyệt
        public string StatusApproved { get; set; }
    }
}