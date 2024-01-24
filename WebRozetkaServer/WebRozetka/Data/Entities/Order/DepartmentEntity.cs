using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebRozetka.Data.Entities.Order
{
    [Table("Department")]
    public class DepartmentEntity : BaseEntity<int>
    {
        [Required, Range(0, 5000, ErrorMessage = "Number must be than 0 to 5000.")]
        public int Number { get; set; }

        [Required]
        public int CityId { get; set; }
        public CitiesEntity City { get; set; }

        [Required]
        public int DeliveryServiсesId { get; set; }
        public DeliveryServiсesEntity DeliveryServiсes { get; set; }
    }
}
