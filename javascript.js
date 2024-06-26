var youtube_key = config.api_tokens.youtube_access_token;
var fb_access_token = config.api_tokens.fb_access_token;
var google_analytics_id = config.google_analytics_id;
var photopanel = '<div class="col-md-4"><div class="feed-card"><a class="postLink"><span class="postDescription thisClassUsesBlackMagic "></span><img class="postImage feed-img img-responsive" alt=""></a></div></div>';
var readystuff = 0;

// Google analytics stuff
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

if (google_analytics_id != "undefined") {
    ga('create', google_analytics_id, 'auto');
    ga('send', 'pageview');
}

// Get query parameters
var qd = {};
location.search.substr(1).split("&").forEach(function(item) {
    var s = item.split("="),
    k = s[0],
    v = s[1] && decodeURIComponent(s[1]);
    (qd[k] = qd[k] || []).push(v)
});

var year = 0;

if(qd.s != undefined) {
    if (qd.s['0'] != undefined) {
        if (qd.s['0'] in equipes.schools) {
            school = qd.s['0'];
        } else {
            window.location = 'selector.html';
        }
    } else {
        window.location = 'selector.html';
    }
} else {
    window.location = 'selector.html';
}

if(qd.y != undefined) {
    if (qd.y['0'] != undefined) {
        if (qd.y['0'] in equipes.schools[school].years) {
            year = qd.y['0'];
        } else {
            window.location = 'selector.html';
        }
    } else {
        window.location = 'selector.html';
    }
} else {
    window.location = 'selector.html';
}

var website_count = 0;

if (equipes.schools[school].years[year].config.instagram_enabled) {
    website_count++;
} else {
    $('#instagram-column').remove();
}

if (equipes.schools[school].years[year].config.facebook_enabled) {
    website_count++;
} else {
    $('#facebook-column').remove();
}

if (equipes.schools[school].years[year].config.youtube_enabled) {
    website_count++;
} else {
    $('#youtube-column').remove();
}

document.getElementById('title').innerHTML = "Gincana " + equipes.schools[school].name + " " + year;

function getText(url, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200)
            callback(request.responseText);
            else {
                callback("nex");
            }
        }
    };
    request.open('GET', url);
    request.send();
}

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function getYoutubeSubscriberCount(equipe, callback) {
    var reqType = (equipe.youtube.length >= 24 && equipe.youtube.substr(0, 2).toUpperCase() == "UC") ? "id" : "forUsername";
    getText("https://www.googleapis.com/youtube/v3/channels?part=statistics&" + reqType + "=" + equipe.youtube + "&key=" + youtube_key, function(data) {
        var data_parsed = JSON.parse(data);
        var count = data_parsed.items["0"].statistics.subscriberCount;
        callback(count, equipe);
    });
}

function getInstagramFollowerCount(equipe, callback) {
    getText("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'https%3A%2F%2Fwww.instagram.com%2F" + equipe.instagram + "%2F%3F__a%3D1'&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=", function(data) {
        var data_parsed = JSON.parse(data);
        var dados = JSON.parse(data_parsed.query.results.body);
        callback(dados, equipe);
    });
}

function getFacebookFanCount(equipe, callback) {
    getText("https://graph.facebook.com/" + equipe.facebook + "/?fields=fan_count&access_token=" + fb_access_token, function(data) {
        var data_parsed = JSON.parse(data);
        var count = data_parsed.fan_count;
        callback(count, equipe);
    })
}

var instagram_array = new Array();
var facebook_array = new Array();
var youtube_array = new Array();
var lastphotos = new Array();

function fetchEverything() {
    for (i = 0; i < Object.keys(equipes.schools[school].years[year].teams).length; i++) {
        var e = equipes.schools[school].years[year].teams[i];
        console.log(i);
        console.log(equipes.schools[school].years[year].teams[i]);

        if (equipes.schools[school].years[year].config.youtube_enabled) {
            getYoutubeSubscriberCount(e, function(data, equipe) {
                var trow = {
                    equipe: equipe,
                    count: data
                };
                youtube_array.push(trow);
                checkYoutubeArray();
            });
        }

        if (equipes.schools[school].years[year].config.instagram_enabled) {
            getInstagramFollowerCount(e, function(data, equipe) {
                var trow = {
                    equipe: equipe,
                    count: data.user.followed_by.count
                };

                for (i = 0; i < data.user.media.nodes.length; i++) {
                    data.user.media.nodes[i].equipe = equipe;
                }

                lastphotos = lastphotos.concat(data.user.media.nodes);
                instagram_array.push(trow);
                checkInstagramArray();
            });
        }

        if (equipes.schools[school].years[year].config.facebook_enabled) {
            getFacebookFanCount(e, function(data, equipe) {
                var trow = {
                    equipe: equipe,
                    count: data
                };
                facebook_array.push(trow);
                checkFacebookArray();
            });
        }
    }
}

