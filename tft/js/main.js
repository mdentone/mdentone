/*! --
// (c) Mario Dentone 2019
---------------------- */

(function() {
    var VERSION = '1.1';

    if (!window.addEventListener) {
        document.body.innerHTML = ':( browser too old';
        return;
    }

    window.addEventListener('error', function(ev) {
        if (ev.message) {
            var el = document.createElement('<pre>');
            el.innerHTML = ev.message;
            document.appendChild(el);
        }
    });

    function makeCollapsible(el) {
        el.addEventListener('click', function() {
            this.classList.toggle('active');
            var content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            }
            else {
                content.style.display = 'block';
            }
        });
    }

    document.querySelectorAll('.collapsible-header').forEach(function(el) {
        makeCollapsible(el);
    });

    var ls = strings['it'];
    document.title = ls['PAGETITLE'];
    footer.innerHTML += ' | VER ' + VERSION
                      + ' | TFT ' + data['game-version']
                      + ' | SRC ' + data['data-sources'];

    document.querySelectorAll('.localizable').forEach(function(el) {
        var lsid = el['ls-id'];
        if (lsid) {
            var prop = el['ls-prop'] || 'innerHTML';
            el[prop] = ls[lsid];
        }
        else {
            lsid = el.innerHTML.replace(/\{([^\}]*)\}/g, '$1');
            el.innerHTML = ls[lsid];
        }
    });

    layout.style.display = '';

    function createDescriptionPopup() {
        var el = document.createElement('div');
        el.className = 'overlay';
        el.innerHTML = '<div id="aligner"><div id="description"></div></div>';

        el.addEventListener('click', function(ev) {
            ev.stopImmediatePropagation();

            document.body.removeChild(el);
        });
        document.body.appendChild(el);
    }

    function createBaseItem(baseItem) {
        var el = document.createElement('a');
        el.className = 'tft-baseitem';

        var img = document.createElement('img');
        img.alt = img.title = ls[baseItem.id.toUpperCase() + "_NAME"];
        img.src = baseItem.img;

        el.appendChild(img);
        return el;
    }

    function createCombinedItem(combItem) {
        var el = document.createElement('a');
        el.className = 'tft-combitem tier-' + combItem.tier;

        var name = ls[combItem.id.toUpperCase() + "_NAME"];
        var desc = ls[combItem.id.toUpperCase() + "_DESC"];

        var imghtml = '<img class="tft-object-image" src="' + combItem.img + '" alt="' + name + '" title="' + name + '">';

        el.innerHTML = imghtml;

        el.addEventListener('click', function(ev) {
            ev.stopImmediatePropagation();

            if (!document.getElementById('description')) {
                createDescriptionPopup();
            }
            description.innerHTML =
                '<h2>' + imghtml + ' ' + name + '</h2>' +
                '<p>' + desc + '</p>' +
                '<h3>' + ls['BASEITEMS'] + '</h3>' +
                '<span id="combitem-baseitem-0"></span><b>+</b><span id="combitem-baseitem-1"></span>' +
                '<h3>' + ls['CHAMPIONS'] + '</h3>' +
                '<div id="combitem-champions"></div>';

            for (var i = 0; i < combItem.baseitems.length; i++) {
                document.getElementById('combitem-baseitem-' + i).appendChild(createBaseItem(combItem.baseitems[i]));
            }

            for (var i = 0; i < combItem.champions.length; i++) {
                document.getElementById('combitem-champions').appendChild(createChampion(combItem.champions[i]));
            }
        });
        return el;
    }

    function createChampion(champion) {
        var el = document.createElement('a');
        el.className = 'tft-champion tier-' + champion.tier;
        el.title = champion.name;

        var imghtml  = '<div class="tft-object-image ' + champion.imgclass + '"></div>';

        el.innerHTML = imghtml + '<br><span>' + champion.name + '</span>';

        el.addEventListener('click', function(ev) {
            ev.stopImmediatePropagation();

            if (!document.getElementById('description')) {
                createDescriptionPopup();
            }
            description.innerHTML =
                '<h2>' + imghtml + ' ' + champion.name + '</h2>' +
                '<p>' + '' + '</p>' +
                '<h3>' + ls['COMBITEMS'] + '</h3>' +
                '<div id="champions-combitem"></div>';

            var dataCombItems = data['combined-items'];
            for (var i = 0; i < dataCombItems.length; i++) {
                for (var j = 0; j < dataCombItems[i].champions.length; j++) {
                    if (dataCombItems[i].champions[j] === champion) {
                        var championcombitems = document.getElementById('champions-combitem');
                        championcombitems.appendChild(createCombinedItem(dataCombItems[i]));
                        championcombitems.append(' = ');
                        championcombitems.appendChild(createBaseItem(dataCombItems[i].baseitems[0]));
                        championcombitems.append(' + ');
                        championcombitems.appendChild(createBaseItem(dataCombItems[i].baseitems[1]));
                        championcombitems.appendChild(document.createElement('br'));
                        break;
                    }
                }
            }
        });
        return el;
    }

    var dataChampions = data['champions'];
    for (var i = 0; i < dataChampions.length; i++) {
        champions.appendChild(createChampion(dataChampions[i]));
    }

    champions.parentElement.previousElementSibling.click();
    combitems.parentElement.previousElementSibling.click();

    var dataCombItems = data['combined-items'];
    for (var i = 0; i < dataCombItems.length; i++) {
        combitems.appendChild(createCombinedItem(dataCombItems[i]));
    }

    var dataBaseItems = data['base-items'];
    for (var i = 0; i < dataBaseItems.length; i++) {
        baseitems.appendChild(createBaseItem(dataBaseItems[i]));
    }

    baseitems.parentElement.previousElementSibling.style.display = 'none';

})();
