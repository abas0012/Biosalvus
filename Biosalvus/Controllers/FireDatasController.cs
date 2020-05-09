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
    public class FireDatasController : Controller
    {
        private CatRecords db = new CatRecords();

        // GET: FireDatas
        public ActionResult Index()
        {
            return View(db.FireDatas.ToList());
        }

        // GET: FireDatas/Details/5
        public ActionResult Details(decimal id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            FireData fireData = db.FireDatas.Find(id);
            if (fireData == null)
            {
                return HttpNotFound();
            }
            return View(fireData);
        }

        // GET: FireDatas/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: FireDatas/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "latitude,longitude,brightness,scan,track,acq_date,acq_time,satellite,instrument,confidence,version,bright_t31,frp,daynight,type,full_address,street,city,state,postcode")] FireData fireData)
        {
            if (ModelState.IsValid)
            {
                db.FireDatas.Add(fireData);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(fireData);
        }

        // GET: FireDatas/Edit/5
        public ActionResult Edit(decimal id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            FireData fireData = db.FireDatas.Find(id);
            if (fireData == null)
            {
                return HttpNotFound();
            }
            return View(fireData);
        }

        // POST: FireDatas/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "latitude,longitude,brightness,scan,track,acq_date,acq_time,satellite,instrument,confidence,version,bright_t31,frp,daynight,type,full_address,street,city,state,postcode")] FireData fireData)
        {
            if (ModelState.IsValid)
            {
                db.Entry(fireData).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(fireData);
        }

        // GET: FireDatas/Delete/5
        public ActionResult Delete(decimal id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            FireData fireData = db.FireDatas.Find(id);
            if (fireData == null)
            {
                return HttpNotFound();
            }
            return View(fireData);
        }

        // POST: FireDatas/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(decimal id)
        {
            FireData fireData = db.FireDatas.Find(id);
            db.FireDatas.Remove(fireData);
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
