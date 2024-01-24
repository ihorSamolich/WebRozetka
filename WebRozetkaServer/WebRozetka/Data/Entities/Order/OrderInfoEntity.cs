using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebRozetka.Data.Entities.Identity;

namespace WebRozetka.Data.Entities.Order
{
    [Table("OrderInfo")]
    public class OrderInfoEntity : BaseEntity<int>
    {
        [Required]
        public int UserId { get; set; }
        public UserEntity User { get; set; }

        [Required]
        public int DepartmentId { get; set; }
        public DepartmentEntity Department { get; set; }
    }
}
