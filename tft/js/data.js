/*! --
// (c) Mario Dentone 2019
---------------------- */

(function() {
    window.data = window.data || {};

    data['game-version'] = '9.18';
    data['data-sources'] = 'leagueofgraphs.com; blitz.gg'

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
    var Garen = { id: 'Garen', name: "Garen", tier: 1, imgclass: 'champion-86-48' };
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

    var imageurl = 'https://cdn.leagueofgraphs.com/img/tft/items/';

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

    data['combined-items'] = [
        { id: 'deathblade', img: imageurl + '11.png', tier: 2, baseitems: [sword, sword], champions: [Ashe, Vayne, Rengar, Draven, KhaZix, Zed, Jinx] },
        { id: 'lastwhisper', img: imageurl + '12.png', tier: 4, baseitems: [sword, bow], champions: [Ashe, Vayne, Rengar, Draven, KhaZix, Zed] },
        { id: 'gunblade', img: imageurl + '13.png', tier: 3, baseitems: [sword, rod], champions: [Evelynn, Swain, Katarina, Akali, Garen, Brand, Shyvana] },
        { id: 'spear', img: imageurl + '14.png', tier: 3, baseitems: [sword, tear], champions: [Akali, Ahri, Sejuani, Lulu, AurelionSol, Pyke] },
        { id: 'angel', img: imageurl + '15.png', tier: 1, baseitems: [sword, vest], champions: [ChoGath, Shen, Sejuani, Yasuo, Vi, Pyke, Evelynn, Gnar, Shyvana, Rengar, Draven, Jinx, Swain] },
        { id: 'bloodthirster', img: imageurl + '16.png', tier: 3, baseitems: [sword, cloak], champions: [Nidalee, Draven, Camille, Aatrox, Rengar] },
        { id: 'herald', img: imageurl + '17.png', tier: 5, baseitems: [sword, belt], champions: [Morgana, Leona, Lulu, Lissandra, Braum, Kindred] },
        { id: 'ghostblade', img: imageurl + '18.png', tier: 0, baseitems: [sword, spatula], champions: [] },
        { id: 'firecannon', img: imageurl + '22.png', tier: 1, baseitems: [bow, bow], champions: [Vayne, Volibear, Draven, Rengar, Jinx, AurelionSol] },
        { id: 'rageblade', img: imageurl + '23.png', tier: 1, baseitems: [bow, rod], champions: [Kayle, Kassadin, Veigar, Blitzcrank, Ahri, AurelionSol, Lucian, Brand, Ashe] },
        { id: 'shiv', img: imageurl + '24.png', tier: 3, baseitems: [bow, tear], champions: [Tristana, Volibear, Jayce, Lucian, Ashe] },
        { id: 'dancer', img: imageurl + '25.png', tier: 3, baseitems: [bow, vest], champions: [Garen, Shen, Shyvana, Volibear, Darius, Gnar, Camille] },
        { id: 'cursedblade', img: imageurl + '26.png', tier: 3, baseitems: [bow, cloak], champions: [Tristana, Graves, Volibear, Lucian] },
        { id: 'hydra', img: imageurl + '27.png', tier: 4, baseitems: [bow, belt], champions: [ChoGath, Elise, Nidalee, Shen, Shyvana, Gnar, Aatrox] },
        { id: 'blade', img: imageurl + '28.png', tier: 0, baseitems: [bow, spatula], champions: [] },
        { id: 'deathcap', img: imageurl + '33.png', tier: 3, baseitems: [rod, rod], champions: [Morgana, Karthus, Anivia, Blitzcrank, Brand, Ahri, AurelionSol, ChoGath] },
        { id: 'echo', img: imageurl + '34.png', tier: 4, baseitems: [rod, tear], champions: [Anivia, Katarina, Brand, Akali, Garen, Ahri] },
        { id: 'locket', img: imageurl + '35.png', tier: 3, baseitems: [rod, vest], champions: [Morgana, Leona, Lulu, Lissandra, Braum, Kindred] },
        { id: 'spark', img: imageurl + '36.png', tier: 4, baseitems: [rod, cloak], champions: [Morgana, Leona, Lulu, Lissandra, Braum, Kindred] },
        { id: 'morellonomicon', img: imageurl + '37.png', tier: 1, baseitems: [rod, belt], champions: [Anivia, Katarina, Brand, Kennen, Garen, Lucian, ChoGath, Swain, AurelionSol] },
        { id: 'yuumi', img: imageurl + '38.png', tier: 0, baseitems: [rod, spatula], champions: [] },
        { id: 'embrace', img: imageurl + '44.png', tier: 2, baseitems: [tear, tear], champions: [Akali, Ahri, Sejuani, Lulu, AurelionSol, Pyke, ChoGath, Anivia] },
        { id: 'heart', img: imageurl + '45.png', tier: 3, baseitems: [tear, vest], champions: [ChoGath, Poppy, Leona, Braum, Vi] },
        { id: 'hush', img: imageurl + '46.png', tier: 2, baseitems: [tear, cloak], champions: [Tristana, Graves, Volibear, Yasuo, Jinx, Lucian] },
        { id: 'redemption', img: imageurl + '47.png', tier: 3, baseitems: [tear, belt], champions: [ChoGath, Poppy, Leona, Braum] },
        { id: 'darkin', img: imageurl + '48.png', tier: 0, baseitems: [tear, spatula], champions: [] },
        { id: 'thornmail', img: imageurl + '55.png', tier: 4, baseitems: [vest, vest], champions: [Warwick, ChoGath, Volibear, RekSai] },
        { id: 'breaker', img: imageurl + '56.png', tier: 3, baseitems: [vest, cloak], champions: [Tristana, Graves, Volibear, Lucian] },
        { id: 'redbuff', img: imageurl + '57.png', tier: 1, baseitems: [vest, belt], champions: [Tristana, Graves, Volibear, Lucian, Yasuo] },
        { id: 'vow', img: imageurl + '58.png', tier: 0, baseitems: [vest, spatula], champions: [] },
        { id: 'claw', img: imageurl + '66.png', tier: 2, baseitems: [cloak, cloak], champions: [Poppy, Mordekaiser, Shen, Sejuani, Darius, Gnar, Evelynn, Swain] },
        { id: 'zephyr', img: imageurl + '67.png', tier: 5, baseitems: [cloak, belt], champions: [Morgana, Leona, Lulu, Lissandra, Braum, Kindred] },
        { id: 'hurricane', img: imageurl + '68.png', tier: 2, baseitems: [cloak, spatula], champions: [Ashe, Vayne, Jinx] },
        { id: 'armor', img: imageurl + '77.png', tier: 3, baseitems: [belt, belt], champions: [Warwick, ChoGath, Volibear, Vi, RekSai, Gnar, Shyvana] },
        { id: 'mallet', img: imageurl + '78.png', tier: 3, baseitems: [belt, spatula], champions: [] },
        { id: 'force', img: imageurl + '88.png', tier: 1, baseitems: [spatula, spatula], champions: [Braum, Leona, Pantheon, Blitzcrank] }
    ];

})();
