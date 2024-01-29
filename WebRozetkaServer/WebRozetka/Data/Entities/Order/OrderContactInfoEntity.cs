﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebRozetka.Data.Entities.Identity;

namespace WebRozetka.Data.Entities.Order
{
    [Table("OrderContactInfo")]
    public class OrderContactInfoEntity
    {
        [Key]
        [ForeignKey("Order")]
        public int OrderId { get; set; }

        [Required, StringLength(200)]
        public string FirstName { get; set; }

        [Required, StringLength(200)]
        public string LastName { get; set; }

        public string Phone { get; set; }
        public virtual OrderEntity Order { get; set; }
    }
}