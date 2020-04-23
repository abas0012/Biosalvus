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

}