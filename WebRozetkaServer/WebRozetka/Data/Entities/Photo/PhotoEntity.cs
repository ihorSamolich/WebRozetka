using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using WebRozetka.Data.Entities.Product;

namespace WebRozetka.Data.Entities.Photo
{
    [Table("Photos")]
    public class PhotoEntity
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(255)]
        public string FilePath { get; set; }
        [Required]
        public int ProductId { get; set; }
        public ProductEntity Product { get; set; }
    }
}
