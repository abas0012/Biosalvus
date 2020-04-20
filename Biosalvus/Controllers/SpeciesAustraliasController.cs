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
    }
}
