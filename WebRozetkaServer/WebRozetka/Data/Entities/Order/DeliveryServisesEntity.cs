using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebRozetka.Data.Entities.Order
{
    [Table("DeliveryServiсes")]
    public class DeliveryServiсesEntity : BaseEntity<int>
    {
        [Required, StringLength(255)]
        public string Name { get; set; }
    }
}
