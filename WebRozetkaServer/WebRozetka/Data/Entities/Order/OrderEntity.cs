using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebRozetka.Data.Entities.Identity;

namespace WebRozetka.Data.Entities.Order
{
    [Table("Order")]
    public class OrderEntity : BaseEntity<int>
    {

        [Required]
        public string CustomerEmail { get; set; }

        [Required]
        public string CustomerName { get; set; }

        [Required]
        public string CustomerPhone { get; set; }

        [Required]
        public int OrderStatusId { get; set; }
        public OrderStatusEntity OrderStatus { get; set; }

        [Required]
        public int OrderInfoId { get; set; }
        public OrderInfoEntity OrderInfo { get; set; }

        public ICollection<OrderItemsEntity> OrderItems { get; set; }
    }
}