function refreshAll() {
    document.getElementById('refresh-button').setAttribute('disabled', 'yay');
    document.getElementById('refresh-button').innerHTML = '<i id="reloadSpinner" class="fa fa-refresh fa-spin"></i> Recarregando';

    if (equipes.schools[school].years[year].config.facebook_enabled) {
        while(facebook_array.length) facebook_array.pop();
        document.getElementById("facebook-loading").removeAttribute('style');
        document.getElementById("facebook-tbody").innerHTML = "";
    }

    if (equipes.schools[school].years[year].config.instagram_enabled) {
        while(lastphotos.length) lastphotos.pop();
        while(instagram_array.length) instagram_array.pop();
        document.getElementById("instagram-loading").removeAttribute('style');
        document.getElementById("instagram-tbody").innerHTML = "";
        document.getElementById("instagram-photos-loading").removeAttribute('style');
        document.getElementById("photosContainer").innerHTML = "";
    }

    if (equipes.schools[school].years[year].config.youtube_enabled) {
        while(youtube_array.length) youtube_array.pop();
        document.getElementById("youtube-loading").removeAttribute('style');
        document.getElementById("youtube-tbody").innerHTML = "";
    }
    
    console.log('Refreshing...');
    readystuff = 0;
    fetchEverything();
}

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];

        if (typeof x == "string") {
            x = x.toLowerCase();
        }
        if (typeof y == "string") {
            y = y.toLowerCase();
        }
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function checkIfStuffIsReady() {
    console.log(readystuff);
    if (readystuff == website_count) {
        document.getElementById('refresh-button').removeAttribute('disabled');
        document.getElementById('refresh-button').innerHTML = '<i id="reloadSpinner" class="fa fa-refresh"></i> Recarregar';
    }
}

function checkFacebookArray() {
    if (facebook_array.length == Object.keys(equipes.schools[school].years[year].teams).length) {
        var newarray = facebook_array.sort(function(a, b) {
            return a.count - b.count;
        });

        document.getElementById("facebook-loading").setAttribute('style', 'display:none;');

        for (i = 0; i < newarray.length; i++) {
            var place = Object.keys(equipes.schools[school].years[year].teams).length - i;
            var tr = document.createElement('tr');
            tr.innerHTML = '<td><strong>#' + place + '</strong> <i class="fa fa-caret-right" style="color: #' + newarray[i].equipe.cor + '"></i> ' + newarray[i].equipe.nome + ' (/' + newarray[i].equipe.facebook + ') - <small>' + numberWithCommas(newarray[i].count) + ' curtidas</small></td>';
            $('#facebook-tbody').prepend(tr);
        }

        readystuff++;
        checkIfStuffIsReady();
    }
}

function checkInstagramArray() {
    if (instagram_array.length == Object.keys(equipes.schools[school].years[year].teams).length) {

        // RANKING DAS EQUIPES //
        var newarray = instagram_array.sort(function(a, b) {
            return a.count - b.count;
        });

        document.getElementById("instagram-loading").setAttribute('style', 'display:none;');

        var lenght = newarray.length;

        for (index = 0; index < lenght; index++) {
            var place = Object.keys(equipes.schools[school].years[year].teams).length - index;
            var tr = document.createElement('tr');
            tr.innerHTML = '<td><strong>#' + place + '</strong> <i class="fa fa-caret-right" style="color: #' + newarray[index].equipe.cor + '"></i> ' + newarray[index].equipe.nome + ' (@' + newarray[index].equipe.instagram + ') - <small>' + numberWithCommas(newarray[index].count) + ' seguidores</small></td>';
            $('#instagram-tbody').prepend(tr);
        }

        // FEED DOS POSTS //
        console.log(lastphotos);

        var orderedphotos = lastphotos.sort(function(a, b) {
            return b.date - a.date;
        });

        var maxphotos = 9;
        if (orderedphotos.length < maxphotos) {
            maxphotos = orderedphotos.length;
        }

        document.getElementById("instagram-photos-loading").setAttribute('style', 'display:none;');

        for (i = 0; i < maxphotos; i++) {
            var div = document.createElement('div');
            div.setAttribute('id', orderedphotos[i].code);
            div.innerHTML = photopanel;
            div.getElementsByClassName('postImage')[0].setAttribute('src', orderedphotos[i].thumbnail_src);
            div.getElementsByClassName('postLink')[0].setAttribute('href', 'http://instagram.com/p/' + orderedphotos[i].code);
            if (orderedphotos[i].caption) {
                div.getElementsByClassName('postDescription')[0].innerHTML = '<i class="fa fa-caret-right" style="color: #' + orderedphotos[i].equipe.cor + '"></i> ' + orderedphotos[i].equipe.nome;
            } else {
                div.getElementsByClassName('postDescription')[0].remove();
            }
            $('#photosContainer').append(div);
        }
        readystuff++;
        checkIfStuffIsReady();
        delete newarray;
    }
}

function checkYoutubeArray() {
    if (youtube_array.length == Object.keys(equipes.schools[school].years[year].teams).length) {
        var newarray = youtube_array.sort(function(a, b) {
            return a.count - b.count;
        });

        document.getElementById("youtube-loading").setAttribute('style', 'display:none;');

        for (i = 0; i < newarray.length; i++) {
            var place = Object.keys(equipes.schools[school].years[year].teams).length - i;
            var tr = document.createElement('tr');
            tr.innerHTML = '<td><strong>#' + place + '</strong> <i class="fa fa-caret-right" style="color: #' + newarray[i].equipe.cor + '"></i> ' + newarray[i].equipe.nome + ' (/' + newarray[i].equipe.youtube + ') - <small>' + numberWithCommas(newarray[i].count) + ' inscritos</small></td>';
            $('#youtube-tbody').prepend(tr);
        }

        readystuff++;
        checkIfStuffIsReady();
        delete newarray;
    }
}

function changeYear() {
    window.location = "selector.html";
}


fetchEverything();
