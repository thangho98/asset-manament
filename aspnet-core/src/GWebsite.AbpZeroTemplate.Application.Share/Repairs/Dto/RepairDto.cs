using Abp.Domain.Entities;
using GWebsite.AbpZeroTemplate.Core.Models;

namespace GWebsite.AbpZeroTemplate.Application.Share.Repairs.Dto
{
    /// <summary>
    /// <model cref="Repair"></model>
    /// </summary>
    public class RepairDto : Entity<int>
    {
        //Mã tài sản
        public string AssetId { get; set; }
        //Ngày xuất
        public string ExportDate { get; set; }
        //Người đề xuất
        public int Proposer { get; set; }
        //NV phụ trách
        public int StaffInCharge { get; set; }
        //Ngày sửa xong
        public string DateRepaired { get; set; }
        //Trạng thái
        public bool Status { get; set; }
        //Trạng thái duyệt
        public bool StatusApproved { get; set; }
    }
}
