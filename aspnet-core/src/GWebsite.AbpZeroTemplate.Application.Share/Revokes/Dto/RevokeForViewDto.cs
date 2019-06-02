using GWebsite.AbpZeroTemplate.Core.Models;

namespace GWebsite.AbpZeroTemplate.Application.Share.Revokes.Dto
{
    /// <summary>
    /// <model cref="Revoke"></model>
    /// </summary>
    public class RevokeForViewDto
    {
        //Ngày thu hồi
        public string RevokeDate { get; set; }
        //Mã tài sản
        public string AssetId { get; set; }
        //Lý do
        public string Reason { get; set; }
        //Trạng thái duyệt
        public string StatusApproved { get; set; }
    }
}