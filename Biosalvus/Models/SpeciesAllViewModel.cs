using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Biosalvus.Models
{
    public class SpeciesAllViewModel
    {
       public IEnumerable<SpeciesCountGroupedStatus> speciescountbystatus { get; set; }
       public IEnumerable<SpeciesCountGroupedStateStatus> speciescountbystatestatus { get; set; }
       public IEnumerable<SpeciesCountVulnerable> speciescountvulnerable { get; set; }
       public IEnumerable<SpeciesCountExtinct> speciescountextinct { get; set; }
       public IEnumerable<SpeciesCountConservationDependent> speciescountconservation { get; set; }
       public IEnumerable<SpeciesCountCriticallyEndangered> speciescountcritendangered { get; set; }
       public IEnumerable<SpeciesCountEndangered> speciescountendangered { get; set; }
       public IEnumerable<SpeciesCountExtinctInWild> speciescountextinctinwild{ get; set; }
    }

    public class SpeciesCountGroupedStatus
    {
        public int TotalCount { get; set; }
        public string Status { get; set; }
    }

    public class SpeciesCountGroupedStateStatus
    {
        public int TotalCount { get; set; }
        public string StateCode { get; set; }
        public string Status { get; set; }
    }

    public class SpeciesCountVulnerable
    {
        public int TotalCount { get; set; }
        public string StateCode { get; set; }
        public string Status { get; set; }
    }
    public class SpeciesCountExtinct
    {
        public int TotalCount { get; set; }
        public string StateCode { get; set; }
        public string Status { get; set; }
    }
    public class SpeciesCountConservationDependent
    {
        public int TotalCount { get; set; }
        public string StateCode { get; set; }
        public string Status { get; set; }
    }
    public class SpeciesCountCriticallyEndangered
    {
        public int TotalCount { get; set; }
        public string StateCode { get; set; }
        public string Status { get; set; }
    }
    public class SpeciesCountEndangered
    {
        public int TotalCount { get; set; }
        public string StateCode { get; set; }
        public string Status { get; set; }
    }
    public class SpeciesCountExtinctInWild
    {
        public int TotalCount { get; set; }
        public string StateCode { get; set; }
        public string Status { get; set; }
    }
}