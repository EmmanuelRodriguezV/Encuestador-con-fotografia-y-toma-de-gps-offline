<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
//Prueba
$route['default_controller'] = 'cfeencuesta';
//Sincroniza encuestas via GET
$route['sinc_encuestas']['GET'] = 'cfeencuesta/sinc_encuestas';
//Almacena resultados de encuesta
$route['alm_res_encuesta']['POST'] = 'cfeencuesta/alm_res_encuesta';

/*  

//Pruebas con el servidor de PQ
$route['obt_cpr/(:any)']['GET'] = 'estdop/obt_cpr/$1';
$route['genera_cpr/(:any)']['GET'] = 'estdop/genera_cpr/$1';

//Nacional
$route['nac/infodash']['POST'] = 'estdopn/infodash';

//Divisional
$route['div/infodash']['POST'] = 'estdopd/infodash';
$route['div/actxdiv']['POST'] = 'estdopd/actxdiv';


//Zona
$route['zon/eqs_atn_cpr']['POST'] = 'estdopz/eqs_atn_cpr';
$route['zon/act_cpr']['POST'] = 'estdopz/act_cpr';
$route['zon/infodash']['POST'] = 'estdopz/infodash';
$route['zon/agrega_act_cpr']['POST'] = 'estdopz/agrega_act_cpr';
$route['zon/act_cpr_eq']['POST'] = 'estdopz/act_cpr_eq';
$route['zon/cierre_act_cpr']['POST'] = 'estdopz/cierre_act_cpr';
$route['zon/muestra_act']['POST'] = 'estdopz/muestra_act';
$route['zon/actxzona']['POST'] = 'estdopz/actxzona';





$route['estdop/res_cpr']['POST'] = 'estdop/res_cpr'; 
//Carga Actividades
$route['estdopz/trae_resultados_cpr']['POST'] = 'estdopz/trae_resultados_cpr'; 
$route['estdopz/trae_resultados_act']['POST'] = 'estdopz/trae_resultados_act'; 
//Catalogos
$route['cat/obtdivs']['GET'] = 'cat/obtdivs';
$route['cat/obtzonas/(:num)']['GET'] = 'cat/obtzonas/$1';
//Catalogos

//Carga Actividades

$route['prueba'] = 'test/prueba';
$route['pruebaw/(:any)'] = 'test/pruebaw/$1';
$route['pruebawo'] = 'test/pruebawo';
$route['pruebawin'] = 'test/pruebawin';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;

*/
