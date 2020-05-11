using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Biosalvus.Models;

namespace Biosalvus.Controllers
{
    public class AvesEndangeredsController : Controller
    {
        private CatRecords db = new CatRecords();

        // GET: AvesEndangereds
        //public ActionResult Index()
        //{
        //    return View(db.AvesEndangereds.ToList());
        //}

        public ActionResult AvesThreatenedMap()
        {
            string state = "Victoria";
            string criticallyendangered = "Critically Endangered";
            string endangered = "Endangered";
            string vulnerable = "Vulnerable";
            string catfood = "Y";
            

            EndageredMapViewModel viewmodel = new EndageredMapViewModel();
            viewmodel.catslist = (from r in db.CatRecordsdb
                                  where r.State == state
                                  select new CatsSummary
                                  {
                                      catname = r.VernacularName,
                                      catlatitude = r.Latitude,
                                      catlongitude = r.Longitude,
                                      catstate = r.State,
                                      catindividualcount = r.IndividualCount                                
                                  });

            viewmodel.distinctvulnerableBirds = (from r in db.AvesEndangereds
                                                 where (r.Status == vulnerable && r.vernacularName != null)
                                                 select new DistinctBird
                                              {
                                                     ID = r.ID,
                                                     speciesname = r.vernacularName,
                                                     status = r.Status,
                                                     specieskingdom = r.kingdom,
                                                     speciesphylum = r.phylum,
                                                     speciesclass = r._class,
                                                     speciesorder = r.order,
                                                     speciesfamily = r.order,
                                                     speciesgenus = r.genus

                                              }).DistinctBy(x => x.speciesname);
            viewmodel.distinctendangeredBirds = (from r in db.AvesEndangereds
                                                 where (r.Status == endangered && r.vernacularName != null)
                                                 select new DistinctBird
                                                 {
                                                     ID = r.ID,
                                                     speciesname = r.vernacularName,
                                                     status = r.Status,
                                                     specieskingdom = r.kingdom,
                                                     speciesphylum = r.phylum,
                                                     speciesclass = r._class,
                                                     speciesorder = r.order,
                                                     speciesfamily = r.order,
                                                     speciesgenus = r.genus

                                                 }).DistinctBy(x => x.speciesname);
            viewmodel.distinctcritendangeredBirds = (from r in db.AvesEndangereds
                                                     where (r.Status == criticallyendangered && r.vernacularName != null)
                                                 select new DistinctBird
                                                 {
                                                     ID = r.ID,
                                                     speciesname = r.vernacularName,
                                                     status = r.Status,
                                                     specieskingdom = r.kingdom,
                                                     speciesphylum = r.phylum,
                                                     speciesclass = r._class,
                                                     speciesorder = r.order,
                                                     speciesfamily = r.order,
                                                     speciesgenus = r.genus

                                                 }).DistinctBy(x => x.speciesname);
            viewmodel.vulnerablebirds = (from r in db.AvesEndangereds
                                         where (r.Status == vulnerable && r.CatFood == catfood)
                                         select new BirdPoint
                                         {
                                             birdname = r.vernacularName,
                                             scientificname = r.species,
                                             birdlongitude = r.Longitude,
                                             birdlatitude = r.Latitude,
                                             state = r.stateProvince,
                                             status = r.Status,
                                             catfood = r.CatFood
                                         });
            viewmodel.endangeredbirds = (from r in db.AvesEndangereds
                                         where (r.Status == endangered && r.CatFood == catfood)
                                         select new BirdPoint
                                         {
                                             birdname = r.vernacularName,
                                             scientificname = r.species,
                                             birdlongitude = r.Longitude,
                                             birdlatitude = r.Latitude,
                                             state = r.stateProvince,
                                             status = r.Status,
                                             catfood = r.CatFood
                                         });
            viewmodel.critendangeredbirds = (from r in db.AvesEndangereds
                                         where (r.Status == criticallyendangered && r.CatFood == catfood)
                                         select new BirdPoint
                                         {
                                             birdname = r.vernacularName,
                                             scientificname = r.species,
                                             birdlongitude = r.Longitude,
                                             birdlatitude = r.Latitude,
                                             state = r.stateProvince,
                                             status = r.Status,
                                             catfood = r.CatFood
                                         });

            
            //Brown Thornbill
            viewmodel.brownThornbillRankings = (from r in db.AvesEndangereds
                                            where r.vernacularName == "Brown Thornbill"
                                            group r by new { r.vernacularName, r.verbatimLocality } into groupedByObject
                                            select new BirdThreatRanking
                                            {
                                                birdcount = groupedByObject.Count(x => x.vernacularName != null),
                                                speciesname = groupedByObject.Key.vernacularName,
                                                locality = groupedByObject.Key.verbatimLocality
                                            }
                                            ).OrderByDescending(x => x.birdcount)
                                            .ThenByDescending(x => x.speciesname);
            //Emu
            viewmodel.emuRankings = (from r in db.AvesEndangereds
                                            where r.vernacularName == "Emu"
                                            group r by new { r.vernacularName, r.verbatimLocality } into groupedByObject
                                            select new BirdThreatRanking
                                            {
                                                birdcount = groupedByObject.Count(x => x.vernacularName != null),
                                                speciesname = groupedByObject.Key.vernacularName,
                                                locality = groupedByObject.Key.verbatimLocality
                                            }
                                            ).OrderByDescending(x => x.birdcount)
                                            .ThenByDescending(x => x.speciesname);
            var catranks = from r in db.CatRecordsdb
                            group r by r.LocalGovernmentAreas2011 into g
                            select new
                            {
                                city = g.Key,
                                rate = (g.Count() / 11.60)
                            };
            var birdranks = from r in db.AvesEndangereds
                            group r by new { r.vernacularName, r.verbatimLocality, r.Status } into g
                            select new
                            {
                                name = g.Key.vernacularName,
                                city = g.Key.verbatimLocality,
                                status = g.Key.Status,
                                count = g.Count()
                            };
            //BIRDCATRANK
            //Eastern Bristlebird
            viewmodel.easternBristlebirdRankings = (from b in birdranks
                                                where b.name == "Eastern Bristlebird"
                                                    join c in catranks on b.city equals c.city into birdcatrank
                                                from c in birdcatrank
                                                select new BirdThreatRanking
                                                {
                                                    birdcount = b.count,
                                                    threatrate = c.rate,
                                                    speciesname = b.name,
                                                    status = b.status,
                                                    locality = b.city
                                                }).OrderByDescending(x => x.birdcount);
            //Eastern Ground Parrot
            viewmodel.easternGroundParrotRankings = (from b in birdranks
                                                    where b.name == "Eastern Ground Parrot"
                                                     join c in catranks on b.city equals c.city into birdcatrank
                                                    from c in birdcatrank
                                                    select new BirdThreatRanking
                                                    {
                                                        birdcount = b.count,
                                                        threatrate = c.rate,
                                                        speciesname = b.name,
                                                        status = b.status,
                                                        locality = b.city
                                                    }).OrderByDescending(x => x.birdcount);
            //Helmeted Honeyeater
            viewmodel.helmetedHoneyeaterRankings = (from b in birdranks
                                                     where b.name == "Helmeted Honeyeater"
                                                    join c in catranks on b.city equals c.city into birdcatrank
                                                     from c in birdcatrank
                                                     select new BirdThreatRanking
                                                     {
                                                         birdcount = b.count,
                                                         threatrate = c.rate,
                                                         speciesname = b.name,
                                                         status = b.status,
                                                         locality = b.city
                                                     }).OrderByDescending(x => x.birdcount);
            //Hooded Robin
            viewmodel.hoodedRobinRankings = (from b in birdranks
                                                    where b.name == "Hooded Robin"
                                             join c in catranks on b.city equals c.city into birdcatrank
                                                    from c in birdcatrank
                                                    select new BirdThreatRanking
                                                    {
                                                        birdcount = b.count,
                                                        threatrate = c.rate,
                                                        speciesname = b.name,
                                                        status = b.status,
                                                        locality = b.city
                                                    }).OrderByDescending(x => x.birdcount);
            //Orange - bellied Parrot
            viewmodel.orangeBelliedParrotRankings = (from b in birdranks
                                             where b.name == "Orange - bellied Parrot"
                                                     join c in catranks on b.city equals c.city into birdcatrank
                                             from c in birdcatrank
                                             select new BirdThreatRanking
                                             {
                                                 birdcount = b.count,
                                                 threatrate = c.rate,
                                                 speciesname = b.name,
                                                 status = b.status,
                                                 locality = b.city
                                             }).OrderByDescending(x => x.birdcount);
            //Southern Emu - wren
            viewmodel.southernEmuWrenRankings = (from b in birdranks
                                                     where b.name == "Southern Emu - wren"
                                                 join c in catranks on b.city equals c.city into birdcatrank
                                                     from c in birdcatrank
                                                     select new BirdThreatRanking
                                                     {
                                                         birdcount = b.count,
                                                         threatrate = c.rate,
                                                         speciesname = b.name,
                                                         status = b.status,
                                                         locality = b.city
                                                     }).OrderByDescending(x => x.birdcount);
            //southern giant-petrel
            viewmodel.southernGiantPetrelRankings = (from b in birdranks
                                                 where b.name == "southern giant-petrel"
                                                     join c in catranks on b.city equals c.city into birdcatrank
                                                 from c in birdcatrank
                                                 select new BirdThreatRanking
                                                 {
                                                     birdcount = b.count,
                                                     threatrate = c.rate,
                                                     speciesname = b.name,
                                                     status = b.status,
                                                     locality = b.city
                                                 }).OrderByDescending(x => x.birdcount);
            //Spotted Quail-thrush
            viewmodel.spottedQuailRankings = (from b in birdranks
                                                     where b.name == "Spotted Quail-thrush"
                                              join c in catranks on b.city equals c.city into birdcatrank
                                                     from c in birdcatrank
                                                     select new BirdThreatRanking
                                                     {
                                                         birdcount = b.count,
                                                         threatrate = c.rate,
                                                         speciesname = b.name,
                                                         status = b.status,
                                                         locality = b.city
                                                     }).OrderByDescending(x => x.birdcount);
            //Swift Parrot
            viewmodel.swiftParrotRankings = (from b in birdranks
                                              where b.name == "Swift Parrot"
                                             join c in catranks on b.city equals c.city into birdcatrank
                                              from c in birdcatrank
                                              select new BirdThreatRanking
                                              {
                                                  birdcount = b.count,
                                                  threatrate = c.rate,
                                                  speciesname = b.name,
                                                  status = b.status,
                                                  locality = b.city
                                              }).OrderByDescending(x => x.birdcount);
            //Yellow - tufted Honeyeater
            viewmodel.yellowTuftedHoneyEaterRankings = (from b in birdranks
                                             where b.name == "Yellow - tufted Honeyeater"
                                                        join c in catranks on b.city equals c.city into birdcatrank
                                             from c in birdcatrank
                                             select new BirdThreatRanking
                                             {
                                                 birdcount = b.count,
                                                 threatrate = c.rate,
                                                 speciesname = b.name,
                                                 status = b.status,
                                                 locality = b.city
                                             }).OrderByDescending(x => x.birdcount);

            //Brown Thornbill
            viewmodel.brownThornbillRankings = (from b in birdranks
                                                where b.name == "Brown Thornbill"
                                                join c in catranks on b.city equals c.city into birdcatrank
                                                from c in birdcatrank
                                                select new BirdThreatRanking
                                                {
                                                    birdcount = b.count,
                                                    threatrate = c.rate,
                                                    speciesname = b.name,
                                                    status = b.status,
                                                    locality = b.city
                                                }).OrderByDescending(x => x.birdcount);
            return View(viewmodel);
        }


