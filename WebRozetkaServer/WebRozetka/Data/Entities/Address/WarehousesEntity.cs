using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebRozetka.Data.Entities.Addres
{
    [Table("Warehouses")]
    public class WarehouseEntity
    {
        [Key]
        public string Ref { get; set; }
        [Required]
        public string Description { get; set; }

        public int Number { get; set; }

        public string SettlementId { get; set; }
        public virtual SettlementEntity Settlement { get; set; }
    }
}
