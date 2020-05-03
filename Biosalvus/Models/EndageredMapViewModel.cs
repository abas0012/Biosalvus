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
        public IEnumerable<DistinctBird> distinctvulnerableBirds{ get; set; }
        public IEnumerable<DistinctBird> distinctendangeredBirds { get; set; }
        public IEnumerable<DistinctBird> distinctcritendangeredBirds { get; set; }
        public IEnumerable<BirdPoint> endangeredbirds { get; set; }
        public IEnumerable<BirdPoint> critendangeredbirds { get; set; }
        public IEnumerable<BirdPoint> vulnerablebirds { get; set; }
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

    public class DistinctBird
    {
        public string speciesname { get; set; }
        public string status { get; set; }
        public string specieskingdom { get; set; }
        public string speciesphylum { get; set; }
        public string speciesclass { get; set; }
        public string speciesorder { get; set; }
        public string speciesfamily { get; set; }
        public string speciesgenus { get; set; }

    }

    public class BirdPoint
    {
        public string birdname { get; set; }
        public string scientificname { get; set; }
        public decimal birdlongitude { get; set; }
        public decimal birdlatitude { get; set; }
        public string status { get; set; }
        public string state { get; set; }
        public string catfood { get; set; }
    }

}