        public ActionResult AvesBushfire()
        {
            string state = "Victoria";
            string criticallyendangered = "Critically Endangered";
            string endangered = "Endangered";
            string vulnerable = "Vulnerable";
            string vic = "VIC";
            EndageredMapViewModel viewmodel = new EndageredMapViewModel();
            var fireranks = from r in db.FireDatas
                            group r by r.city into g
                            select new
                            {
                                city = g.Key,
                                rate = (g.Count() / 388.59)
                            };
            var birdranks = from r in db.AvesEndangereds
                            group r by new { r.vernacularName, r.verbatimLocality, r.Status } into g
                            select new
                            {
                                name = g.Key.vernacularName,
                                city = g.Key.verbatimLocality,
                                status = g.Key.Status,
                                count = g.Count()
                            };
            viewmodel.distinctvulnerableBirds = (from r in db.AvesEndangereds
                                                 where (r.Status == vulnerable && r.vernacularName != null)
                                                 select new DistinctBird
                                                 {
                                                     ID = r.ID,
                                                     speciesname = r.vernacularName,
                                                     status = r.Status,
                                                     specieskingdom = r.kingdom,
                                                     speciesphylum = r.phylum,
                                                     speciesclass = r._class,
                                                     speciesorder = r.order,
                                                     speciesfamily = r.order,
                                                     speciesgenus = r.genus

                                                 }).DistinctBy(x => x.speciesname);
            viewmodel.distinctendangeredBirds = (from r in db.AvesEndangereds
                                                 where (r.Status == endangered && r.vernacularName != null)
                                                 select new DistinctBird
                                                 {
                                                     ID = r.ID,
                                                     speciesname = r.vernacularName,
                                                     status = r.Status,
                                                     specieskingdom = r.kingdom,
                                                     speciesphylum = r.phylum,
                                                     speciesclass = r._class,
                                                     speciesorder = r.order,
                                                     speciesfamily = r.order,
                                                     speciesgenus = r.genus

                                                 }).DistinctBy(x => x.speciesname);
            viewmodel.distinctcritendangeredBirds = (from r in db.AvesEndangereds
                                                     where (r.Status == criticallyendangered && r.vernacularName != null)
                                                     select new DistinctBird
                                                     {
                                                         ID = r.ID,
                                                         speciesname = r.vernacularName,
                                                         status = r.Status,
                                                         specieskingdom = r.kingdom,
                                                         speciesphylum = r.phylum,
                                                         speciesclass = r._class,
                                                         speciesorder = r.order,
                                                         speciesfamily = r.order,
                                                         speciesgenus = r.genus

                                                     }).DistinctBy(x => x.speciesname);
            viewmodel.vulnerablebirds = (from r in db.AvesEndangereds
                                         where r.Status == vulnerable
                                         select new BirdPoint
                                         {
                                             birdname = r.vernacularName,
                                             scientificname = r.species,
                                             birdlongitude = r.Longitude,
                                             birdlatitude = r.Latitude,
                                             state = r.stateProvince,
                                             status = r.Status,
                                             catfood = r.CatFood
                                         });
            viewmodel.endangeredbirds = (from r in db.AvesEndangereds
                                         where r.Status == endangered
                                         select new BirdPoint
                                         {
                                             birdname = r.vernacularName,
                                             scientificname = r.species,
                                             birdlongitude = r.Longitude,
                                             birdlatitude = r.Latitude,
                                             state = r.stateProvince,
                                             status = r.Status,
                                             catfood = r.CatFood
                                         });
            viewmodel.critendangeredbirds = (from r in db.AvesEndangereds
                                             where r.Status == criticallyendangered
                                             select new BirdPoint
                                             {
                                                 birdname = r.vernacularName,
                                                 scientificname = r.species,
                                                 birdlongitude = r.Longitude,
                                                 birdlatitude = r.Latitude,
                                                 state = r.stateProvince,
                                                 status = r.Status,
                                                 catfood = r.CatFood
                                             });
            viewmodel.firelist = (from r in db.FireDatas
                                  select new FireRecords
                                  {
                                      firelatitude = r.latitude,
                                      firelongitude = r.longitude,
                                      city = r.city,
                                      acq_date = r.acq_date
                                  }
                                  );
            viewmodel.fireRanks = (from r in db.FireDatas
                                   where r.state == vic
                                   group r by new { r.city, r.state } into groupedByObject
                                   select new FireRanks
                                   {
                                       firecount = groupedByObject.Count(x => x.city != null),
                                       city = groupedByObject.Key.city,
                                       state = groupedByObject.Key.state
                                   }).OrderByDescending(x => x.firecount);

            //BIRD FIRE RANK
            //Australasian Bittern
            viewmodel.australasionBitternRankings = (from b in birdranks
                                                where b.name == "Australasian Bittern"
                                                     join f in fireranks on b.city equals f.city into birdfirerank
                                                from f in birdfirerank
                                                select new BirdThreatRanking
                                                {
                                                    birdcount = b.count,
                                                    threatrate = f.rate,
                                                    speciesname = b.name,
                                                    status = b.status,
                                                    locality = b.city
                                                }).OrderByDescending(x => x.birdcount);
            //Australian Painted Snipe
            viewmodel.australianPaintedSnipeRankings = (from b in birdranks
                                                     where b.name == "Australian Painted Snipe"
                                                        join f in fireranks on b.city equals f.city into birdfirerank
                                                     from f in birdfirerank
                                                     select new BirdThreatRanking
                                                     {
                                                         birdcount = b.count,
                                                         threatrate = f.rate,
                                                         speciesname = b.name,
                                                         status = b.status,
                                                         locality = b.city
                                                     }).OrderByDescending(x => x.birdcount);
            //Azure Kingfisher
            viewmodel.azureKingfisherRankings = (from b in birdranks
                                                        where b.name == "Azure Kingfisher"
                                                 join f in fireranks on b.city equals f.city into birdfirerank
                                                        from f in birdfirerank
                                                        select new BirdThreatRanking
                                                        {
                                                            birdcount = b.count,
                                                            threatrate = f.rate,
                                                            speciesname = b.name,
                                                            status = b.status,
                                                            locality = b.city
                                                        }).OrderByDescending(x => x.birdcount);
            //Bar - tailed Godwit
            viewmodel.barTailedGodwitRankings = (from b in birdranks
                                                 where b.name == "Bar - tailed Godwit"
                                                 join f in fireranks on b.city equals f.city into birdfirerank
                                                 from f in birdfirerank
                                                 select new BirdThreatRanking
                                                 {
                                                     birdcount = b.count,
                                                     threatrate = f.rate,
                                                     speciesname = b.name,
                                                     status = b.status,
                                                     locality = b.city
                                                 }).OrderByDescending(x => x.birdcount);
            //Bassian Thrush
            viewmodel.bassianThrushRankings = (from b in birdranks
                                                 where b.name == "Bassian Thrush"
                                               join f in fireranks on b.city equals f.city into birdfirerank
                                                 from f in birdfirerank
                                                 select new BirdThreatRanking
                                                 {
                                                     birdcount = b.count,
                                                     threatrate = f.rate,
                                                     speciesname = b.name,
                                                     status = b.status,
                                                     locality = b.city
                                                 }).OrderByDescending(x => x.birdcount);
            //Black - browed Albatross
            viewmodel.blackBrowedAlbatrossRankings = (from b in birdranks
                                               where b.name == "Black - browed Albatross"
                                                      join f in fireranks on b.city equals f.city into birdfirerank
                                               from f in birdfirerank
                                               select new BirdThreatRanking
                                               {
                                                   birdcount = b.count,
                                                   threatrate = f.rate,
                                                   speciesname = b.name,
                                                   status = b.status,
                                                   locality = b.city
                                               }).OrderByDescending(x => x.birdcount);
            //Black - eared Miner
            viewmodel.blackEaredMinerRankings = (from b in birdranks
                                                      where b.name == "Black - eared Miner"
                                                 join f in fireranks on b.city equals f.city into birdfirerank
                                                      from f in birdfirerank
                                                      select new BirdThreatRanking
                                                      {
                                                          birdcount = b.count,
                                                          threatrate = f.rate,
                                                          speciesname = b.name,
                                                          status = b.status,
                                                          locality = b.city
                                                      }).OrderByDescending(x => x.birdcount);
            //Blue Petrel
            viewmodel.bluePetrelRankings = (from b in birdranks
                                                 where b.name == "Blue Petrel"
                                                 join f in fireranks on b.city equals f.city into birdfirerank
                                                 from f in birdfirerank
                                                 select new BirdThreatRanking
                                                 {
                                                     birdcount = b.count,
                                                     threatrate = f.rate,
                                                     speciesname = b.name,
                                                     status = b.status,
                                                     locality = b.city
                                                 }).OrderByDescending(x => x.birdcount);
            //Brown Thornbill
            viewmodel.brownThornbillRankings = (from b in birdranks
                                                where b.name == "Brown Thornbill"
                                                join f in fireranks on b.city equals f.city into birdfirerank
                                                from f in birdfirerank
                                                select new BirdThreatRanking
                                                {
                                                    birdcount = b.count,
                                                    threatrate = f.rate,
                                                    speciesname = b.name,
                                                    status = b.status,
                                                    locality = b.city
                                                }).OrderByDescending(x => x.birdcount);
            //Cape Barren goose
            viewmodel.bluePetrelRankings = (from b in birdranks
                                            where b.name == "Blue Petrel"
                                            join f in fireranks on b.city equals f.city into birdfirerank
                                            from f in birdfirerank
                                            select new BirdThreatRanking
                                            {
                                                birdcount = b.count,
                                                threatrate = f.rate,
                                                speciesname = b.name,
                                                status = b.status,
                                                locality = b.city
                                            }).OrderByDescending(x => x.birdcount);
            //Crested Shrike-tit
            viewmodel.crestedShriketitRankings = (from b in birdranks
                                            where b.name == "Crested Shrike-tit"
                                                  join f in fireranks on b.city equals f.city into birdfirerank
                                            from f in birdfirerank
                                            select new BirdThreatRanking
                                            {
                                                birdcount = b.count,
                                                threatrate = f.rate,
                                                speciesname = b.name,
                                                status = b.status,
                                                locality = b.city
                                            }).OrderByDescending(x => x.birdcount);
            //Curlew Sandpiper
            viewmodel.curlewSandpiperRankings = (from b in birdranks
                                                  where b.name == "Curlew Sandpiper"
                                                 join f in fireranks on b.city equals f.city into birdfirerank
                                                  from f in birdfirerank
                                                  select new BirdThreatRanking
                                                  {
                                                      birdcount = b.count,
                                                      threatrate = f.rate,
                                                      speciesname = b.name,
                                                      status = b.status,
                                                      locality = b.city
                                                  }).OrderByDescending(x => x.birdcount);
            //Eastern Bristlebird
            viewmodel.easternBristlebirdRankings = (from b in birdranks
                                                 where b.name == "Eastern Bristlebird"
                                                    join f in fireranks on b.city equals f.city into birdfirerank
                                                 from f in birdfirerank
                                                 select new BirdThreatRanking
                                                 {
                                                     birdcount = b.count,
                                                     threatrate = f.rate,
                                                     speciesname = b.name,
                                                     status = b.status,
                                                     locality = b.city
                                                 }).OrderByDescending(x => x.birdcount);
            //Eastern curlew
            viewmodel.easternCurlewRankings = (from b in birdranks
                                                    where b.name == "Eastern curlew"
                                               join f in fireranks on b.city equals f.city into birdfirerank
                                                    from f in birdfirerank
                                                    select new BirdThreatRanking
                                                    {
                                                        birdcount = b.count,
                                                        threatrate = f.rate,
                                                        speciesname = b.name,
                                                        status = b.status,
                                                        locality = b.city
                                                    }).OrderByDescending(x => x.birdcount);
            //Eastern Ground Parrot
            viewmodel.easternGroundParrotRankings = (from b in birdranks
                                               where b.name == "Eastern Ground Parrot"
                                                     join f in fireranks on b.city equals f.city into birdfirerank
                                               from f in birdfirerank
                                               select new BirdThreatRanking
                                               {
                                                   birdcount = b.count,
                                                   threatrate = f.rate,
                                                   speciesname = b.name,
                                                   status = b.status,
                                                   locality = b.city
                                               }).OrderByDescending(x => x.birdcount);
            //Eastern Shrike - tit
            viewmodel.easternShriketitRankings = (from b in birdranks
                                                     where b.name == "Eastern Shrike - tit"
                                                  join f in fireranks on b.city equals f.city into birdfirerank
                                                     from f in birdfirerank
                                                     select new BirdThreatRanking
                                                     {
                                                         birdcount = b.count,
                                                         threatrate = f.rate,
                                                         speciesname = b.name,
                                                         status = b.status,
                                                         locality = b.city
                                                     }).OrderByDescending(x => x.birdcount);
            //Fairy Tern
            viewmodel.fairyTernRankings = (from b in birdranks
                                                  where b.name == "Fairy Tern"
                                           join f in fireranks on b.city equals f.city into birdfirerank
                                                  from f in birdfirerank
                                                  select new BirdThreatRanking
                                                  {
                                                      birdcount = b.count,
                                                      threatrate = f.rate,
                                                      speciesname = b.name,
                                                      status = b.status,
                                                      locality = b.city
                                                  }).OrderByDescending(x => x.birdcount);
            //Glossy Black-cockatoo
            viewmodel.glossyBlackCockatooRankings = (from b in birdranks
                                           where b.name == "Glossy Black-cockatoo"
                                                     join f in fireranks on b.city equals f.city into birdfirerank
                                           from f in birdfirerank
                                           select new BirdThreatRanking
                                           {
                                               birdcount = b.count,
                                               threatrate = f.rate,
                                               speciesname = b.name,
                                               status = b.status,
                                               locality = b.city
                                           }).OrderByDescending(x => x.birdcount);
            //Golden Whistler
            viewmodel.glossyBlackCockatooRankings = (from b in birdranks
                                                     where b.name == "Glossy Black-cockatoo"
                                                     join f in fireranks on b.city equals f.city into birdfirerank
                                                     from f in birdfirerank
                                                     select new BirdThreatRanking
                                                     {
                                                         birdcount = b.count,
                                                         threatrate = f.rate,
                                                         speciesname = b.name,
                                                         status = b.status,
                                                         locality = b.city
                                                     }).OrderByDescending(x => x.birdcount);
            //Great Knot
            viewmodel.greatKnotRankings = (from b in birdranks
                                                     where b.name == "Great Knot"
                                           join f in fireranks on b.city equals f.city into birdfirerank
                                                     from f in birdfirerank
                                                     select new BirdThreatRanking
                                                     {
                                                         birdcount = b.count,
                                                         threatrate = f.rate,
                                                         speciesname = b.name,
                                                         status = b.status,
                                                         locality = b.city
                                                     }).OrderByDescending(x => x.birdcount);
            //Green Rosella
            viewmodel.greenRosellaRankings = (from b in birdranks
                                           where b.name == "Green Rosella"
                                              join f in fireranks on b.city equals f.city into birdfirerank
                                           from f in birdfirerank
                                           select new BirdThreatRanking
                                           {
                                               birdcount = b.count,
                                               threatrate = f.rate,
                                               speciesname = b.name,
                                               status = b.status,
                                               locality = b.city
                                           }).OrderByDescending(x => x.birdcount);
            //Helmeted Honeyeater
            viewmodel.helmetedHoneyeaterRankings = (from b in birdranks
                                              where b.name == "Helmeted Honeyeater"
                                                    join f in fireranks on b.city equals f.city into birdfirerank
                                              from f in birdfirerank
                                              select new BirdThreatRanking
                                              {
                                                  birdcount = b.count,
                                                  threatrate = f.rate,
                                                  speciesname = b.name,
                                                  status = b.status,
                                                  locality = b.city
                                              }).OrderByDescending(x => x.birdcount);
            //Hooded Robin
            viewmodel.hoodedRobinRankings = (from b in birdranks
                                                    where b.name == "Hooded Robin"
                                             join f in fireranks on b.city equals f.city into birdfirerank
                                                    from f in birdfirerank
                                                    select new BirdThreatRanking
                                                    {
                                                        birdcount = b.count,
                                                        threatrate = f.rate,
                                                        speciesname = b.name,
                                                        status = b.status,
                                                        locality = b.city
                                                    }).OrderByDescending(x => x.birdcount);
            //Horsfield's Bushlark
            viewmodel.horsfieldBushlarkRankings = (from b in birdranks
                                             where b.name == "Horsfield's Bushlark"
                                                   join f in fireranks on b.city equals f.city into birdfirerank
                                             from f in birdfirerank
                                             select new BirdThreatRanking
                                             {
                                                 birdcount = b.count,
                                                 threatrate = f.rate,
                                                 speciesname = b.name,
                                                 status = b.status,
                                                 locality = b.city
                                             }).OrderByDescending(x => x.birdcount);
            //Huahou
            viewmodel.huahouRankings = (from b in birdranks
                                                   where b.name == "Huahou"
                                        join f in fireranks on b.city equals f.city into birdfirerank
                                                   from f in birdfirerank
                                                   select new BirdThreatRanking
                                                   {
                                                       birdcount = b.count,
                                                       threatrate = f.rate,
                                                       speciesname = b.name,
                                                       status = b.status,
                                                       locality = b.city
                                                   }).OrderByDescending(x => x.birdcount);
            //Mallee Emu - wren
            viewmodel.malleeEmuWrenRankings = (from b in birdranks
                                        where b.name == "Mallee Emu - wren"
                                               join f in fireranks on b.city equals f.city into birdfirerank
                                        from f in birdfirerank
                                        select new BirdThreatRanking
                                        {
                                            birdcount = b.count,
                                            threatrate = f.rate,
                                            speciesname = b.name,
                                            status = b.status,
                                            locality = b.city
                                        }).OrderByDescending(x => x.birdcount);
            //Malleefowl
            viewmodel.malleefowlRankings = (from b in birdranks
                                               where b.name == "Malleefowl"
                                            join f in fireranks on b.city equals f.city into birdfirerank
                                               from f in birdfirerank
                                               select new BirdThreatRanking
                                               {
                                                   birdcount = b.count,
                                                   threatrate = f.rate,
                                                   speciesname = b.name,
                                                   status = b.status,
                                                   locality = b.city
                                               }).OrderByDescending(x => x.birdcount);
            //Masked Owl
            viewmodel.malleefowlRankings = (from b in birdranks
                                            where b.name == "Malleefowl"
                                            join f in fireranks on b.city equals f.city into birdfirerank
                                            from f in birdfirerank
                                            select new BirdThreatRanking
                                            {
                                                birdcount = b.count,
                                                threatrate = f.rate,
                                                speciesname = b.name,
                                                status = b.status,
                                                locality = b.city
                                            }).OrderByDescending(x => x.birdcount);
            //Northern giant petrel
            viewmodel.northenGiantPetrelRankings = (from b in birdranks
                                            where b.name == "Northern giant petrel"
                                                    join f in fireranks on b.city equals f.city into birdfirerank
                                            from f in birdfirerank
                                            select new BirdThreatRanking
                                            {
                                                birdcount = b.count,
                                                threatrate = f.rate,
                                                speciesname = b.name,
                                                status = b.status,
                                                locality = b.city
                                            }).OrderByDescending(x => x.birdcount);
            //Orange - bellied Parrot
            viewmodel.orangeBelliedParrotRankings = (from b in birdranks
                                                    where b.name == "Orange - bellied Parrot"
                                                     join f in fireranks on b.city equals f.city into birdfirerank
                                                    from f in birdfirerank
                                                    select new BirdThreatRanking
                                                    {
                                                        birdcount = b.count,
                                                        threatrate = f.rate,
                                                        speciesname = b.name,
                                                        status = b.status,
                                                        locality = b.city
                                                    }).OrderByDescending(x => x.birdcount);
            //Pied Currawong
            viewmodel.piedCurrawongRankings = (from b in birdranks
                                                     where b.name == "Pied Currawong"
                                               join f in fireranks on b.city equals f.city into birdfirerank
                                                     from f in birdfirerank
                                                     select new BirdThreatRanking
                                                     {
                                                         birdcount = b.count,
                                                         threatrate = f.rate,
                                                         speciesname = b.name,
                                                         status = b.status,
                                                         locality = b.city
                                                     }).OrderByDescending(x => x.birdcount);
            //Plains - wanderer
            viewmodel.plainsWandererRankings = (from b in birdranks
                                               where b.name == "Plains - wanderer"
                                                join f in fireranks on b.city equals f.city into birdfirerank
                                               from f in birdfirerank
                                               select new BirdThreatRanking
                                               {
                                                   birdcount = b.count,
                                                   threatrate = f.rate,
                                                   speciesname = b.name,
                                                   status = b.status,
                                                   locality = b.city
                                               }).OrderByDescending(x => x.birdcount);
            //Red - lored Whistler
            viewmodel.redLoredWhistlerRankings = (from b in birdranks
                                                where b.name == "Red - lored Whistler"
                                                  join f in fireranks on b.city equals f.city into birdfirerank
                                                from f in birdfirerank
                                                select new BirdThreatRanking
                                                {
                                                    birdcount = b.count,
                                                    threatrate = f.rate,
                                                    speciesname = b.name,
                                                    status = b.status,
                                                    locality = b.city
                                                }).OrderByDescending(x => x.birdcount);
            //Red - tailed Black Cockatoo
            viewmodel.redTailedCockatooRankings = (from b in birdranks
                                                  where b.name == "Red - tailed Black Cockatoo"
                                                   join f in fireranks on b.city equals f.city into birdfirerank
                                                  from f in birdfirerank
                                                  select new BirdThreatRanking
                                                  {
                                                      birdcount = b.count,
                                                      threatrate = f.rate,
                                                      speciesname = b.name,
                                                      status = b.status,
                                                      locality = b.city
                                                  }).OrderByDescending(x => x.birdcount);
            //Regent Honeyeater
            viewmodel.regentHoneyEaterRankings = (from b in birdranks
                                                   where b.name == "Regent Honeyeater"
                                                  join f in fireranks on b.city equals f.city into birdfirerank
                                                   from f in birdfirerank
                                                   select new BirdThreatRanking
                                                   {
                                                       birdcount = b.count,
                                                       threatrate = f.rate,
                                                       speciesname = b.name,
                                                       status = b.status,
                                                       locality = b.city
                                                   }).OrderByDescending(x => x.birdcount);
            //Regent Parrot
            viewmodel.regentParrotRankings = (from b in birdranks
                                                  where b.name == "Regent Parrot"
                                              join f in fireranks on b.city equals f.city into birdfirerank
                                                  from f in birdfirerank
                                                  select new BirdThreatRanking
                                                  {
                                                      birdcount = b.count,
                                                      threatrate = f.rate,
                                                      speciesname = b.name,
                                                      status = b.status,
                                                      locality = b.city
                                                  }).OrderByDescending(x => x.birdcount);
            //shy albatross
            viewmodel.shyAlbatrossRankings = (from b in birdranks
                                              where b.name == "shy albatross"
                                              join f in fireranks on b.city equals f.city into birdfirerank
                                              from f in birdfirerank
                                              select new BirdThreatRanking
                                              {
                                                  birdcount = b.count,
                                                  threatrate = f.rate,
                                                  speciesname = b.name,
                                                  status = b.status,
                                                  locality = b.city
                                              }).OrderByDescending(x => x.birdcount);
            //Southern Emu-wren
            viewmodel.southernEmuWrenRankings = (from b in birdranks
                                              where b.name == "Southern Emu-wren"
                                                 join f in fireranks on b.city equals f.city into birdfirerank
                                              from f in birdfirerank
                                              select new BirdThreatRanking
                                              {
                                                  birdcount = b.count,
                                                  threatrate = f.rate,
                                                  speciesname = b.name,
                                                  status = b.status,
                                                  locality = b.city
                                              }).OrderByDescending(x => x.birdcount);
            //southern giant-petrel
            viewmodel.southernGiantPetrelRankings = (from b in birdranks
                                                 where b.name == "southern giant-petrel"
                                                     join f in fireranks on b.city equals f.city into birdfirerank
                                                 from f in birdfirerank
                                                 select new BirdThreatRanking
                                                 {
                                                     birdcount = b.count,
                                                     threatrate = f.rate,
                                                     speciesname = b.name,
                                                     status = b.status,
                                                     locality = b.city
                                                 }).OrderByDescending(x => x.birdcount);
            //Spine - tailed swift
            viewmodel.spinetailedSwiftRankings = (from b in birdranks
                                                     where b.name == "Spine - tailed swift"
                                                  join f in fireranks on b.city equals f.city into birdfirerank
                                                     from f in birdfirerank
                                                     select new BirdThreatRanking
                                                     {
                                                         birdcount = b.count,
                                                         threatrate = f.rate,
                                                         speciesname = b.name,
                                                         status = b.status,
                                                         locality = b.city
                                                     }).OrderByDescending(x => x.birdcount);
            //Spotted Quail - thrush
            viewmodel.spottedQuailRankings = (from b in birdranks
                                                  where b.name == "Spotted Quail - thrush"
                                              join f in fireranks on b.city equals f.city into birdfirerank
                                                  from f in birdfirerank
                                                  select new BirdThreatRanking
                                                  {
                                                      birdcount = b.count,
                                                      threatrate = f.rate,
                                                      speciesname = b.name,
                                                      status = b.status,
                                                      locality = b.city
                                                  }).OrderByDescending(x => x.birdcount);
            //Superb Parrot
            viewmodel.superbParrotRankings = (from b in birdranks
                                              where b.name == "Superb Parrot"
                                              join f in fireranks on b.city equals f.city into birdfirerank
                                              from f in birdfirerank
                                              select new BirdThreatRanking
                                              {
                                                  birdcount = b.count,
                                                  threatrate = f.rate,
                                                  speciesname = b.name,
                                                  status = b.status,
                                                  locality = b.city
                                              }).OrderByDescending(x => x.birdcount);
            //Swift Parrot
            viewmodel.swiftParrotRankings = (from b in birdranks
                                              where b.name == "Swift Parrot"
                                             join f in fireranks on b.city equals f.city into birdfirerank
                                              from f in birdfirerank
                                              select new BirdThreatRanking
                                              {
                                                  birdcount = b.count,
                                                  threatrate = f.rate,
                                                  speciesname = b.name,
                                                  status = b.status,
                                                  locality = b.city
                                              }).OrderByDescending(x => x.birdcount);
            //Wandering Albatross
            viewmodel.wanderingAlbatrossRankings = (from b in birdranks
                                             where b.name == "Wandering Albatross"
                                                    join f in fireranks on b.city equals f.city into birdfirerank
                                             from f in birdfirerank
                                             select new BirdThreatRanking
                                             {
                                                 birdcount = b.count,
                                                 threatrate = f.rate,
                                                 speciesname = b.name,
                                                 status = b.status,
                                                 locality = b.city
                                             }).OrderByDescending(x => x.birdcount);
            //Wedge - tailed Eagle
            viewmodel.wedgeTailedEagleRankings = (from b in birdranks
                                                    where b.name == "Wedge - tailed Eagle"
                                                  join f in fireranks on b.city equals f.city into birdfirerank
                                                    from f in birdfirerank
                                                    select new BirdThreatRanking
                                                    {
                                                        birdcount = b.count,
                                                        threatrate = f.rate,
                                                        speciesname = b.name,
                                                        status = b.status,
                                                        locality = b.city
                                                    }).OrderByDescending(x => x.birdcount);
            //White - winged Fairy - wren
            viewmodel.whiteWingedFairyWrenRankings = (from b in birdranks
                                                  where b.name == "White - winged Fairy - wren"
                                                      join f in fireranks on b.city equals f.city into birdfirerank
                                                  from f in birdfirerank
                                                  select new BirdThreatRanking
                                                  {
                                                      birdcount = b.count,
                                                      threatrate = f.rate,
                                                      speciesname = b.name,
                                                      status = b.status,
                                                      locality = b.city
                                                  }).OrderByDescending(x => x.birdcount);
            //Yellow - tufted Honeyeater
            viewmodel.yellowTuftedHoneyEaterRankings = (from b in birdranks
                                                      where b.name == "Yellow - tufted Honeyeater"
                                                        join f in fireranks on b.city equals f.city into birdfirerank
                                                      from f in birdfirerank
                                                      select new BirdThreatRanking
                                                      {
                                                          birdcount = b.count,
                                                          threatrate = f.rate,
                                                          speciesname = b.name,
                                                          status = b.status,
                                                          locality = b.city
                                                      }).OrderByDescending(x => x.birdcount);
            return View(viewmodel);
        }

