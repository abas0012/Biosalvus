namespace Biosalvus.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("FireData")]
    public partial class FireData
    {
        [Key]
        [Column(Order = 0, TypeName = "numeric")]
        public decimal latitude { get; set; }

        [Key]
        [Column(Order = 1, TypeName = "numeric")]
        public decimal longitude { get; set; }

        public double? brightness { get; set; }

        public double? scan { get; set; }

        public double? track { get; set; }

        public DateTime? acq_date { get; set; }

        public double? acq_time { get; set; }

        [StringLength(255)]
        public string satellite { get; set; }

        [StringLength(255)]
        public string instrument { get; set; }

        public double? confidence { get; set; }

        public double? version { get; set; }

        public double? bright_t31 { get; set; }

        public double? frp { get; set; }

        [StringLength(255)]
        public string daynight { get; set; }

        public double? type { get; set; }

        [StringLength(255)]
        public string full_address { get; set; }

        [StringLength(255)]
        public string street { get; set; }

        [StringLength(255)]
        public string city { get; set; }

        [StringLength(255)]
        public string state { get; set; }

        public double? postcode { get; set; }
    }
}
