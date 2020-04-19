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
    public class CatRecordsController : Controller
    {
        private CatRecords db = new CatRecords();

        // GET: CatRecords
        public ActionResult Index()
        {
            return View(db.CatRecordsdb.ToList());
        }

        // GET: CatRecords/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CatRecord catRecord = db.CatRecordsdb.Find(id);
            if (catRecord == null)
            {
                return HttpNotFound();
            }
            return View(catRecord);
        }

        // GET: CatRecords/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: CatRecords/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,ScientificName,TaxonRank,VernacularName,Kingdom,Phylum,Class,Order,Family,Genus,Species,Subspecies,Latitude,Longitude,CoordinatePrecision,CoordinateUncertaintyInMetres,Country,State,LocalGovernmentAreas2011,IMCRA4Regions,IBRA7Regions,MinimumElevationInMeters,MaximumElevationInMeters,MinimumDepthInMeters,MaximumDepthInMeters,IndividualCount,Collector,Year,Month,Day,EventDate,BasisOfRecord,Occurrence_status,Sex")] CatRecord catRecord)
        {
            if (ModelState.IsValid)
            {
                db.CatRecordsdb.Add(catRecord);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(catRecord);
        }

        // GET: CatRecords/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CatRecord catRecord = db.CatRecordsdb.Find(id);
            if (catRecord == null)
            {
                return HttpNotFound();
            }
            return View(catRecord);
        }

        // POST: CatRecords/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,ScientificName,TaxonRank,VernacularName,Kingdom,Phylum,Class,Order,Family,Genus,Species,Subspecies,Latitude,Longitude,CoordinatePrecision,CoordinateUncertaintyInMetres,Country,State,LocalGovernmentAreas2011,IMCRA4Regions,IBRA7Regions,MinimumElevationInMeters,MaximumElevationInMeters,MinimumDepthInMeters,MaximumDepthInMeters,IndividualCount,Collector,Year,Month,Day,EventDate,BasisOfRecord,Occurrence_status,Sex")] CatRecord catRecord)
        {
            if (ModelState.IsValid)
            {
                db.Entry(catRecord).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(catRecord);
        }

        // GET: CatRecords/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CatRecord catRecord = db.CatRecordsdb.Find(id);
            if (catRecord == null)
            {
                return HttpNotFound();
            }
            return View(catRecord);
        }

        // POST: CatRecords/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            CatRecord catRecord = db.CatRecordsdb.Find(id);
            db.CatRecordsdb.Remove(catRecord);
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
