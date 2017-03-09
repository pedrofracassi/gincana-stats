card = '<div class="card" data-href="index.html?y=2016"><center><h2><strong class="anoCard">2016</strong></h2><h4 class="nomesEquipes">Equipe Thunder, Equipe Hare e Equipe Safa</h4></center></div>';

$.each(equipes.schools, function(school, school_value) {
    console.log(school_value);
    $.each(equipes.schools[school].years, function(year, year_value) {
        console.log(year_value.teams);
        var div = document.createElement('div');
        div.innerHTML = card;
        div.getElementsByClassName('card')[0].setAttribute('data-href', './?s=' + school + '&y=' + year);
        div.getElementsByClassName('anoCard')[0].innerHTML = equipes.schools[school].name + ' ' + year;
        var str = "";
        for (i = 0; i < year_value.teams.length; i++) {
            console.log(year_value.teams[i]);
            if (i == (year_value.length - 1)) {
                str = str + year_value.teams[i].nome;
            } else if (i == (year_value.length - 2)) {
                str = str + year_value.teams[i].nome + " e ";
            } else {
                str = str + year_value.teams[i].nome + ", ";
            }
        }
        div.getElementsByClassName('nomesEquipes')[0].innerHTML = str;
        $('#cardContainer').prepend(div);
    });
});



jQuery(document).ready(function($) {
    $(".card").click(function() {
        window.document.location = $(this).data("href");
    });
});
