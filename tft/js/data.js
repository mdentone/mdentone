/*! --
// (c) Mario Dentone 2019
---------------------- */

(function() {
    window.data = window.data || {};

    var championImageUrl = 'https://ddragon.leagueoflegends.com/cdn/9.19.1/img/champion/';
    var itemImageUrl = 'https://cdn.leagueofgraphs.com/img/tft/items/';

    data['app-version'] = VERSION;
    data['game-version'] = '9.19';
    data['data-sources'] = 'leagueofgraphs.com; blitz.gg; esportstales.com; lolchess.gg; thegamehaus.com'

    var Aatrox = { id: 'Aatrox', name: "Aatrox", tier: 4, imgclass: 'champion-266-48' };
    var Ahri = { id: 'Ahri', name: "Ahri", tier: 2, imgclass: 'champion-103-48' };
    var Akali = { id: 'Akali', name: "Akali", tier: 2, imgclass: 'champion-84-48' };
    var Anivia = { id: 'Anivia', name: "Anivia", tier: 1, imgclass: 'champion-34-48' };
    var Ashe = { id: 'Ashe', name: "Ashe", tier: 2, imgclass: 'champion-22-48' };
    var AurelionSol = { id: 'AurelionSol', name: "Aurelion Sol", tier: 1, imgclass: 'champion-136-48' };
    var Blitzcrank = { id: 'Blitzcrank', name: "Blitzcrank", tier: 2, imgclass: 'champion-53-48' };
    var Brand = { id: 'Brand', name: "Brand", tier: 2, imgclass: 'champion-63-48' };
    var Braum = { id: 'Braum', name: "Braum", tier: 3, imgclass: 'champion-201-48' };
    var Camille = { id: 'Camille', name: "Camille", tier: 3, imgclass: 'champion-164-48' };
    var ChoGath = { id: 'ChoGath', name: "Cho'Gath", tier: 1, imgclass: 'champion-31-48' };
    var Darius = { id: 'Darius', name: "Darius", tier: 3, imgclass: 'champion-122-48' };
    var Draven = { id: 'Draven', name: "Draven", tier: 2, imgclass: 'champion-119-48' };
    var Elise = { id: 'Elise', name: "Elise", tier: 5, imgclass: 'champion-60-48' };
    var Evelynn = { id: 'Evelynn', name: "Evelynn", tier: 4, imgclass: 'champion-28-48' };
    var Fiora = { id: 'Fiora', name: "Fiora", tier: 5, imgclass: 'champion-114-48' };
    var Gangplank = { id: 'Gangplank', name: "Gangplank", tier: 5, imgclass: 'champion-41-48' };
    var Garen = { id: 'Garen', name: "Garen", tier: 2, imgclass: 'champion-86-48' };
    var Gnar = { id: 'Gnar', name: "Gnar", tier: 1, imgclass: 'champion-150-48' };
    var Graves = { id: 'Graves', name: "Graves", tier: 4, imgclass: 'champion-104-48' };
    var Jayce = { id: 'Jayce', name: "Jayce", tier: 3, imgclass: 'champion-126-48' };
    var Jinx = { id: 'Jinx', name: "Jinx", tier: 3, imgclass: 'champion-222-48' };
    var KaiSa = { id: 'KaiSa', name: "Kai'Sa", tier: -1, img: championImageUrl + 'Kaisa.png' };
    var Karthus = { id: 'Karthus', name: "Karthus", tier: 2, imgclass: 'champion-30-48' };
    var Kassadin = { id: 'Kassadin', name: "Kassadin", tier: 3, imgclass: 'champion-38-48' };
    var Katarina = { id: 'Katarina', name: "Katarina", tier: 4, imgclass: 'champion-55-48' };
    var Kayle = { id: 'Kayle', name: "Kayle", tier: 2, imgclass: 'champion-10-48' };
    var Kennen = { id: 'Kennen', name: "Kennen", tier: 2, imgclass: 'champion-85-48' };
    var KhaZix = { id: 'KhaZix', name: "Kha'Zix", tier: 3, imgclass: 'champion-121-48' };
    var Kindred = { id: 'Kindred', name: "Kindred", tier: 2, imgclass: 'champion-203-48' };
    var Leona = { id: 'Leona', name: "Leona", tier: 3, imgclass: 'champion-89-48' };
    var Lissandra = { id: 'Lissandra', name: "Lissandra", tier: 3, imgclass: 'champion-127-48' };
    var Lucian = { id: 'Lucian', name: "Lucian", tier: 3, imgclass: 'champion-236-48' };
    var Lulu = { id: 'Lulu', name: "Lulu", tier: 3, imgclass: 'champion-117-48' };
    var MissFortune = { id: 'MissFortune', name: "Miss Fortune", tier: 2, imgclass: 'champion-21-48' };
    var Mordekaiser = { id: 'Mordekaiser', name: "Mordekaiser", tier: 5, imgclass: 'champion-82-48' };
    var Morgana = { id: 'Morgana', name: "Morgana", tier: 3, imgclass: 'champion-25-48' };
    var Nidalee = { id: 'Nidalee', name: "Nidalee", tier: 2, imgclass: 'champion-76-48' };
    var Pantheon = { id: 'Pantheon', name: "Pantheon", tier: 3, imgclass: 'champion-80-48' };
    var Poppy = { id: 'Poppy', name: "Poppy", tier: 5, imgclass: 'champion-78-48' };
    var Pyke = { id: 'Pyke', name: "Pyke", tier: 3, imgclass: 'champion-555-48' };
    var RekSai = { id: 'RekSai', name: "Rek'Sai", tier: 5, imgclass: 'champion-421-48' };
    var Rengar = { id: 'Rengar', name: "Rengar", tier: 3, imgclass: 'champion-107-48' };
    var Sejuani = { id: 'Sejuani', name: "Sejuani", tier: 2, imgclass: 'champion-113-48' };
    var Shen = { id: 'Shen', name: "Shen", tier: 3, imgclass: 'champion-98-48' };
    var Shyvana = { id: 'Shyvana', name: "Shyvana", tier: 1, imgclass: 'champion-102-48' };
    var Swain = { id: 'Swain', name: "Swain", tier: 1, imgclass: 'champion-50-48' };
    var Tristana = { id: 'Tristana', name: "Tristana", tier: 4, imgclass: 'champion-18-48' };
    var TwistedFate = { id: 'TwistedFate', name: "Twisted Fate", tier: 4, imgclass: 'champion-4-48' };
    var Varus = { id: 'Varus', name: "Varus", tier: 3, imgclass: 'champion-110-48' };
    var Vayne = { id: 'Vayne', name: "Vayne", tier: 3, imgclass: 'champion-67-48' };
    var Veigar = { id: 'Veigar', name: "Veigar", tier: 3, imgclass: 'champion-45-48' };
    var Vi = { id: 'Vi', name: "Vi", tier: 3, imgclass: 'champion-254-48' };
    var Volibear = { id: 'Volibear', name: "Volibear", tier: 3, imgclass: 'champion-106-48' };
    var Warwick = { id: 'Warwick', name: "Warwick", tier: 3, imgclass: 'champion-19-48' };
    var Yasuo = { id: 'Yasuo', name: "Yasuo", tier: 1, imgclass: 'champion-157-48' };
    var Zed = { id: 'Zed', name: "Zed", tier: 3, imgclass: 'champion-238-48' };

    data['champions'] = [
        Aatrox, Ahri, Akali, Anivia, Ashe, AurelionSol, Blitzcrank, Brand,
        Braum, Camille, ChoGath, Darius, Draven, Elise, Evelynn, Fiora,
        Gangplank, Garen, Gnar, Graves, Jayce, Jinx, KaiSa, Karthus, Kassadin,
        Katarina, Kayle, Kennen, KhaZix, Kindred, Leona, Lissandra, Lucian,
        Lulu, MissFortune, Mordekaiser, Morgana, Nidalee, Pantheon, Poppy,
        Pyke, RekSai, Rengar, Sejuani, Shen, Shyvana, Swain, Tristana,
        TwistedFate, Varus, Vayne, Veigar, Vi, Volibear, Warwick, Yasuo, Zed
    ];

    var sword = { id: 'sword', img: itemImageUrl + '1.png' };
    var bow = { id: 'bow', img: itemImageUrl + '2.png' };
    var rod = { id: 'rod', img: itemImageUrl + '3.png' };
    var tear = { id: 'tear', img: itemImageUrl + '4.png' };
    var vest = { id: 'vest', img: itemImageUrl + '5.png' };
    var cloak = { id: 'cloak', img: itemImageUrl + '6.png' };
    var belt = { id: 'belt', img: itemImageUrl + '7.png' };
    var spatula = { id: 'spatula', img: itemImageUrl + '8.png' };
    var gloves = { id: 'glove', img: itemImageUrl + '9.png' };

    data['base-items'] = [
        sword, bow, rod, tear, vest, cloak, belt, gloves, spatula
    ];

    var deathblade = { id: 'deathblade', img: itemImageUrl + '11.png', tier: -1, baseitems: [sword, sword] };
    var giantslayer = { id: 'giantslayer', img: itemImageUrl + '12.png', tier: -1, baseitems: [sword, bow] };
    var gunblade = { id: 'gunblade', img: itemImageUrl + '13.png', tier: 3, baseitems: [sword, rod] };
    var spear = { id: 'spear', img: itemImageUrl + '14.png', tier: 2, baseitems: [sword, tear] };
    var angel = { id: 'angel', img: itemImageUrl + '15.png', tier: 1, baseitems: [sword, vest] };
    var bloodthirster = { id: 'bloodthirster', img: itemImageUrl + '16.png', tier: 3, baseitems: [sword, cloak] };
    var herald = { id: 'herald', img: itemImageUrl + '17.png', tier: 5, baseitems: [sword, belt] };
    var ghostblade = { id: 'ghostblade', img: itemImageUrl + '18.png', tier: 0, baseitems: [sword, spatula] };
    var edge = { id: 'edge', img: itemImageUrl + '19.png', tier: -1, baseitems: [sword, gloves] };
    var firecannon = { id: 'firecannon', img: itemImageUrl + '22.png', tier: 1, baseitems: [bow, bow] };
    var rageblade = { id: 'rageblade', img: itemImageUrl + '23.png', tier: 1, baseitems: [bow, rod] };
    var shiv = { id: 'shiv', img: itemImageUrl + '24.png', tier: 3, baseitems: [bow, tear] };
    var dancer = { id: 'dancer', img: itemImageUrl + '25.png', tier: 3, baseitems: [bow, vest] };
    var cursedblade = { id: 'cursedblade', img: itemImageUrl + '26.png', tier: 3, baseitems: [bow, cloak] };
    var hydra = { id: 'hydra', img: itemImageUrl + '27.png', tier: 4, baseitems: [bow, belt] };
    var blade = { id: 'blade', img: itemImageUrl + '28.png', tier: 0, baseitems: [bow, spatula] };
    var crossbow = { id: 'crossbow', img: itemImageUrl + '29.png', tier: -1, baseitems: [bow, gloves] };
    var deathcap = { id: 'deathcap', img: itemImageUrl + '33.png', tier: 3, baseitems: [rod, rod] };
    var echo = { id: 'echo', img: itemImageUrl + '34.png', tier: 4, baseitems: [rod, tear] };
    var locket = { id: 'locket', img: itemImageUrl + '35.png', tier: 3, baseitems: [rod, vest] };
    var spark = { id: 'spark', img: itemImageUrl + '36.png', tier: 4, baseitems: [rod, cloak] };
    var morellonomicon = { id: 'morellonomicon', img: itemImageUrl + '37.png', tier: 1, baseitems: [rod, belt] };
    var yuumi = { id: 'yuumi', img: itemImageUrl + '38.png', tier: 0, baseitems: [rod, spatula] };
    var gauntlet = { id: 'gauntlet', img: itemImageUrl + '39.png', tier: -1, baseitems: [rod, gloves] };
    var embrace = { id: 'embrace', img: itemImageUrl + '44.png', tier: 2, baseitems: [tear, tear] };
    var heart = { id: 'heart', img: itemImageUrl + '45.png', tier: 3, baseitems: [tear, vest] };
    var hush = { id: 'hush', img: itemImageUrl + '46.png', tier: 2, baseitems: [tear, cloak] };
    var redemption = { id: 'redemption', img: itemImageUrl + '47.png', tier: 3, baseitems: [tear, belt] };
    var darkin = { id: 'darkin', img: itemImageUrl + '48.png', tier: 0, baseitems: [tear, spatula] };
    var justice = { id: 'justice', img: itemImageUrl + '49.png', tier: -1, baseitems: [tear, gloves] };
    var thornmail = { id: 'thornmail', img: itemImageUrl + '55.png', tier: 4, baseitems: [vest, vest] };
    var breaker = { id: 'breaker', img: itemImageUrl + '56.png', tier: 3, baseitems: [vest, cloak] };
    var redbuff = { id: 'redbuff', img: itemImageUrl + '57.png', tier: 1, baseitems: [vest, belt] };
    var vow = { id: 'vow', img: itemImageUrl + '58.png', tier: 0, baseitems: [vest, spatula] };
    var icegauntlet = { id: 'icegauntlet', img: itemImageUrl + '59.png', tier: -1, baseitems: [vest, gloves] };
    var claw = { id: 'claw', img: itemImageUrl + '66.png', tier: 2, baseitems: [cloak, cloak] };
    var zephyr = { id: 'zephyr', img: itemImageUrl + '67.png', tier: 5, baseitems: [cloak, belt] };
    var hurricane = { id: 'hurricane', img: itemImageUrl + '68.png', tier: 2, baseitems: [cloak, spatula] };
    var quicksilver = { id: 'quicksilver', img: itemImageUrl + '69.png', tier: -1, baseitems: [cloak, gloves] };
    var armor = { id: 'armor', img: itemImageUrl + '77.png', tier: 3, baseitems: [belt, belt] };
    var mallet = { id: 'mallet', img: itemImageUrl + '78.png', tier: 3, baseitems: [belt, spatula] };
    var trapclaw = { id: 'trapclaw', img: itemImageUrl + '79.png', tier: -1, baseitems: [belt, gloves] };
    var force = { id: 'force', img: itemImageUrl + '88.png', tier: 1, baseitems: [spatula, spatula] };
    var mittens = { id: 'mittens', img: itemImageUrl + '89.png', tier: -1, baseitems: [spatula, gloves] };
    var thief = { id: 'thief', img: itemImageUrl + '99.png', tier: -1, baseitems: [gloves, gloves] };

    data['combined-items'] = [
        deathblade, giantslayer, gunblade, spear, angel, bloodthirster, herald, ghostblade,
        edge, firecannon, rageblade, shiv, dancer, cursedblade, hydra, blade, crossbow, deathcap,
        echo, locket, spark, morellonomicon, yuumi, gauntlet, embrace, heart, hush, redemption,
        darkin, justice, thornmail, breaker, redbuff, vow, icegauntlet, claw, zephyr, hurricane,
        quicksilver, armor, mallet, trapclaw, force, mittens, thief
    ];

    // data taken from above sources:
    Aatrox.bestItems = [gunblade, bloodthirster, hydra, angel, dancer, claw, heart];
    Ahri.bestItems = [spear, rageblade, deathcap, shiv, echo, morellonomicon, embrace];
    Akali.bestItems = [embrace, gunblade, spear, echo, claw, heart, armor];
    Anivia.bestItems = [rageblade, spear, echo, morellonomicon, deathcap, embrace];
    Ashe.bestItems = [shiv, firecannon, rageblade, hurricane, cursedblade];
    AurelionSol.bestItems = [firecannon, spear, rageblade, deathcap, morellonomicon, embrace];
    Blitzcrank.bestItems = [spear, deathcap, gunblade, rageblade, force, armor, thornmail, claw];
    Brand.bestItems = [firecannon, spear, rageblade, deathcap, echo, gunblade, morellonomicon];
    Braum.bestItems = [herald, locket, armor, thornmail, heart, spark, redemption, zephyr, force];
    Camille.bestItems = [bloodthirster, dancer, redbuff, spear, rageblade, shiv, ghostblade];
    ChoGath.bestItems = [angel, deathcap, morellonomicon, heart, redemption, thornmail, armor, hydra];
    Darius.bestItems = [armor, dancer, claw, heart];
    Draven.bestItems = [firecannon, bloodthirster, rageblade, angel];
    Elise.bestItems = [armor, heart, claw, dancer, hydra];
    Evelynn.bestItems = [embrace, deathcap, morellonomicon, gunblade, angel, claw];
    Fiora.bestItems = [rageblade, bloodthirster, firecannon, shiv, gunblade];
    Gangplank.bestItems = [hush, redbuff, morellonomicon, spear, angel, breaker, dancer, claw];
    Garen.bestItems = [morellonomicon, armor, claw, gunblade, dancer, echo];
    Gnar.bestItems = [armor, claw, angel, dancer, hydra, bloodthirster];
    Graves.bestItems = [redbuff, hydra, cursedblade, hush, breaker];
    Jayce.bestItems = [bloodthirster, armor, hydra, dancer, redbuff];
    Jinx.bestItems = [firecannon, hurricane, redbuff, bloodthirster, angel, dancer, hush];
    KaiSa.bestItems = [edge, firecannon, rageblade, hurricane];
    Karthus.bestItems = [embrace, morellonomicon, deathcap];
    Kassadin.bestItems = [rageblade, firecannon, ghostblade, dancer, claw];
    Katarina.bestItems = [embrace, morellonomicon, deathcap, gunblade, echo];
    Kayle.bestItems = [spear, rageblade, firecannon, embrace, shiv];
    Kennen.bestItems = [morellonomicon, angel, deathcap, claw, dancer, gunblade];
    KhaZix.bestItems = [firecannon, embrace, deathcap, echo, dancer, deathblade];
    Kindred.bestItems = [spear, angel, dancer, shiv, herald, locket, spark, zephyr];
    Leona.bestItems = [armor, thornmail, claw, herald, locket, heart, redemption, zephyr, force];
    Lissandra.bestItems = [herald, locket, spark, zephyr];
    Lucian.bestItems = [redbuff, cursedblade, hush, breaker, gunblade, firecannon, rageblade, shiv];
    Lulu.bestItems = [spear, rageblade, herald, locket, spark, embrace, zephyr];
    MissFortune.bestItems = [embrace, morellonomicon, embrace, spear];
    Mordekaiser.bestItems = [armor, thornmail, claw, dancer, heart];
    Morgana.bestItems = [deathcap, morellonomicon, angel, herald, locket, spark, zephyr];
    Nidalee.bestItems = [firecannon, rageblade, hydra, dancer, claw, bloodthirster];
    Pantheon.bestItems = [armor, morellonomicon, spear, deathcap, heart, force];
    Poppy.bestItems = [armor, thornmail, claw, dancer, heart, redemption];
    Pyke.bestItems = [spear, firecannon, morellonomicon, heart, angel, embrace];
    RekSai.bestItems = [armor, spear, thornmail, claw, spark, hydra];
    Rengar.bestItems = [firecannon, angel, claw, bloodthirster, dancer, deathblade];
    Sejuani.bestItems = [morellonomicon, armor, claw, angel, heart];
    Shen.bestItems = [dancer, armor, claw, thornmail, locket, angel];
    Shyvana.bestItems = [armor, thornmail, dancer, rageblade, firecannon, gunblade, angel, hydra];
    Swain.bestItems = [deathcap, morellonomicon, gunblade, angel, claw, armor, dancer];
    Tristana.bestItems = [redbuff, cursedblade, hush, breaker, shiv];
    TwistedFate.bestItems = [shiv, echo, rageblade, embrace, firecannon];
    Varus.bestItems = [shiv, rageblade, firecannon, spear, deathcap, embrace];
    Vayne.bestItems = [shiv, rageblade, firecannon];
    Veigar.bestItems = [embrace, rageblade, firecannon, cursedblade, spear];
    Vi.bestItems = [morellonomicon, angel, heart, armor, spear, deathcap];
    Volibear.bestItems = [firecannon, rageblade, redbuff, cursedblade, bloodthirster, dancer, breaker];
    Warwick.bestItems = [armor, thornmail, heart];
    Yasuo.bestItems = [embrace, hush, redbuff, breaker, armor, angel];
    Zed.bestItems = [firecannon, bloodthirster, angel, herald, deathblade];

})();
