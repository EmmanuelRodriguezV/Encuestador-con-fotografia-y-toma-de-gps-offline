<!doctype html>
<!-- <html class="full" lang="en"> -->
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="Eloy Martinez" >
    <link rel="icon" href="?= base_url();?>bootstrap/img/ico.png">

    <title>Estrategias de la Dirección de Operación</title>

    <!-- Bootstrap core CSS -->
    <link href="<?= base_url();?>bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="<?= base_url();?>bootstrap/css/bootstrap-vue.css"/>
    
    <link rel="stylesheet" href="<?= base_url();?>bootstrap/css/fontawesome-free-5.1.1-web/css/all.css">    

    <!-- Custom styles for this template -->
    <link href="<?= base_url();?>bootstrap/css/carousel.css" rel="stylesheet">
    
    <!-- Libraries for Vue Support -->
    <script src="<?= base_url();?>bootstrap/js/vue.js"></script>
    <script src="<?= base_url();?>bootstrap/js/vue-resource.min.js"></script>   
    <!--Librearia para graficos chartkick-->
    <!--<script src="https://unpkg.com/chart.js@2.7.2/dist/Chart.bundle.js"></script>-->
    <script src="<?= base_url();?>bootstrap/js/chartkick/Chart.bundle.js"></script>
    <script src="<?= base_url();?>bootstrap/js/chartkick/vue-chartkick.js"></script>
    <!--<script src="https://unpkg.com/vue-chartkick@0.5.0"></script>-->     

    <style>
      body, html {
  height: 100%;
}
.full {
    background: url('http://10.14.1.72/tablerogerdev/bootstrap/img/fondo.png') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    background-size: cover;
    -o-background-size: cover;
}
.bg9 {
  /* The image used */
  background-image: url("http://10.14.1.72/estdopdev/bootstrap/img/fondo.png");

  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
    </style> 
</head>
<body>
  <div class="bg">
      <div id="app">    
        <header>
          <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <img src="http://10.14.1.72/estdopdev/bootstrap/img/estdop-nav.png">       
            <a class="navbar-brand" href="#" v-if="!login">{{datos_usuario.usu_nombre}}</a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
              <ul class="navbar-nav mr-auto">                
                <li class="nav-item dropdown" v-if="!login">
                  <a class="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Menu</a>
                  <div class="dropdown-menu" aria-labelledby="dropdown01">
                    <a class="dropdown-item" href="#" v-if="perfil.zon.activo" @click="procesa_opcion(31)">Dashboard</a>
                    <a class="dropdown-item" href="#" v-if="perfil.zon.activo" @click="procesa_opcion(32)">Cargar Estrategias</a>
                    <a class="dropdown-item" href="#" v-if="perfil.div.activo" @click="procesa_opcion(21)">Dashboard</a>
                    <a class="dropdown-item" href="#" v-if="perfil.nac.activo" @click="procesa_opcion(11)">Dashboard</a>  
                    <a class="dropdown-item" href="http://10.14.1.72/estdop/index.php/resumen_cpr" target="_new">Comparativa Año Movil</a>
                  </div>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Acerca de...</a>
                </li>   
                <li class="nav-item">
                  <a class="nav-link" href="#" v-on:click="salir()" v-if="!login">Salir</a>
                </li>                         
              </ul>
            </div>
          </nav>
        </header>

        <div v-if="login">
          <div class="row">
            <img src="http://10.14.1.72/estdopdev/bootstrap/img/fondo-tit.png" style="width:100%" responsive>
          </div>
          <div class="row" style="padding:15px;">
            <div class="col-md-4 offset-md-4" style="padding-top:10px; "> 
                <form id="Login" v-if="login">
                    <div class="panel">
                        <h2>Acceso de Usuario</h2>
                        <p>Proporcione su Clave y su Contraseña</p>
                    </div>              
                    <div class="form-group">
                        <input type="text" class="form-control" name="usuario" id="usuario" v-model="usuario.usu_rpe" required placeholder="Usuario">
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" name="password" id="password" v-model="usuario.usu_passwd" required placeholder="Password">
                    </div>                
                    <button type="button" v-on:click="valida()" class="btn btn-success">Accesar</button>
                </form>   
            </div>
          </div> <!-- row -->          
       
          <div class="row">
            <img src="http://10.14.1.72/estdopdev/bootstrap/img/fondo-pie.png" style="width:100%">
          </div>
        </div>  

        <!--Se mostrará este container si no está en login-->
        <div class="container" style="padding-top: 20px;" v-else>

          <zon-car-est v-if="perfil.zon.car_est" :usu_id="datos_usuario.usu_id" :zona_id="datos_usuario.zona_id"></zon-car-est>


          <zon-res-cpr v-if="perfil.zon.res_cpr" :usu_id="datos_usuario.usu_id" :zona_id="datos_usuario.zona_id"></zon-res-cpr>

          <avance-nac v-if="this.perfil.nac.dash_nac" :div_id="datos_usuario.div_id" :usu_id="datos_usuario.usu_id" :zona_id="datos_usuario.zona_id"></avance-nac>

          <avance-div v-if="this.perfil.div.dash_div" :div_id="datos_usuario.div_id" :usu_id="datos_usuario.usu_id" :zona_id="datos_usuario.zona_id"></avance-div>

          <avance-zon v-if="this.perfil.zon.dash_zon" :div_id="datos_usuario.div_id" :usu_id="datos_usuario.usu_id" :zona_id="datos_usuario.zona_id"></avance-zon>


          <div class="row">
            <div class="col-md-8 offset-md-2">
              <!--<h3>Ya entró al sistema</h3>-->
            </div>
          </div>
           
        </div>
        
        
      </div><!-- app -->
     
  </div> <!-- bg -->  
  <!--<footer class="container" style="text-align: center;" > 
      <div v-if="pie">
        <p>&copy; Comisión Federal de Electricidad - Estrategias de Operacion [ EstDop ] V. 1 &middot; <a href="#">Privacidad</a> &middot; <a href="#">Terminos</a></p>
      </div>
  </footer>-->
    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="<?= base_url();?>bootstrap/js/jquery-3.3.1.slim.min.js"></script>
    <!--<script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery-slim.min.js"><\/script>')</script>-->
    <script src="<?= base_url();?>bootstrap/js/polyfill.min.js"></script>
    <script src="<?= base_url();?>bootstrap/js/bootstrap-vue.js"></script>
    <script src="<?= base_url();?>bootstrap/js/axios.js"></script>
    <script src="<?= base_url();?>bootstrap/js/moment.min.js"></script>



    <script src="<?= base_url();?>bootstrap/js/popper.min.js"></script>
    <script src="<?= base_url();?>bootstrap/js/bootstrap.min.js"></script>
    <!-- Just to make our placeholder images work. Don't actually copy the next line! -->
    <script src="<?= base_url();?>bootstrap/js/holder.min.js"></script>
    <!--Instanciamos la aplicación Vue-->
    <!--<script src="<?= base_url();?>bootstrap/js/app/components/zon.js"></script>-->
    <script src="<?= base_url();?>bootstrap/js/app/components/dashboard-nac.js"></script>
    <script src="<?= base_url();?>bootstrap/js/app/components/dashboard-div.js"></script>
    <script src="<?= base_url();?>bootstrap/js/app/components/dashboard-zon.js"></script>
    <script src="<?= base_url();?>bootstrap/js/app/components/estdopz.js"></script>
    <script src="<?= base_url();?>bootstrap/js/app/appestdop.js"></script>

  </body>
</html>
