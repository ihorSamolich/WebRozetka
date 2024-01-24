using System.ComponentModel.DataAnnotations.Schema;

namespace WebRozetka.Data.Entities.Order
{
    [Table("Cities")]
    public class CitiesEntity : BaseEntity<int>
    {
        public string Name { get; set; }
    }
}
