using Abp.Application.Services.Dto;
using GWebsite.AbpZeroTemplate.Application.Share.Customers.Dto;

namespace GWebsite.AbpZeroTemplate.Application.Share.Customers
{
    public interface ICustomerAppService
    {
        void CreateOrEditCustomer(CustomerInput customerInput);
        CustomerInput GetCustomerForEdit(int id);
        void DeleteCustomer(int id);
        PagedResultDto<RepairDto> GetCustomers(RepairFilter input);
        CustomerForViewDto GetCustomerForView(int id);
    }
}
