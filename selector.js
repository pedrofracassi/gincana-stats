card = '<div class="card" data-href="index.html?y=2016"><center><h2><strong class="anoCard">2016</strong></h2><h4 class="nomesEquipes">Equipe Thunder, Equipe Hare e Equipe Safa</h4></center></div>';

$.each(equipes.years, function(index, value) {
    var div = document.createElement('div');
    div.innerHTML = card;
    div.getElementsByClassName('card')[0].setAttribute('data-href', './?y=' + index);
    div.getElementsByClassName('anoCard')[0].innerHTML = index;
    var str = "";
    for (i = 0; i < value.length; i++) {
        if (i == (value.length - 1)) {
            str = str + value[i].nome;
        } else if (i == (value.length - 2)) {
            str = str + value[i].nome + " e ";
        } else {
            str = str + value[i].nome + ", ";
        }
    }
    div.getElementsByClassName('nomesEquipes')[0].innerHTML = str;
    $('#cardContainer').prepend(div);
});

jQuery(document).ready(function($) {
    $(".card").click(function() {
        window.document.location = $(this).data("href");
    });
});
