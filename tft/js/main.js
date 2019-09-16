/*! --
// (c) Mario Dentone 2019
---------------------- */

(function() {

    if (!window.addEventListener) {
        document.body.innerHTML = ':( browser too old';
        return;
    }

    var VERSION = '1.0';

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
        el.style.cssText = 'position: fixed; top: 50px; left: 50px; right: 50px; bottom: 50px;'
                         + 'background-color: #111; border: 4px solid #555; padding: 40px;';

        el.id = 'description';
        el.addEventListener('click', function() {
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
        el.className = 'tft-combitem';

        var img = document.createElement('img');
        img.alt = img.title = ls[combItem.id.toUpperCase() + "_NAME"];
        img.src = combItem.img;

        el.addEventListener('click', function() {
            if (!document.getElementById('description')) {
                createDescriptionPopup();
            }
            description.innerHTML =
                '<h1><img src="' + combItem.img + '">'
                + ls[combItem.id.toUpperCase() + "_NAME"] + '</h1>'
                + '<p>' + ls[combItem.id.toUpperCase() + "_DESC"] + '</p>'
                + '<p><h3>' + ls['BASEITEMS'] + '</h3><div id="combbaseitems"></div></p>'
                + '<p><h3>' + ls['CHAMPIONS'] + '</h3><div id="combchampions"></div></p>';

            combbaseitems.appendChild(createBaseItem(combItem.baseitems[0]));
            combbaseitems.append('+');
            combbaseitems.appendChild(createBaseItem(combItem.baseitems[1]));

            for (var i = 0; i < combItem.champions.length; i++) {
                combchampions.appendChild(createChampion(combItem.champions[i]));
            }
        });
        el.appendChild(img);
        return el;
    }

    function createChampion(champion) {
        var size = champion.imgclass.slice(-2);

        var el = document.createElement('a');
        el.className = 'tft-champion tier-' + champion.tier;
        el.style.width = '90px'; //tbr: Number(size) *2 + 'px';
        el.title = champion.name;

        var img = document.createElement('div');
        img.style.width = img.style.height = size + 'px';
        img.className = champion.imgclass;

        var name = document.createElement('span');
        name.innerHTML = champion.name;

        el.addEventListener('click', function() {
            if (!document.getElementById('description')) {
                createDescriptionPopup();
            }
            description.innerHTML =
                '<h1><div class="' + champion.imgclass + '" style="width: ' + size + 'px; height: ' + size + 'px;"></div>'
                + champion.name + '</h1>'
                + '<p><h3>' + ls['COMBITEMS'] + '</h3><div id="championcombitems"></div></p>';

            var dataCombItems = data['combined-items'];
            for (var i = 0; i < dataCombItems.length; i++) {
                for (var j = 0; j < dataCombItems[i].champions.length; j++) {
                    if (dataCombItems[i].champions[j] === champion) {
                        championcombitems.appendChild(createCombinedItem(dataCombItems[i]));
                        championcombitems.append(ls[dataCombItems[i].id.toUpperCase() + "_NAME"] + ' =');
                        championcombitems.appendChild(createBaseItem(dataCombItems[i].baseitems[0]));
                        championcombitems.append('+');
                        championcombitems.appendChild(createBaseItem(dataCombItems[i].baseitems[1]));
                        championcombitems.appendChild(document.createElement('br'));
                        break;
                    }
                }
            }
        });
        el.appendChild(img);
        el.appendChild(name);
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
