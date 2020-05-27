var app = new Vue({
    	el: '#app',
    	data: {
    		
    		//Mediante mensaje se crea un enlace de datos entre la pagina web y la app
        	titulo: 'Obras Nacional',
            usuario: {usu_rpe:'',usu_passwd:''},
            logo: 'http://10.14.3.89/obras/bootstrap/images/logo-cfe.png',
            datos_usuario:{},
            login: true,
            altas:false,
            bajas:false,
            modif:false,
            list:false
            
        
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
                            this.login = false;
                            this.usuario = {};


                        }
                        else
                        {
                            alert(resp.mensaje);
                        }
                        //console.log(respuesta.body);
                        //this.valores_metrica = respuesta.body;

                    }
                    else
                    {
                        console.log("No existen registros asociados la métrica indicada");
                    }               
                }, function(){
                    alert('Error al contactar a la API Backend "valida".');
                });

            },

            procesa_opcion: function(opcion){
                console.log('El procesa_opcion');
                switch (opcion) {
                    case 1:
                        this.altas = true;
                        this.bajas = false;
                        this.modif = false;
                        this.list = false;
                        // statements_1
                        break;

                    case 2:
                        this.altas = false;
                        this.bajas = true;
                        this.modif = false;
                        this.list = false;
                        // statements_1
                        break;

                    case 3:

                        this.altas = false;
                        this.bajas = false;
                        this.modif = true;
                        this.list = false;
                        //listtrab();
                        // statements_1
                        break;

                    default:
                        // statements_def
                        break;
                }
             }
             //,

            // altatrab: function(){
            //     //this.trabajador.zona_id=$('#zonas').val();
            //     this.$http.post('index.php/altatrab', this.trabajador).then(function(respuesta){
            //         //console.log(JSON.stringify(respuesta.body[0]));
            //         if(respuesta.body)
            //         {
            //             var resp = {};

            //             resp = respuesta.body;

            //             alert(resp.mensaje);

            //             console.log(resp);
            //         }
            //         else
            //         {
            //             console.log("No existen registros asociados la métrica indicada");
            //         }               
            //     }, function(){
            //         alert('Error al contactar a la API Backend "valida".');
            //     });
            // },

            // bajatrab: function(){

            //     var r = confirm("Realmente desea dar de baja al trabajador?");
            //     if (r == true) {
            //         //alert('Stop');
            //         this.$http.post('index.php/bajatrab', this.trabajador).then(function(respuesta){
            //             //console.log(JSON.stringify(respuesta.body[0]));
            //             if(respuesta.body)
            //             {
            //                 var resp = {};
            //                 resp = respuesta.body;

            //                 alert(resp.mensaje);

            //                 console.log(resp);
            //             }
            //             else
            //             {
            //                 console.log("No existen registros asociados la métrica indicada");
            //             }               
            //         }, function(){
            //             alert('Error al contactar a la API Backend "valida".');
            //         });
            //     } 

            // },

            // mlisttrab: function(){

            //     this.altas = false;
            //     this.bajas = false;
            //     this.modif = false;
            //     this.list = true;
            //     //alert('Hola');

            //     this.$http.get('index.php/listtrab').then(function(respuesta){
            //         //console.log(JSON.stringify(respuesta.body[0]));
            //         if(respuesta.body)
            //         {
            //             //{estatus:1,mensaje:'',datos:[{trab_id:1,},{trab_id:2},...{trab_id:99,}]}
            //             var resp = {};
            //             resp = respuesta.body;

            //             if(resp.estatus)
            //             {
            //                 this.listtrab = resp.datos;
            //             }
            //             else
            //             {
            //                 alert(resp.mensaje);
            //             }

            //             console.log(resp);
            //         }
            //         else
            //         {
            //             console.log("No existen registros asociados la métrica indicada");
            //         }               
            //     }, function(){
            //         alert('Error al contactar a la API Backend "valida".');
            //     });
            // },

            // traetrab: function(){

            //     //var r = confirm("Realmente desea dar de baja al trabajador?");
            //     //if (r == true) {
            //         //alert('Stop');
            //         this.$http.post('index.php/traetrab', this.trabajador).then(function(respuesta){
            //             //console.log(JSON.stringify(respuesta.body[0]));
            //             if(respuesta.body)
            //             {
            //                 var resp = {};
            //                 resp = respuesta.body;

            //                 if(resp.estatus){
            //                     this.trabajador = resp.datos;
            //                 }
            //                 else
            //                 {
            //                     alert(resp.mensaje);
            //                 }

            //                 //alert(resp.mensaje);

            //                 console.log(resp);
            //             }
            //             else
            //             {
            //                 console.log("No existen registros asociados la métrica indicada");
            //             }               
            //         }, function(){
            //             alert('Error al contactar a la API Backend "valida".');
            //         });
            //     //} 

            // },

            // modiftrab: function(){

            //     //var r = confirm("Realmente desea dar de baja al trabajador?");
            //     //if (r == true) {
            //         //alert('Stop');
            //         this.$http.post('index.php/modiftrab', this.trabajador).then(function(respuesta){
            //             //console.log(JSON.stringify(respuesta.body[0]));
            //             if(respuesta.body)
            //             {
            //                 var resp = {};
            //                 resp = respuesta.body;

            //                 if(resp.estatus)
            //                 {
            //                     this.trabajador.trab_id=0;
            //                     this.trabajador.trab_rpe='';
            //                     this.trabajador.trab_nombre='';
            //                     this.trabajador.trab_categ='';
            //                     this.trabajador.trab_tc='';
            //                     this.trabajador.trab_sexo='';
            //                     this.trabajador.trab_fechanac='';
            //                     this.trabajador.zona_id=0;
            //                     $('#consrpe').focus();

            //                 }

            //                 alert(resp.mensaje);

            //                 console.log(resp);
            //             }
            //             else
            //             {
            //                 console.log("No existen registros asociados la métrica indicada");
            //             }               
            //         }, function(){
            //             alert('Error al contactar a la API Backend "valida".');
            //         });
            //     //} 

            // },

            // catzonas: function(){

            //     this.$http.get('index.php/catzonas').then(function(respuesta){
            //         //console.log(JSON.stringify(respuesta.body[0]));
            //         if(respuesta.body)
            //         {
            //             //{estatus:1,mensaje:'',datos:[{trab_id:1,},{trab_id:2},...{trab_id:99,}]}
            //             var resp = {};
            //             resp = respuesta.body;

            //             if(resp.estatus)
            //             {
            //                 this.zonas = resp.datos;
            //             }
            //             else
            //             {
            //                 alert(resp.mensaje);
            //             }

            //             console.log(resp);
            //         }
            //         else
            //         {
            //             console.log("No existen registros asociados la métrica indicada");
            //         }               
            //     }, function(){
            //         alert('Error al contactar a la API Backend "valida".');
            //     });
            // }


        },
        created: function(){
    	   	console.log("Objeto Creado");
        }    

})