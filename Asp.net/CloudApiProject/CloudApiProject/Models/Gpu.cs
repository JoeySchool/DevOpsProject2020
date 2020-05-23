using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CloudApiProject.Models
{
    public partial class Gpu
    {
        
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Url]
        public string PicSrc { get; set; }
        public string VideoChip { get; set; }
        public string Generation { get; set; }
        public string Brand { get; set; }
        [Required]
        public int Memory { get; set; }
        public string TypeMemory { get; set; }
        public int Cores { get; set; }
        public double Length { get; set; }
        public double Width { get; set; }
        public double Height { get; set; }
        public string LinkFab { get; set; }
        public string BrandName { get; set; }
        [Required]
        public double Cost { get; set; }
        [Required]
        public string ComputerChipManufacturer { get; set; }
        //[JsonIgnore]
        //public virtual IList<Gpucase> Gpucases { get; set; }
    }
}
