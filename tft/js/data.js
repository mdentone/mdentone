/*! --
// (c) Mario Dentone 2019
---------------------- */

(function() {
    window.data = window.data || {};

    var imageurl = 'https://cdn.leagueofgraphs.com/img/tft/items/';

    data['app-version'] = '1.2.1';
    data['game-version'] = '9.18';
    data['data-sources'] = 'leagueofgraphs.com; blitz.gg; esportstales.com; lolchess.gg; thegamehaus.com; scarraofficial'

    var Aatrox = { id: 'Aatrox', name: "Aatrox", tier: 4, imgclass: 'champion-266-48' };
    var Ahri = { id: 'Ahri', name: "Ahri", tier: 3, imgclass: 'champion-103-48' };
    var Akali = { id: 'Akali', name: "Akali", tier: 3, imgclass: 'champion-84-48' };
    var Anivia = { id: 'Anivia', name: "Anivia", tier: 1, imgclass: 'champion-34-48' };
    var Ashe = { id: 'Ashe', name: "Ashe", tier: 2, imgclass: 'champion-22-48' };
    var AurelionSol = { id: 'AurelionSol', name: "Aurelion Sol", tier: 2, imgclass: 'champion-136-48' };
    var Blitzcrank = { id: 'Blitzcrank', name: "Blitzcrank", tier: 2, imgclass: 'champion-53-48' };
    var Brand = { id: 'Brand', name: "Brand", tier: 2, imgclass: 'champion-63-48' };
    var Braum = { id: 'Braum', name: "Braum", tier: 3, imgclass: 'champion-201-48' };
    var Camille = { id: 'Camille', name: "Camille", tier: 3, imgclass: 'champion-164-48' };
    var ChoGath = { id: 'ChoGath', name: "Cho'Gath", tier: 1, imgclass: 'champion-31-48' };
    var Darius = { id: 'Darius', name: "Darius", tier: 3, imgclass: 'champion-122-48' };
    var Draven = { id: 'Draven', name: "Draven", tier: 1, imgclass: 'champion-119-48' };
    var Elise = { id: 'Elise', name: "Elise", tier: 4, imgclass: 'champion-60-48' };
    var Evelynn = { id: 'Evelynn', name: "Evelynn", tier: 4, imgclass: 'champion-28-48' };
    var Fiora = { id: 'Fiora', name: "Fiora", tier: 5, imgclass: 'champion-114-48' };
    var Gangplank = { id: 'Gangplank', name: "Gangplank", tier: 5, imgclass: 'champion-41-48' };
    var Garen = { id: 'Garen', name: "Garen", tier: 2, imgclass: 'champion-86-48' };
    var Gnar = { id: 'Gnar', name: "Gnar", tier: 1, imgclass: 'champion-150-48' };
    var Graves = { id: 'Graves', name: "Graves", tier: 4, imgclass: 'champion-104-48' };
    var Jayce = { id: 'Jayce', name: "Jayce", tier: 3, imgclass: 'champion-126-48' };
    var Jinx = { id: 'Jinx', name: "Jinx", tier: 3, imgclass: 'champion-222-48' };
    var Karthus = { id: 'Karthus', name: "Karthus", tier: 2, imgclass: 'champion-30-48' };
    var Kassadin = { id: 'Kassadin', name: "Kassadin", tier: 2, imgclass: 'champion-38-48' };
    var Katarina = { id: 'Katarina', name: "Katarina", tier: 5, imgclass: 'champion-55-48' };
    var Kayle = { id: 'Kayle', name: "Kayle", tier: 2, imgclass: 'champion-10-48' };
    var Kennen = { id: 'Kennen', name: "Kennen", tier: 3, imgclass: 'champion-85-48' };
    var KhaZix = { id: 'KhaZix', name: "Kha'Zix", tier: 2, imgclass: 'champion-121-48' };
    var Kindred = { id: 'Kindred', name: "Kindred", tier: 2, imgclass: 'champion-203-48' };
    var Leona = { id: 'Leona', name: "Leona", tier: 3, imgclass: 'champion-89-48' };
    var Lissandra = { id: 'Lissandra', name: "Lissandra", tier: 3, imgclass: 'champion-127-48' };
    var Lucian = { id: 'Lucian', name: "Lucian", tier: 3, imgclass: 'champion-236-48' };
    var Lulu = { id: 'Lulu', name: "Lulu", tier: 3, imgclass: 'champion-117-48' };
    var MissFortune = { id: 'MissFortune', name: "Miss Fortune", tier: 3, imgclass: 'champion-21-48' };
    var Mordekaiser = { id: 'Mordekaiser', name: "Mordekaiser", tier: 5, imgclass: 'champion-82-48' };
    var Morgana = { id: 'Morgana', name: "Morgana", tier: 3, imgclass: 'champion-25-48' };
    var Nidalee = { id: 'Nidalee', name: "Nidalee", tier: 3, imgclass: 'champion-76-48' };
    var Pantheon = { id: 'Pantheon', name: "Pantheon", tier: 3, imgclass: 'champion-80-48' };
    var Poppy = { id: 'Poppy', name: "Poppy", tier: 4, imgclass: 'champion-78-48' };
    var Pyke = { id: 'Pyke', name: "Pyke", tier: 2, imgclass: 'champion-555-48' };
    var RekSai = { id: 'RekSai', name: "Rek'Sai", tier: 3, imgclass: 'champion-421-48' };
    var Rengar = { id: 'Rengar', name: "Rengar", tier: 3, imgclass: 'champion-107-48' };
    var Sejuani = { id: 'Sejuani', name: "Sejuani", tier: 2, imgclass: 'champion-113-48' };
    var Shen = { id: 'Shen', name: "Shen", tier: 4, imgclass: 'champion-98-48' };
    var Shyvana = { id: 'Shyvana', name: "Shyvana", tier: 1, imgclass: 'champion-102-48' };
    var Swain = { id: 'Swain', name: "Swain", tier: 2, imgclass: 'champion-50-48' };
    var Tristana = { id: 'Tristana', name: "Tristana", tier: 4, imgclass: 'champion-18-48' };
    var TwistedFate = { id: 'TwistedFate', name: "Twisted Fate", tier: 4, imgclass: 'champion-4-48' };
    var Varus = { id: 'Varus', name: "Varus", tier: 3, imgclass: 'champion-110-48' };
    var Vayne = { id: 'Vayne', name: "Vayne", tier: 3, imgclass: 'champion-67-48' };
    var Veigar = { id: 'Veigar', name: "Veigar", tier: 3, imgclass: 'champion-45-48' };
    var Vi = { id: 'Vi', name: "Vi", tier: 3, imgclass: 'champion-254-48' };
    var Volibear = { id: 'Volibear', name: "Volibear", tier: 2, imgclass: 'champion-106-48' };
    var Warwick = { id: 'Warwick', name: "Warwick", tier: 4, imgclass: 'champion-19-48' };
    var Yasuo = { id: 'Yasuo', name: "Yasuo", tier: 2, imgclass: 'champion-157-48' };
    var Zed = { id: 'Zed', name: "Zed", tier: 3, imgclass: 'champion-238-48' };

    data['champions'] = [
        Aatrox, Ahri, Akali, Anivia, Ashe, AurelionSol, Blitzcrank, Brand,
        Braum, Camille, ChoGath, Darius, Draven, Elise, Evelynn, Fiora,
        Gangplank, Garen, Gnar, Graves, Jayce, Jinx, Karthus, Kassadin,
        Katarina, Kayle, Kennen, KhaZix, Kindred, Leona, Lissandra, Lucian,
        Lulu, MissFortune, Mordekaiser, Morgana, Nidalee, Pantheon, Poppy,
        Pyke, RekSai, Rengar, Sejuani, Shen, Shyvana, Swain, Tristana,
        TwistedFate, Varus, Vayne, Veigar, Vi, Volibear, Warwick, Yasuo, Zed
    ];

    var sword = { id: 'sword', img: imageurl + '1.png' };
    var bow = { id: 'bow', img: imageurl + '2.png' };
    var rod = { id: 'rod', img: imageurl + '3.png' };
    var tear = { id: 'tear', img: imageurl + '4.png' };
    var vest = { id: 'vest', img: imageurl + '5.png' };
    var cloak = { id: 'cloak', img: imageurl + '6.png' };
    var belt = { id: 'belt', img: imageurl + '7.png' };
    var spatula = { id: 'spatula', img: imageurl + '8.png' };

    data['base-items'] = [
        sword, bow, rod, tear, vest, cloak, belt, spatula
    ];

    var deathblade = { id: 'deathblade', img: imageurl + '11.png', tier: 2, baseitems: [sword, sword] };
    var lastwhisper = { id: 'lastwhisper', img: imageurl + '12.png', tier: 4, baseitems: [sword, bow] };
    var gunblade = { id: 'gunblade', img: imageurl + '13.png', tier: 3, baseitems: [sword, rod] };
    var spear = { id: 'spear', img: imageurl + '14.png', tier: 3, baseitems: [sword, tear] };
    var angel = { id: 'angel', img: imageurl + '15.png', tier: 1, baseitems: [sword, vest] };
    var bloodthirster = { id: 'bloodthirster', img: imageurl + '16.png', tier: 3, baseitems: [sword, cloak] };
    var herald = { id: 'herald', img: imageurl + '17.png', tier: 5, baseitems: [sword, belt] };
    var ghostblade = { id: 'ghostblade', img: imageurl + '18.png', tier: 0, baseitems: [sword, spatula] };
    var firecannon = { id: 'firecannon', img: imageurl + '22.png', tier: 1, baseitems: [bow, bow] };
    var rageblade = { id: 'rageblade', img: imageurl + '23.png', tier: 1, baseitems: [bow, rod] };
    var shiv = { id: 'shiv', img: imageurl + '24.png', tier: 3, baseitems: [bow, tear] };
    var dancer = { id: 'dancer', img: imageurl + '25.png', tier: 3, baseitems: [bow, vest] };
    var cursedblade = { id: 'cursedblade', img: imageurl + '26.png', tier: 3, baseitems: [bow, cloak] };
    var hydra = { id: 'hydra', img: imageurl + '27.png', tier: 4, baseitems: [bow, belt] };
    var blade = { id: 'blade', img: imageurl + '28.png', tier: 0, baseitems: [bow, spatula] };
    var deathcap = { id: 'deathcap', img: imageurl + '33.png', tier: 3, baseitems: [rod, rod] };
    var echo = { id: 'echo', img: imageurl + '34.png', tier: 4, baseitems: [rod, tear] };
    var locket = { id: 'locket', img: imageurl + '35.png', tier: 3, baseitems: [rod, vest] };
    var spark = { id: 'spark', img: imageurl + '36.png', tier: 4, baseitems: [rod, cloak] };
    var morellonomicon = { id: 'morellonomicon', img: imageurl + '37.png', tier: 1, baseitems: [rod, belt] };
    var yuumi = { id: 'yuumi', img: imageurl + '38.png', tier: 0, baseitems: [rod, spatula] };
    var embrace = { id: 'embrace', img: imageurl + '44.png', tier: 2, baseitems: [tear, tear] };
    var heart = { id: 'heart', img: imageurl + '45.png', tier: 3, baseitems: [tear, vest] };
    var hush = { id: 'hush', img: imageurl + '46.png', tier: 2, baseitems: [tear, cloak] };
    var redemption = { id: 'redemption', img: imageurl + '47.png', tier: 3, baseitems: [tear, belt] };
    var darkin = { id: 'darkin', img: imageurl + '48.png', tier: 0, baseitems: [tear, spatula] };
    var thornmail = { id: 'thornmail', img: imageurl + '55.png', tier: 4, baseitems: [vest, vest] };
    var breaker = { id: 'breaker', img: imageurl + '56.png', tier: 3, baseitems: [vest, cloak] };
    var redbuff = { id: 'redbuff', img: imageurl + '57.png', tier: 1, baseitems: [vest, belt] };
    var vow = { id: 'vow', img: imageurl + '58.png', tier: 0, baseitems: [vest, spatula] };
    var claw = { id: 'claw', img: imageurl + '66.png', tier: 2, baseitems: [cloak, cloak] };
    var zephyr = { id: 'zephyr', img: imageurl + '67.png', tier: 5, baseitems: [cloak, belt] };
    var hurricane = { id: 'hurricane', img: imageurl + '68.png', tier: 2, baseitems: [cloak, spatula] };
    var armor = { id: 'armor', img: imageurl + '77.png', tier: 3, baseitems: [belt, belt] };
    var mallet = { id: 'mallet', img: imageurl + '78.png', tier: 3, baseitems: [belt, spatula] };
    var force = { id: 'force', img: imageurl + '88.png', tier: 1, baseitems: [spatula, spatula] };

    data['combined-items'] = [
        deathblade, lastwhisper, gunblade, spear, angel, bloodthirster, herald, ghostblade,
        firecannon, rageblade, shiv, dancer, cursedblade, hydra, blade, deathcap, echo,
        locket, spark, morellonomicon, yuumi, embrace, heart, hush, redemption, darkin,
        thornmail, breaker, redbuff, vow, claw, zephyr, hurricane, armor, mallet, force
    ];

    // data taken from above sources:
    Aatrox.bestItems = [gunblade, bloodthirster, hydra, angel, dancer, claw, heart];
    Ahri.bestItems = [spear, rageblade, deathcap, shiv, echo, morellonomicon, embrace];
    Akali.bestItems = [embrace, gunblade, spear, echo, claw, heart, armor];
    Anivia.bestItems = [rageblade, spear, echo, morellonomicon, deathcap, embrace];
    Ashe.bestItems = [deathblade, lastwhisper, rageblade, shiv, hurricane];
    AurelionSol.bestItems = [spear, firecannon, rageblade, deathcap, morellonomicon, embrace];
    Blitzcrank.bestItems = [spear, deathcap, rageblade, force];
    Brand.bestItems = [firecannon, spear, gunblade, rageblade, deathcap, echo, morellonomicon];
    Braum.bestItems = [herald, locket, spark, heart, redemption, zephyr, force];
    Camille.bestItems = [bloodthirster, dancer, redbuff, spear, rageblade, shiv, ghostblade];
    ChoGath.bestItems = [angel, hydra, deathcap, morellonomicon, embrace, heart, redemption, thornmail, armor];
    Darius.bestItems = [dancer, claw, armor];
    Draven.bestItems = [deathblade, lastwhisper, angel, bloodthirster, firecannon];
    Elise.bestItems = [armor, heart, claw, dancer, hydra];
    Evelynn.bestItems = [gunblade, angel, claw];
    Fiora.bestItems = [shiv, gunblade, bloodthirster, firecannon];
    Gangplank.bestItems = [hush, redbuff, morellonomicon, spear, angel, breaker];
    Garen.bestItems = [gunblade, dancer, echo, morellonomicon];
    Gnar.bestItems = [angel, bloodthirster, dancer, hydra, claw, armor];
    Graves.bestItems = [cursedblade, hush, breaker, redbuff];
    Jayce.bestItems = [bloodthirster, redbuff, armor, hydra, shiv];
    Jinx.bestItems = [deathblade, angel, firecannon, hurricane, bloodthirster, redbuff, dancer, hush];
    Karthus.bestItems = [morellonomicon, deathcap, embrace];
    Kassadin.bestItems = [rageblade, firecannon, ghostblade];
    Katarina.bestItems = [gunblade, echo, morellonomicon];
    Kayle.bestItems = [rageblade, spear, firecannon, embrace, shiv];
    Kennen.bestItems = [morellonomicon, angel, gunblade];
    KhaZix.bestItems = [deathblade, firecannon, dancer, lastwhisper];
    Kindred.bestItems = [herald, locket, spark, zephyr];
    Leona.bestItems = [armor, thornmail, claw, herald, locket, heart, redemption, zephyr, force];
    Lissandra.bestItems = [herald, locket, spark, zephyr];
    Lucian.bestItems = [redbuff, cursedblade, hush, breaker, gunblade, firecannon, rageblade, shiv];
    Lulu.bestItems = [spear, herald, locket, spark, embrace, zephyr];
    MissFortune.bestItems = [morellonomicon, embrace, spear];
    Mordekaiser.bestItems = [armor, thornmail, claw];
    Morgana.bestItems = [deathcap, herald, locket, spark, zephyr];
    Nidalee.bestItems = [bloodthirster, hydra];
    Pantheon.bestItems = [morellonomicon, armor, deathcap, heart, force];
    Poppy.bestItems = [heart, redemption, claw];
    Pyke.bestItems = [spear, morellonomicon, heart, angel, embrace];
    RekSai.bestItems = [armor, thornmail, claw, spark, hydra];
    Rengar.bestItems = [deathblade, lastwhisper, angel, bloodthirster, firecannon, spear];
    Sejuani.bestItems = [spear, angel, embrace, claw];
    Shen.bestItems = [angel, dancer, hydra, claw];
    Shyvana.bestItems = [gunblade, angel, dancer, hydra];
    Swain.bestItems = [gunblade, angel, morellonomicon, claw];
    Tristana.bestItems = [shiv, cursedblade, hush, breaker, redbuff];
    TwistedFate.bestItems = [echo, embrace, shiv, firecannon];
    Varus.bestItems = [rageblade, spark, firecannon, spear, shiv, deathcap, morellonomicon];
    Vayne.bestItems = [deathblade, lastwhisper, firecannon, hurricane];
    Veigar.bestItems = [rageblade, embrace, echo, claw];
    Vi.bestItems = [angel, heart, armor, spear, morellonomicon, deathcap];
    Volibear.bestItems = [firecannon, shiv, dancer, cursedblade, hush, thornmail, breaker, redbuff, armor];
    Warwick.bestItems = [armor, thornmail, heart];
    Yasuo.bestItems = [embrace, hush, redbuff, breaker, angel];
    Zed.bestItems = [bloodthirster, firecannon, angel, deathblade, lastwhisper];

})();
