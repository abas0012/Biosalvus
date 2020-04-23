using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Biosalvus.Models
{
    public class EndageredMapViewModel
    {
        public IEnumerable<AvesSummary> aveslist { get; set; }
        public IEnumerable<CatsSummary> catslist { get; set; }
    }

    public class CatsSummary
    {
        public string catname { get; set; }
        public decimal catlongitude { get; set; }
        public decimal catlatitude { get; set; }
        public string catstate { get; set; }
        public int? catindividualcount { get; set; }
    }

    public class AvesSummary
    {
        public string avesname { get; set; }
        public decimal aveslongitude { get; set; }
        public decimal aveslatitude { get; set; }
        public string avesstatus { get; set; }
        public string avesstate { get; set; }
        public string catfood { get; set; }
   }
}