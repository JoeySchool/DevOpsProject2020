using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace CloudApiProject.Models
{
    public class Brand
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        public string Founder { get; set; }
        
        public DateTime Founded { get; set; }
        public string CEO { get; set; }
        public string Headquarters { get; set; }
        [JsonIgnore]
        public ICollection<Case> cases { get; set; }
    }
}
