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

            //BirdFireRank
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
            //viewmodel.brownThornbillRankings = (from r in db.AvesEndangereds
            //                                    where r.vernacularName == "Brown Thornbill"
            //                                    group r by new { r.vernacularName, r.verbatimLocality } into groupedByObject
            //                                    select new BirdThreatRanking
            //                                    {
            //                                        birdcount = groupedByObject.Count(x => x.vernacularName != null),
            //                                        speciesname = groupedByObject.Key.vernacularName,
            //                                        locality = groupedByObject.Key.verbatimLocality
            //                                    }
            //                                ).OrderByDescending(x => x.birdcount)
            //                                .ThenByDescending(x => x.speciesname);
            return View(viewmodel);
        }

        // GET: AvesEndangereds/Details/5
        public ActionResult VulnerableDetails(int? id)
        {
            string state = "Victoria";
            string criticallyendangered = "Critically Endangered";
            string endangered = "Endangered";
            string vulnerable = "Vulnerable";

            EndageredMapViewModel viewmodel = new EndageredMapViewModel();
            viewmodel.distinctvulnerableBirds = (from r in db.AvesEndangereds
                                                 where (r.Status == vulnerable && r.vernacularName != null)
                                                 select new DistinctBird
                                                 {
                                                     speciesname = r.vernacularName,
                                                     status = r.Status,
                                                     specieskingdom = r.kingdom,
                                                     speciesphylum = r.phylum,
                                                     speciesclass = r._class,
                                                     speciesorder = r.order,
                                                     speciesfamily = r.order,
                                                     speciesgenus = r.genus

                                                 }).DistinctBy(x => x.speciesname);
            return View(viewmodel);
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
