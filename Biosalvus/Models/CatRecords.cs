namespace Biosalvus.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class CatRecords : DbContext
    {
        public CatRecords()
            : base("name=CatsRecord")
        {
        }

        public virtual DbSet<CatRecord> CatRecordsdb { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CatRecord>()
                .Property(e => e.Latitude)
                .HasPrecision(10, 8);

            modelBuilder.Entity<CatRecord>()
                .Property(e => e.Longitude)
                .HasPrecision(11, 8);
        }

        public System.Data.Entity.DbSet<Biosalvus.Models.AvesEndangered> AvesEndangereds { get; set; }

        public System.Data.Entity.DbSet<Biosalvus.Models.SpeciesAustralia> SpeciesAustralias { get; set; }

        public System.Data.Entity.DbSet<Biosalvus.Models.FireData> FireDatas { get; set; }
    }
}
