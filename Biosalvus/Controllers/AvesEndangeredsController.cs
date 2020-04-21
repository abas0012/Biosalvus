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

        public ActionResult Index()
        {

            EndageredMap finalitem = new EndageredMap();
            finalitem.aveslist = db.AvesEndangereds;
            finalitem.catslist = db.CatRecordsdb;
            //var aves =  db.AvesEndangereds
            //    .Select( a => new {
            //        a.individualCount,
            //        a.sex,
            //        a.eventDate,
            //        a.eventTime,
            //        a.stateProvince,
            //        a.Latitude,
            //        a.Longitude,
            //        a.vernacularName,
            //        a.species,
            //        a.Status,
            //        a.CatFood
            //    });
            return View(finalitem);
        }

        // GET: AvesEndangereds/Details/5
        public ActionResult Details(int? id)
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
