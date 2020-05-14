using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Biosalvus.Models
{
    public class EndageredMapViewModel
    {
        public IEnumerable<AvesSummary> aveslist { get; set; }
        public IEnumerable<CatsSummary> catslist { get; set; }
        public IEnumerable<DistinctBird> distinctvulnerableBirds{ get; set; }
        public IEnumerable<DistinctBird> distinctendangeredBirds { get; set; }
        public IEnumerable<DistinctBird> distinctcritendangeredBirds { get; set; }
        public IEnumerable<BirdPoint> endangeredbirds { get; set; }
        public IEnumerable<BirdPoint> critendangeredbirds { get; set; }
        public IEnumerable<BirdPoint> vulnerablebirds { get; set; }
        public IEnumerable<FireRecords> firelist { get; set; }
        public IEnumerable<FireRanks> fireRanks { get; set; }
        public IEnumerable<BirdThreatRanking> emuRankings { get; set; }
        //Australasian Bittern
        public IEnumerable<BirdThreatRanking> australasionBitternRankings { get; set; }
        //Australian Painted Snipe
        public IEnumerable<BirdThreatRanking> australianPaintedSnipeRankings { get; set; }
        //Azure Kingfisher
        public IEnumerable<BirdThreatRanking> azureKingfisherRankings { get; set; }
        //Bar - tailed Godwit
        public IEnumerable<BirdThreatRanking> barTailedGodwitRankings { get; set; }
        //Bassian Thrush
        public IEnumerable<BirdThreatRanking> bassianThrushRankings { get; set; }
        //Black - browed Albatross
        public IEnumerable<BirdThreatRanking> blackBrowedAlbatrossRankings { get; set; }
        //Black - eared Miner
        public IEnumerable<BirdThreatRanking> blackEaredMinerRankings { get; set; }
        //Blue Petrel
        public IEnumerable<BirdThreatRanking> bluePetrelRankings { get; set; }
        //Brown Thornbill
        public IEnumerable<BirdThreatRanking> brownThornbillRankings { get; set; }
        //Cape Barren goose
        public IEnumerable<BirdThreatRanking> capeBarrenGooseRankings { get; set; }
        //Crested Shrike-tit
        public IEnumerable<BirdThreatRanking> crestedShriketitRankings { get; set; }
        //Curlew Sandpiper
        public IEnumerable<BirdThreatRanking> curlewSandpiperRankings { get; set; }
        //Eastern Bristlebird
        public IEnumerable<BirdThreatRanking> easternBristlebirdRankings { get; set; }
        //Eastern curlew
        public IEnumerable<BirdThreatRanking> easternCurlewRankings { get; set; }
        //Eastern Ground Parrot
        public IEnumerable<BirdThreatRanking> easternGroundParrotRankings { get; set; }
        //Eastern Shrike - tit
        public IEnumerable<BirdThreatRanking> easternShriketitRankings { get; set; }
        //Fairy Tern
        public IEnumerable<BirdThreatRanking> fairyTernRankings { get; set; }
        //Glossy Black-cockatoo
        public IEnumerable<BirdThreatRanking> glossyBlackCockatooRankings { get; set; }
        //Golden Whistler
        public IEnumerable<BirdThreatRanking> goldernWhistlerRankings { get; set; }
        //Great Knot
        public IEnumerable<BirdThreatRanking> greatKnotRankings { get; set; }
        //Green Rosella
        public IEnumerable<BirdThreatRanking> greenRosellaRankings { get; set; }
        //Helmeted Honeyeater
        public IEnumerable<BirdThreatRanking> helmetedHoneyeaterRankings { get; set; }
        //Hooded Robin
        public IEnumerable<BirdThreatRanking> hoodedRobinRankings { get; set; }
        //Horsfield's Bushlark
        public IEnumerable<BirdThreatRanking> horsfieldBushlarkRankings { get; set; }
        //Huahou
        public IEnumerable<BirdThreatRanking> huahouRankings { get; set; }
        //Mallee Emu - wren
        public IEnumerable<BirdThreatRanking> malleeEmuWrenRankings { get; set; }
        //Malleefowl
        public IEnumerable<BirdThreatRanking> malleefowlRankings { get; set; }
        //Masked Owl
        //public IEnumerable<BirdThreatRanking> maskedOwlRankings { get; set; }
        //Northern giant petrel
        public IEnumerable<BirdThreatRanking> northenGiantPetrelRankings { get; set; }
        //Orange - bellied Parrot
        public IEnumerable<BirdThreatRanking> orangeBelliedParrotRankings { get; set; }
        //Pied Currawong
        public IEnumerable<BirdThreatRanking> piedCurrawongRankings { get; set; }
        //Plains - wanderer
        public IEnumerable<BirdThreatRanking> plainsWandererRankings { get; set; }
        //Red - lored Whistler
        public IEnumerable<BirdThreatRanking> redLoredWhistlerRankings { get; set; }
        //Red - tailed Black Cockatoo
        public IEnumerable<BirdThreatRanking> redTailedCockatooRankings { get; set; }
        //Regent Honeyeater
        public IEnumerable<BirdThreatRanking> regentHoneyEaterRankings { get; set; }
        //Regent Parrot
        public IEnumerable<BirdThreatRanking> regentParrotRankings { get; set; }
        //shy albatross
        public IEnumerable<BirdThreatRanking> shyAlbatrossRankings { get; set; }
        //Southern Emu-wren
        public IEnumerable<BirdThreatRanking> southernEmuWrenRankings { get; set; }
        //southern giant-petrel
        public IEnumerable<BirdThreatRanking> southernGiantPetrelRankings { get; set; }
        //Spine - tailed swift
        public IEnumerable<BirdThreatRanking> spinetailedSwiftRankings { get; set; }
        //Spotted Quail - thrush
        public IEnumerable<BirdThreatRanking> spottedQuailRankings { get; set; }
        //Superb Parrot
        public IEnumerable<BirdThreatRanking> superbParrotRankings { get; set; }
        //Swift Parrot
        public IEnumerable<BirdThreatRanking> swiftParrotRankings { get; set; }
        //Wandering Albatross
        public IEnumerable<BirdThreatRanking> wanderingAlbatrossRankings { get; set; }
        //Wedge - tailed Eagle
        public IEnumerable<BirdThreatRanking> wedgeTailedEagleRankings { get; set; }
        //White - winged Fairy - wren
        public IEnumerable<BirdThreatRanking> whiteWingedFairyWrenRankings { get; set; }
        //Yellow - tufted Honeyeater
        public IEnumerable<BirdThreatRanking> yellowTuftedHoneyEaterRankings { get; set; }
        //Brown Thornbill
    }

    public class FireRecords
    {
        public decimal firelatitude { get; set; }
        public decimal firelongitude { get; set; }
        public string city { get; set; }
        public DateTime? acq_date { get; set; }
    }
    public class FireRanks
    {
        public int firecount { get; set; }
        public string city { get; set; }
        public string state { get; set; }
    }

    public class CatsSummary
    {
        public string catname { get; set; }
        public decimal catlongitude { get; set; }
        public decimal catlatitude { get; set; }
        public string catstate { get; set; }
        public int? catindividualcount { get; set; }
    }

    public class AvesSummary
    {
        public string avesname { get; set; }
        public decimal aveslongitude { get; set; }
        public decimal aveslatitude { get; set; }
        public string avesstatus { get; set; }
        public string avesstate { get; set; }
        public string catfood { get; set; }
   }

    public class BirdThreatRanking
    {
        public int birdcount { get; set; }
        public string threatrate { get; set; }
        public string speciesname { get; set; }
        public string status { get; set; }
        public string locality { get; set; }
    }

    public class DistinctBird
    {
        public int ID { get; set; }
        public string speciesname { get; set; }
        public string status { get; set; }
        public string specieskingdom { get; set; }
        public string speciesphylum { get; set; }
        public string speciesclass { get; set; }
        public string speciesorder { get; set; }
        public string speciesfamily { get; set; }
        public string speciesgenus { get; set; }

    }

    public class BirdPoint
    {
        public string birdname { get; set; }
        public string scientificname { get; set; }
        public decimal birdlongitude { get; set; }
        public decimal birdlatitude { get; set; }
        public string status { get; set; }
        public string state { get; set; }
        public string catfood { get; set; }
    }

}