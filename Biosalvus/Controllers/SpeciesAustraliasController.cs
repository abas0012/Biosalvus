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

        public ActionResult SpeciesMap()
        {
            string present = "Yes";
            string vulnerable = "Vulnerable";
            string extinct = "Extinct";
            string conservationdependent = "Conservation Dependent";
            string criticallyendangered = "Critically Endangered";
            string endangered = "Endangered";
            string extinctinthewild = "Extinct in the wild";
            SpeciesAllViewModel viewModel = new SpeciesAllViewModel();
            viewModel.speciescountbystatus = (from r in db.SpeciesAustralias
                                              where r.Present_ == present
                                              group r by new { r.Threatened_status } into groupedbyStatus
                                              select new SpeciesCountGroupedStatus
                                              {
                                                  TotalCount = groupedbyStatus.Count(x => x.Threatened_status != null),
                                                  Status = groupedbyStatus.Key.Threatened_status
                                              });
            viewModel.speciescountvulnerable = (from r in db.SpeciesAustralias
                                                where (r.Present_ == present && r.Threatened_status == vulnerable)
                                                group r by new { r.StateCode, r.Threatened_status } into groupedbyVulnerable
                                                select new SpeciesCountVulnerable
                                                {
                                                    TotalCount = groupedbyVulnerable.Count(x => x.Threatened_status != null),
                                                    StateCode = groupedbyVulnerable.Key.StateCode,
                                                    Status = groupedbyVulnerable.Key.Threatened_status
                                                }).OrderByDescending(x => x.TotalCount);
            viewModel.speciescountextinct = (from r in db.SpeciesAustralias
                                                where (r.Present_ == present && r.Threatened_status == extinct)
                                                group r by new { r.StateCode, r.Threatened_status } into groupedbyVulnerable
                                                select new SpeciesCountExtinct
                                                {
                                                    TotalCount = groupedbyVulnerable.Count(x => x.Threatened_status != null),
                                                    StateCode = groupedbyVulnerable.Key.StateCode,
                                                    Status = groupedbyVulnerable.Key.Threatened_status
                                                }).OrderByDescending(x => x.TotalCount);
            viewModel.speciescountconservation = (from r in db.SpeciesAustralias
                                                where (r.Present_ == present && r.Threatened_status == conservationdependent)
                                                group r by new { r.StateCode, r.Threatened_status } into groupedbyVulnerable
                                                select new SpeciesCountConservationDependent
                                                {
                                                    TotalCount = groupedbyVulnerable.Count(x => x.Threatened_status != null),
                                                    StateCode = groupedbyVulnerable.Key.StateCode,
                                                    Status = groupedbyVulnerable.Key.Threatened_status
                                                }).OrderByDescending(x => x.TotalCount);
            viewModel.speciescountcritendangered = (from r in db.SpeciesAustralias
                                                where (r.Present_ == present && r.Threatened_status == criticallyendangered)
                                                group r by new { r.StateCode, r.Threatened_status } into groupedbyVulnerable
                                                select new SpeciesCountCriticallyEndangered
                                                {
                                                    TotalCount = groupedbyVulnerable.Count(x => x.Threatened_status != null),
                                                    StateCode = groupedbyVulnerable.Key.StateCode,
                                                    Status = groupedbyVulnerable.Key.Threatened_status
                                                }).OrderByDescending(x => x.TotalCount);
            viewModel.speciescountendangered = (from r in db.SpeciesAustralias
                                                where (r.Present_ == present && r.Threatened_status == endangered)
                                                group r by new { r.StateCode, r.Threatened_status } into groupedbyVulnerable
                                                select new SpeciesCountEndangered
                                                {
                                                    TotalCount = groupedbyVulnerable.Count(x => x.Threatened_status != null),
                                                    StateCode = groupedbyVulnerable.Key.StateCode,
                                                    Status = groupedbyVulnerable.Key.Threatened_status
                                                }).OrderByDescending(x => x.TotalCount);
            viewModel.speciescountextinctinwild = (from r in db.SpeciesAustralias
                                                where (r.Present_ == present && r.Threatened_status == extinctinthewild)
                                                group r by new { r.StateCode, r.Threatened_status } into groupedbyVulnerable
                                                select new SpeciesCountExtinctInWild
                                                {
                                                    TotalCount = groupedbyVulnerable.Count(x => x.Threatened_status != null),
                                                    StateCode = groupedbyVulnerable.Key.StateCode,
                                                    Status = groupedbyVulnerable.Key.Threatened_status
                                                }).OrderByDescending(x => x.TotalCount);
            return View(viewModel);
        }
    }
}
