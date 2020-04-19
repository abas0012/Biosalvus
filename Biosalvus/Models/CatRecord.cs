namespace Biosalvus.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class CatRecord
    {
        public int ID { get; set; }

        public string ScientificName { get; set; }

        public string TaxonRank { get; set; }

        public string VernacularName { get; set; }

        public string Kingdom { get; set; }

        public string Phylum { get; set; }

        public string Class { get; set; }

        public string Order { get; set; }

        public string Family { get; set; }

        public string Genus { get; set; }

        public string Species { get; set; }

        public string Subspecies { get; set; }

        [Column(TypeName = "numeric")]
        public decimal Latitude { get; set; }

        [Column(TypeName = "numeric")]
        public decimal Longitude { get; set; }

        [StringLength(255)]
        public string CoordinatePrecision { get; set; }

        public double? CoordinateUncertaintyInMetres { get; set; }

        public string Country { get; set; }

        public string State { get; set; }

        public string LocalGovernmentAreas2011 { get; set; }

        public string IMCRA4Regions { get; set; }

        public string IBRA7Regions { get; set; }

        public string MinimumElevationInMeters { get; set; }

        public string MaximumElevationInMeters { get; set; }

        public string MinimumDepthInMeters { get; set; }

        public string MaximumDepthInMeters { get; set; }

        public int? IndividualCount { get; set; }

        public string Collector { get; set; }

        public int? Year { get; set; }

        public int? Month { get; set; }

        public int? Day { get; set; }

        public DateTime? EventDate { get; set; }

        [StringLength(255)]
        public string BasisOfRecord { get; set; }

        [Column("Occurrence status")]
        [StringLength(255)]
        public string Occurrence_status { get; set; }

        [StringLength(255)]
        public string Sex { get; set; }
    }
}
