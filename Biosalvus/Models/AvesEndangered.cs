namespace Biosalvus.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("AvesEndangered")]
    public partial class AvesEndangered
    {
        public int ID { get; set; }

        public double? individualCount { get; set; }

        public string sex { get; set; }

        public DateTime? eventDate { get; set; }

        public DateTime? eventTime { get; set; }

        public string country { get; set; }

        public string countryCode { get; set; }

        public string stateProvince { get; set; }

        public string verbatimLocality { get; set; }

        [Column(TypeName = "numeric")]
        public decimal Latitude { get; set; }

        [Column(TypeName = "numeric")]
        public decimal Longitude { get; set; }

        public string scientificName { get; set; }

        public string scientificName1 { get; set; }

        public string acceptedNameUsage { get; set; }

        public string kingdom { get; set; }

        public string phylum { get; set; }

        [Column("class")]
        public string _class { get; set; }

        public string order { get; set; }

        public string family { get; set; }

        public string genus { get; set; }

        public string taxonRank { get; set; }

        public string vernacularName { get; set; }

        public string species { get; set; }

        public string measurementID { get; set; }

        public string Status { get; set; }

        public string CatFood { get; set; }

    }
}
