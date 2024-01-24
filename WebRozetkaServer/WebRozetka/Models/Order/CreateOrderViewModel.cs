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
        public int CityId { get; set; }
        public int DeliveryServiceId { get; set; }
        public int DepartmentNumberId { get; set; }
    }

    public class CreateOrderViewModel
    {
        public string UserEmail { get; set; }
        public CustomerPersonalData CustomerPersonalData { get; set; }
        public DepartmentData DepartmentData { get; set; }
        public List<OrderItemViewModel> OrderProducts { get; set; }
    }
}
