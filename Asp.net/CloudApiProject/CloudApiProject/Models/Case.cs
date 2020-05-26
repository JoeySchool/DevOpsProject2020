using CloudApiProject.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace CloudApiProject
{
    public partial class Case
    {
        internal object[] id;

        public int Id { get; set; }
        [Required]
        public string CaseName { get; set; }
        public Brand CaseBrand { get; set; }
        [Url]
        public string ProductLink { get; set; }
        [Required]
        public int Cost { get; set; }
        public string Type { get; set; }
        public int L { get; set; }
        public int W { get; set; }
        public int H { get; set; }
        public double Volume { get; set; }
        public double Footprint { get; set; }
        public string Storage { get; set; }
        public string PsuType { get; set; }
        public int GPULength { get; set; }
        public int ExpansionSlots { get; set; }
        public int CoolerHeight { get; set; }
        public string FanSupport { get; set; }
        public string RadiatorSupport { get; set; }
        [MaxLength(200)]
        public string Comments { get; set; }
        ////[JsonIgnore]
        //public virtual IList<Gpucase> Gpucases { get; set; }
    }
}
