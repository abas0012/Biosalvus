namespace Biosalvus.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("SpeciesAustralia")]
    public partial class SpeciesAustralia
    {
        public int Id { get; set; }

        [Column("Scientific Name")]
        public string Scientific_Name { get; set; }

        [Column("Common Name")]
        public string Common_Name { get; set; }

        [Column("Threatened status")]
        public string Threatened_status { get; set; }

        public string Kingdom { get; set; }

        public string Phylum { get; set; }

        public string Class { get; set; }

        public string Family { get; set; }

        public string Genus { get; set; }

        public string Species { get; set; }

        public string Grouping { get; set; }

        [Column("Present ")]
        public string Present_ { get; set; }

        public string StateCode { get; set; }

        public string Country { get; set; }

        public string StateCountry { get; set; }

        [Column("State Name")]
        public string State_Name { get; set; }
    }
}
