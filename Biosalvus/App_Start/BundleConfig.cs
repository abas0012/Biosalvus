﻿using System.Web;
using System.Web.Optimization;

namespace Biosalvus
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            // added aves-map.js to the bundle called mapbox. Filter by Tickbox
            bundles.Add(new ScriptBundle("~/bundles/chartjs").Include(
            "~/Scripts/Chart.js",
            "~/Scripts/Chart.min.js"));

            // added aves-map.js to the bundle called mapbox. Filter by Tickbox
            bundles.Add(new ScriptBundle("~/bundles/mapbox").Include(
            "~/Scripts/aves-map.js"));

            // added species-aus.js to the bundle called mapbox. Heatmap
            bundles.Add(new ScriptBundle("~/bundles/speciesmap").Include(
            "~/Scripts/species-aus.js"));

            // added cats-heatmap.js to the bundle called mapbox. Heatmap
            bundles.Add(new ScriptBundle("~/bundles/catheatmap").Include(
            "~/Scripts/cats-heatmap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/template-style.css",
                      "~/Content/site.css"));
        }
    }
}
