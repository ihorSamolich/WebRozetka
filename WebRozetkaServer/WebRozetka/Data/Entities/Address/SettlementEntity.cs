using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;

namespace WebRozetka.Data.Entities.Addres
{
    [Table("Settlements")]
    public class SettlementEntity
    {
        [Key]
        public string Ref { get; set; }
        [Required]
        public string Description { get; set; }

        public string AreaId { get; set; }
        public virtual AreasEntity Area { get; set; }

        public virtual ICollection<WarehouseEntity> Warehouses { get; set; }
    }
}
