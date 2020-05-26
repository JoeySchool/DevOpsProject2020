using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace CloudApiProject.Models
{
    public class Brand
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [DataMember]
        public string Founder { get; set; }

        [DataMember]
        public DateTime Founded { get; set; }

        [DataMember]
        public string CEO { get; set; }

        [DataMember]
        public string Headquarters { get; set; }

        [DataMember]
        [JsonIgnore]
        public ICollection<Case> cases { get; set; }
    }
}
