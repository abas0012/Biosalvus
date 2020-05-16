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
    public class SpeciesAustraliasController : Controller
    {
        private CatRecords db = new CatRecords();

        // GET: SpeciesAustralias
        public ActionResult Index()
        {
            return View(db.SpeciesAustralias.ToList());
        }

        public ActionResult SpeciesMap()
        {
            string present = "Yes";
            string vulnerable = "Vulnerable";
            string extinct = "Extinct";
            string conservationdependent = "Conservation Dependent";
            string criticallyendangered = "Critically Endangered";
            string endangered = "Endangered";
            string extinctinthewild = "Extinct in the wild";
            string animalia = "Animalia";
            SpeciesAllViewModel viewModel = new SpeciesAllViewModel();
            viewModel.speciescountbystatus = (from r in db.SpeciesAustralias
                                              where (r.Present_ == present && r.Kingdom == animalia)
                                              group r by new { r.Threatened_status } into groupedbyStatus
                                              select new SpeciesCountGroupedStatus
                                              {
                                                  TotalCount = groupedbyStatus.Count(x => x.Threatened_status != null),
                                                  Status = groupedbyStatus.Key.Threatened_status
                                              });
            viewModel.speciescountbystatestatus = (from r in db.SpeciesAustralias
                                                   where (r.Present_ == present && r.Kingdom == animalia && r.Threatened_status != extinct && r.Threatened_status != extinctinthewild)
                                                   group r by new { r.Threatened_status, r.StateCode } into groupedbyStatus
                                                   select new SpeciesCountGroupedStateStatus
                                                   {
                                                       TotalCount = groupedbyStatus.Count(x => x.Threatened_status != null),
                                                       Status = groupedbyStatus.Key.Threatened_status,
                                                       StateCode = groupedbyStatus.Key.StateCode
                                                   });
            viewModel.speciescountvulnerable = (from r in db.SpeciesAustralias
                                                where (r.Present_ == present && r.Threatened_status == vulnerable && r.Kingdom == animalia)
                                                group r by new { r.StateCode, r.Threatened_status } into groupedbyVulnerable
                                                select new SpeciesCountVulnerable
                                                {
                                                    TotalCount = groupedbyVulnerable.Count(x => x.Threatened_status != null),
                                                    StateCode = groupedbyVulnerable.Key.StateCode,
                                                    Status = groupedbyVulnerable.Key.Threatened_status
                                                }).OrderByDescending(x => x.TotalCount);
            viewModel.speciescountextinct = (from r in db.SpeciesAustralias
                                                where (r.Present_ == present && r.Threatened_status == extinct && r.Kingdom == animalia)
                                                group r by new { r.StateCode, r.Threatened_status } into groupedbyVulnerable
                                                select new SpeciesCountExtinct
                                                {
                                                    TotalCount = groupedbyVulnerable.Count(x => x.Threatened_status != null),
                                                    StateCode = groupedbyVulnerable.Key.StateCode,
                                                    Status = groupedbyVulnerable.Key.Threatened_status
                                                }).OrderByDescending(x => x.TotalCount);
            viewModel.speciescountconservation = (from r in db.SpeciesAustralias
                                                where (r.Present_ == present && r.Threatened_status == conservationdependent && r.Kingdom == animalia)
                                                group r by new { r.StateCode, r.Threatened_status } into groupedbyVulnerable
                                                select new SpeciesCountConservationDependent
                                                {
                                                    TotalCount = groupedbyVulnerable.Count(x => x.Threatened_status != null),
                                                    StateCode = groupedbyVulnerable.Key.StateCode,
                                                    Status = groupedbyVulnerable.Key.Threatened_status
                                                }).OrderByDescending(x => x.TotalCount);
            viewModel.speciescountcritendangered = (from r in db.SpeciesAustralias
                                                where (r.Present_ == present && r.Threatened_status == criticallyendangered && r.Kingdom == animalia)
                                                group r by new { r.StateCode, r.Threatened_status } into groupedbyVulnerable
                                                select new SpeciesCountCriticallyEndangered
                                                {
                                                    TotalCount = groupedbyVulnerable.Count(x => x.Threatened_status != null),
                                                    StateCode = groupedbyVulnerable.Key.StateCode,
                                                    Status = groupedbyVulnerable.Key.Threatened_status
                                                }).OrderByDescending(x => x.TotalCount);
            viewModel.speciescountendangered = (from r in db.SpeciesAustralias
                                                where (r.Present_ == present && r.Threatened_status == endangered && r.Kingdom == animalia)
                                                group r by new { r.StateCode, r.Threatened_status } into groupedbyVulnerable
                                                select new SpeciesCountEndangered
                                                {
                                                    TotalCount = groupedbyVulnerable.Count(x => x.Threatened_status != null),
                                                    StateCode = groupedbyVulnerable.Key.StateCode,
                                                    Status = groupedbyVulnerable.Key.Threatened_status
                                                }).OrderByDescending(x => x.TotalCount);
            viewModel.speciescountextinctinwild = (from r in db.SpeciesAustralias
                                                where (r.Present_ == present && r.Threatened_status == extinctinthewild && r.Kingdom == animalia)
                                                group r by new { r.StateCode, r.Threatened_status } into groupedbyVulnerable
                                                select new SpeciesCountExtinctInWild
                                                {
                                                    TotalCount = groupedbyVulnerable.Count(x => x.Threatened_status != null),
                                                    StateCode = groupedbyVulnerable.Key.StateCode,
                                                    Status = groupedbyVulnerable.Key.Threatened_status
                                                }).OrderByDescending(x => x.TotalCount);
            viewModel.speciescountbygroupings = (from r in db.SpeciesAustralias
                                                 where (r.Present_ == present && r.Kingdom == animalia)
                                                 group r by new { r.StateCode, r.Threatened_status, r.Grouping} into groupedCounts
                                                 select new SpeciesCountByGrouping
                                                 {
                                                     TotalCount = groupedCounts.Count(x => x.Threatened_status != null),
                                                     StateCode = groupedCounts.Key.StateCode,
                                                     Status = groupedCounts.Key.Threatened_status,
                                                     Grouping = groupedCounts.Key.Grouping
                                                 }).OrderBy(x => x.Grouping);
            viewModel.groupingByStates = (from r in db.SpeciesAustralias
                                                 where (r.Present_ == present && r.Kingdom == animalia)
                                                 group r by new { r.StateCode, r.Grouping } into g
                                                 select new GroupingByState
                                                 {
                                                     TotalCount = g.Count(x => x.Threatened_status != null),
                                                     StateCode = g.Key.StateCode,
                                                     Grouping = g.Key.Grouping
                                                 }).OrderBy(x => x.Grouping);
            viewModel.groupingByStatuses = (from r in db.SpeciesAustralias
                                                 where (r.Present_ == present && r.Kingdom == animalia)
                                                 group r by new { r.Threatened_status, r.Grouping } into g
                                                 select new GroupingByStatus
                                                 {
                                                     TotalCount = g.Count(x => x.Threatened_status != null),
                                                     Status = g.Key.Threatened_status,
                                                     Grouping = g.Key.Grouping
                                                 }).OrderBy(x => x.Grouping);
            viewModel.speciesbygroupings = (from r in db.SpeciesAustralias
                                            where (r.Present_ == present && r.Kingdom == animalia)
                                            select new SpeciesByGrouping
                                            {
                                                CommonName = r.Common_Name,
                                                StateCode = r.StateCode,
                                                Status = r.Threatened_status,
                                                Grouping = r.Grouping
                                            }).OrderBy(x => x.Grouping);
            return View(viewModel);
        }


        // GET: SpeciesAustralias/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            SpeciesAustralia speciesAustralia = db.SpeciesAustralias.Find(id);
            if (speciesAustralia == null)
            {
                return HttpNotFound();
            }
            return View(speciesAustralia);
        }

        // GET: SpeciesAustralias/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: SpeciesAustralias/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,Scientific_Name,Common_Name,Threatened_status,Kingdom,Phylum,Class,Family,Genus,Species,Grouping,Present_,StateCode,Country,StateCountry,State_Name")] SpeciesAustralia speciesAustralia)
        {
            if (ModelState.IsValid)
            {
                db.SpeciesAustralias.Add(speciesAustralia);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(speciesAustralia);
        }

        // GET: SpeciesAustralias/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            SpeciesAustralia speciesAustralia = db.SpeciesAustralias.Find(id);
            if (speciesAustralia == null)
            {
                return HttpNotFound();
            }
            return View(speciesAustralia);
        }

        // POST: SpeciesAustralias/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,Scientific_Name,Common_Name,Threatened_status,Kingdom,Phylum,Class,Family,Genus,Species,Grouping,Present_,StateCode,Country,StateCountry,State_Name")] SpeciesAustralia speciesAustralia)
        {
            if (ModelState.IsValid)
            {
                db.Entry(speciesAustralia).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(speciesAustralia);
        }

        // GET: SpeciesAustralias/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            SpeciesAustralia speciesAustralia = db.SpeciesAustralias.Find(id);
            if (speciesAustralia == null)
            {
                return HttpNotFound();
            }
            return View(speciesAustralia);
        }

        // POST: SpeciesAustralias/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            SpeciesAustralia speciesAustralia = db.SpeciesAustralias.Find(id);
            db.SpeciesAustralias.Remove(speciesAustralia);
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
