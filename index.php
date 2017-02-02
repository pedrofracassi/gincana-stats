<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <title>Gincana</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="theme-color" content="#43cea2">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Pedro Fracassi</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.1.1.slim.js" integrity="sha256-5i/mQ300M779N2OVDrl16lbohwXNUdzL/R2aVUXyXWA=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
    <link rel="stylesheet" type="text/css" href="https://bootswatch.com/yeti/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="style.css">
</head>

<body>
    <div class="holder">
        <center>
            <h1 id="title">Gincana Oficina 2016 </h1>
            <h4>Redes Sociais das Equipes</h4>
            <a class="whatsapp hidden-md-up" href="whatsapp://send?text=Veja a quantidade de seguidores de cada equipe da gincana em tempo real! http://pedrofracassi.tk/gincana/" data-action="share/whatsapp/share"><i class="fa fa-whatsapp"></i> Compartilhar via WhatsApp</a>
            <div style="height: 20px;"></div>
        </center>
    </div>
    <div class="container">
        <h1 class="ranking-title"><i class="fa fa-bar-chart" aria-hidden="true"></i> Ranking das <span>equipes</span></h1>
        <div class="row">

            <!-- COLOCAÇÕES INSTAGRAM -->
            <div class="col-md-4 col-sm-6 col-xs-12">
                <div class="panel panel-default instagram">
                    <div class="panel-heading">
                        <h3><center>Instagram</center></h3>
                    </div>
                    <table class="table table-hover">
                        <tbody id="instagram-tbody">
                            <div id="instagram-loading">
                                <center><i class="fa fa-spinner fa-spin fa-2x fa-fw loading-spinner"></i></center>
                            </div>
                            <!-- Javascript adiciona as coisas aqui -->
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- ./col-md-4 (instagram) -->

            <!-- COLOCAÇÕES FACEBOOK -->
            <div class="col-md-4 col-sm-6 col-xs-12">
                <div class="panel panel-default facebook">
                    <div class="panel-heading">
                        <h3><center> Facebook</center></h3>
                    </div>
                    <table class="table table-hover">
                        <tbody id="facebook-tbody">
                            <div id="facebook-loading">
                                <center><i class="fa fa-spinner fa-spin fa-2x fa-fw loading-spinner"></i></center>
                            </div>
                            <!-- Javascript adiciona as coisas aqui -->
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- ./col-md-4 (facebook) -->

            <!-- COLOCAÇÕES YOUTUBE -->
            <div class="col-md-4 col-sm-6 col-xs-12">
                <div class="panel panel-default youtube">
                    <div class="panel-heading">
                        <h3><center>Youtube</center></h3>
                    </div>
                    <table class="table table-hover">
                        <tbody id="youtube-tbody">
                            <div id="youtube-loading">
                                <center><i class="fa fa-spinner fa-spin fa-2x fa-fw loading-spinner"></i></center>
                            </div>
                            <!-- Javascript adiciona as coisas aqui -->
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- ./col-md-4 (facebook) -->
        </div>

    </div>
    <div class="feed">
        <div class="container">
          <h1><i class="fa fa-picture-o" aria-hidden="true"></i> Últimas <span>fotos</span></h1>
          <center id="instagram-photos-loading"><span class="loader-feed"><i class="fa fa-spinner fa-spin fa-fw loading-spinner"></i> Carregando</span></center>
          <div id="photosContainer">
          </div>
        </div>
    </div>
    <footer>
        <center>
            <small>
            Código por <a href="http://pedrofracassi.tk">Pedro Fracassi</a>
            <br>
            Design por <a href="https://www.behance.net/oredstonebr">Willian Rodrigues</a>
        </small>
        </center>
    </footer>
    <script type="text/javascript" src="config.json"></script>
    <script type="text/javascript" src="javascript.js"></script>
</body>
</html>
