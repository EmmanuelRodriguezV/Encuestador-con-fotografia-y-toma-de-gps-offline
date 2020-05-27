var app = new Vue({
    	el: '#app',
    	data: {
    		
    		//Mediante mensaje se crea un enlace de datos entre la pagina web y la app
        	titulo: 'Estrategias de la Dirección de Operación',
            usuario: {usu_rpe:'',usu_passwd:''},
            // usuario: {usu_rpe:'22222',usu_passwd:'2'},
            logo: 'http://10.14.1.72/estdop2dev/bootstrap/images/logo-cfe.png',
            datos_usuario:{},
            perfil : {
                nac:{activo:false, dash_nac:false},
                div:{activo:false, dash_div:false},
                zon:{activo:false,res_cpr:false, carga_est_cpr: false, car_est: false, dash_zon:false}
            },
            login: true,
            pie: true
            
        
    	},
    	methods: {
    		valida: function(){
                //Mandamos los datos del usuario al backend
                console.log('Metodo valida Ejecutado');
                this.$http.post('index.php/valida', this.usuario).then(function(respuesta){
                    //console.log(JSON.stringify(respuesta.body[0]));
                    if(respuesta.body)
                    {
                        var resp = {};
                        resp = respuesta.body;
                        console.log(resp);

                        if(resp.estatus)
                        {
                            this.datos_usuario = resp.datos;
                            this.login = false; //Ya no está en la pantalla de login
                            this.pie = false;

                            switch (resp.datos.usu_nivel) {
                                case '1':
                                    this.perfil.nac.activo = true;
                                    this.perfil.nac.dash_nac = true;
                                    break;
                                case '2':
                                    this.perfil.div.activo = true;
                                    this.perfil.div.dash_div = true;
                                    break;                               
                                case '3':
                                    this.perfil.zon.activo = true;
                                    this.perfil.zon.dash_zon = true;
                                    break;
                                default:
                                    // statements_def
                                    break;
                            }
                            if(resp.datos.usu_nivel == 3)
                            {
                                this.perfil.zon.activo = true; //Poner un switch
                            }
                            else
                            {

                            }

                            this.usuario = {};
                        }
                        else
                        {
                            alert(resp.mensaje);
                        }
                    }
                    else
                    {
                        console.log("No existen registros asociados la métrica indicada");
                    }               
                }, function(){
                    alert('Error al contactar a la API Backend "valida".');
                });

            },

            salir: function(){
                console.log('Saliendo Yaaaa!!');
                //location.href = 'http://10.14.1.72/estdopdev/';
                location.href = 'http://10.14.1.72/estdopn/';
                //location.href = 'http://10.4.22.212/obrasnac/';
                //alert('Saliiir');
                // this.$http.post('index.php/salir', this.datos_usuario).then(function(respuesta){
                //     //console.log(JSON.stringify(respuesta.body[0]));
                //     if(respuesta.body)
                //     {
                //         var resp = {};
                //         resp = respuesta.body;

                //         console.log(resp);

                //         if(resp.estatus)
                //         {
                //             //this.datos_usuario = resp.datos;
                //             window.location = 'http://10.14.3.89/obrasnacdev/index.php';
                //             //location.href = 'http://10.14.3.89/obrasnacdev/index.php';
                //             //this.login = true;
                //             //this.perfil.fn.activo = true;
                //             //this.usuario = {};


                //         }
                //         else
                //         {
                //             console.log(resp.mensaje);
                //         }
                //         //console.log(respuesta.body);
                //         //this.valores_metrica = respuesta.body;

                //     }
                //     else
                //     {
                //         console.log("No existen registros asociados la métrica indicada");
                //     }
                // }, function(){
                //     alert('Error al contactar a la API Backend "valida".');
                // });
                //this.login = true;
            },

            procesa_opcion: function(opcion){
                console.log('El procesa_opcion');
                switch (opcion) {
                    case 31:
                        console.log('31');
                        this.perfil.zon.dash_zon = true;
                        this.perfil.zon.car_est = false;
                        //this.perfil.zon.res_cpr = true;
                        //this.perfil.zon.carga_est_cpr = false;
                        // statements_1
                        break;
                    case 32:
                        console.log('32');                        
                        this.perfil.zon.car_est = true;                        
                        this.perfil.zon.res_cpr = false;
                        this.perfil.zon.carga_est_cpr = false;
                        this.perfil.zon.dash_zon = false;
                        // statements_1
                        break;
                    case 21:
                        console.log('21');
                        this.perfil.div.dash_div = true;
                        // statements_1
                        break;
                    case 11:
                        console.log('11');
                        this.perfil.nac.dash_nac = true;
                        // statements_1
                        break; 
                    default:
                        // statements_def
                        break;
                }
             }
        },
        created: function(){
    	   	console.log("Objeto Creado");
        },

        mounted: function(){
            document.getElementById("usuario").focus();
        }   

})