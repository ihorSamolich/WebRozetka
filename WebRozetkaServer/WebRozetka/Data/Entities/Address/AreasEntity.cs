using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebRozetka.Data.Entities.Addres
{
    [Table("Areas")]
    public class AreasEntity
    {
        [Key]
        public string Ref { get; set; }
        [Required]
        public string Description { get; set; }

        public virtual ICollection<SettlementEntity> Settlements { get; set; }
    }
}