        // GET: AvesEndangereds/Details/5
        public ActionResult VulnerableDetails(int? id)
        {
            return View();
        }

        // GET: AvesEndangereds/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: AvesEndangereds/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,individualCount,sex,eventDate,eventTime,country,countryCode,stateProvince,verbatimLocality,Latitude,Longitude,scientificName,scientificName1,acceptedNameUsage,kingdom,phylum,_class,order,family,genus,taxonRank,vernacularName,species,measurementID,Status,CatFood")] AvesEndangered avesEndangered)
        {
            if (ModelState.IsValid)
            {
                db.AvesEndangereds.Add(avesEndangered);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(avesEndangered);
        }

        // GET: AvesEndangereds/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            AvesEndangered avesEndangered = db.AvesEndangereds.Find(id);
            if (avesEndangered == null)
            {
                return HttpNotFound();
            }
            return View(avesEndangered);
        }

        // POST: AvesEndangereds/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,individualCount,sex,eventDate,eventTime,country,countryCode,stateProvince,verbatimLocality,Latitude,Longitude,scientificName,scientificName1,acceptedNameUsage,kingdom,phylum,_class,order,family,genus,taxonRank,vernacularName,species,measurementID,Status,CatFood")] AvesEndangered avesEndangered)
        {
            if (ModelState.IsValid)
            {
                db.Entry(avesEndangered).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(avesEndangered);
        }

        // GET: AvesEndangereds/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            AvesEndangered avesEndangered = db.AvesEndangereds.Find(id);
            if (avesEndangered == null)
            {
                return HttpNotFound();
            }
            return View(avesEndangered);
        }

        // POST: AvesEndangereds/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            AvesEndangered avesEndangered = db.AvesEndangereds.Find(id);
            db.AvesEndangereds.Remove(avesEndangered);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
