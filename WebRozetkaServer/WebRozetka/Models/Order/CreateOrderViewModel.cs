namespace WebRozetka.Models.Order
{

    public class CustomerPersonalData
    {
        public string Email { get; set; }
        public string Phone { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

    }

    public class DepartmentData
    {
        public string AreaRef { get; set; }
        public string SettlementRef { get; set; }
        public string WarehouseRef { get; set; }
    }

    public class PaymentData
    {
        public string PaymentType { get; set; }
    }

    public class CreateOrderViewModel
    {
        public CustomerPersonalData CustomerPersonalData { get; set; }
        public DepartmentData DepartmentData { get; set; }
        public PaymentData PaymentData { get; set; }
    }
}
