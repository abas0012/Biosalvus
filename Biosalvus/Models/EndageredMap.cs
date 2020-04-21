using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Biosalvus.Models
{
    public class EndageredMap
    {
        public IEnumerable<AvesEndangered> aveslist { get; set; }
        public IEnumerable<CatRecord> catslist { get; set; }
    }
}