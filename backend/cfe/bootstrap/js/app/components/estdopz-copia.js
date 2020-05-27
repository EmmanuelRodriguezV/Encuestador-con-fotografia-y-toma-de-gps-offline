Vue.component('zon-car-est', {
    props : {
        usu_id: [Number,String],
        zona_id: [Number,String]
    },
    data: function () {
        return {
          procesando: false,
          //cmphtml: '',
          //datos_resultados_cpr:[],
          //datos_resultados_actividades:[],
          //divisiones: [],
          //zonas: [],
          eq_atn_cpr:{rc_year:'', rc_mes:'', rc_equipo:''},
          aeqs_atn_cpr:[], //Equipos a los que habrà que darle atención de estrategias para la zona en cuestion
          //rc_id:'118',
          dataExC: [
                        {name: 'Total Circuitos', data: {'Chihuahua':3,'Cuauhtemoc':5,'Juárez':8,'Delicias':3,'Casas Grandes':20,'Torreón':8,'Parral':4,'Durango':9,'Gómez Palacio':11}},
                        {name: 'Circuitos en Atención', data: {'Chihuahua':2,'Cuauhtemoc':3,'Juárez':4,'Delicias':1,'Casas Grandes':10,'Torreón':4,'Parral':2,'Durango':5,'Gómez Palacio':11}},
                        {name: 'Circuitos Atendidos', data: {'Chihuahua':1,'Cuauhtemoc':2,'Juárez':4,'Delicias':2,'Casas Grandes':8,'Torreón':4,'Parral':2,'Durango':4,'Gómez Palacio':0}}                     
                        ],
           dataAvance: {'Circuitos sin atender':80,'Circuitos En atención':90,'Circuitos Atendidos':30}

        }
    },
    // filters: {
    //   capitalize: function (value) {
    //     if (!value) return ''
    //     value = value.toString()
    //     return value.charAt(0).toUpperCase() + value.slice(1)
    //   }
    // },
    
    // filters: { 
    //     formatDate: function(value) {
    //       if (value) {
    //         return moment(String(value)).format('DD/MM/YYYY hh:mm')
    //       }
    //     }
    // },

    //template: '#fn-ver-obras'
    template: `
                <div class="row" >
                    <div class="col-md-12 offset-md-0">
                        
                        <div class="row justify-content-center align-items-center" v-if="procesando"><img src="./bootstrap/img/lg.comet-spinner.gif"></img></div>

                        <legend>CARGA DE ATENCIONES</legend>

                        <!-- FILTROS -->
                        <div class="row">
                                <div class="col-md-12">                                    
                                        <div class="row">
                                            <div class="col-md">
                                                <div class="form-group">
                                                    <label for="bob_year">Año</label>
                                                    <select  class="form-control" id="bob_year" v-model="eq_atn_cpr.rc_year" required>
                                                        <option value="2018">2018</option>
                                                        <option value="2019">2019</option>
                                                        <option value="2020">2020</option>
                                                        <option value="2021">2021</option>
                                                        <option value="2022">2022</option>
                                                        <option value="2023">2023</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md">
                                                <div class="form-group">
                                                    <label for="bob_year">Mes</label>
                                                    <select  class="form-control" id="bob_year" v-model="eq_atn_cpr.rc_mes" required>
                                                        <option value="1">Enero</option>
                                                        <option value="2">Febrero</option>
                                                        <option value="3">Marzo</option>
                                                        <option value="4">Abril</option>
                                                        <option value="5">Mayo</option>
                                                        <option value="6">Junio</option>
                                                        <option value="7">Julio</option>
                                                        <option value="8">Agosto</option>
                                                        <option value="9">Septiembre</option>
                                                        <option value="10">Octubre</option>
                                                        <option value="11">Noviembre</option>
                                                        <option value="12">Diciembre</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="col-md">
                                                <div class="form-group">
                                                    <label for="bob_year">Equipo</label>
                                                    <select  class="form-control" id="bob_year" v-model="eq_atn_cpr.rc_equipo" required>

                                                    </select>
                                                </div>
                                            </div>

                                            <div class="col-md">
                                                <div style="margin-top: 30px;">
                                                    <button type="submit"  class="btn btn-primary" @click="eqs_atn_cpr()">Buscar</button>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </div>

                        <!-- FIN FILTROS -->

                        <!-- GRAFICAS -->
                        <div class="row">
                            <div class="col-md-12 offset-md-0">

                                <div class="row justify-content-center align-items-center" v-if="procesando"><img src="./bootstrap/img/lg.comet-spinner.gif"></img></div>

                                <div class="row">
                                    <div class="col-11">
                                        <legend>CPR - Estrategias por Zona </legend>
                                    </div>
                                    <div class="col no-gutters" >
                                        <button @click="escondead()" class="btn btn-secondary"><span class="fas fa-times"></span></button>
                                    </div>                       
                                    
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <column-chart :data="dataExC" :legend="true"></column-chart>
                                    </div>                            
                                </div>

                                <div class="row" style="padding-top: 40px;">
                                    <div class="col-12">
                                        <legend>CPR - % Avance Total </legend>
                                    </div>                            
                                </div>

                                <div class="row">
                                    <div class="col-6">
                                        <pie-chart :data="dataAvance" :legend="true"></pie-chart>
                                    </div>                            
                                </div>


                            </div>
                        </div>
                        <°-- FIN GRAFICAS -->

                        
                        <div class="row">
                            
                            <legend>Equipos que requieren atención</legend>
                            <div class="col-md-12">

                                <!--<table class="table table-bordered">-->
                                <table class="table table-bordered table-hover table-sm" style="font-size: 12px;">
                                    <caption>Equipos que requieren atención</caption>
                                     <thead class="table-active">
                                        <tr>
                                          <th scope="col" class="text-center">ID</th>
                                          <th scope="col" class="text-center">EQUIPO</th>
                                          <th scope="col" class="text-center">COMPORTAMIENTO</th>
                                          <th scope="col" class="text-center">FECHA</th>
                                          <!--<th scope="col" class="text-center">ACTIVO</th>-->
                                          <th scope="col" class="text-center">ZONA</th>
                                          <th scope="col" class="text-center">FECHA VENCIMIENTO</th>
                                        </tr>
                
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <!-- <td @mouseover="jover()" @mouseleave="liv()">data</td> -->                                                                                        
                                            <tr v-for="det in datos_resultados_cpr">
                                              <td class="text-left">&nbsp;&nbsp;{{det.rc_id}}</td>
                                              <td class="text-center">&nbsp;{{det.rc_equipo}}</td>
                                              <td class="text-right">&nbsp;{{det.rc_comp_equipo}}</td>
                                              <td class="text-left">&nbsp;{{det.rc_fecha}}</td>
                                              <!--<td class="text-right">&nbsp;{{det.rc_inactivo}}
                                                    <input type="radio" v-bind:checked="det.rc_inactivo == 1 ? 'checked' : '' ">
                                              </td> -->
                                              <td class="text-left">&nbsp;{{det.zona_id}}</td>
                                              <td class="text-left">&nbsp;{{det.rc_fecha_venc }}</td>  
                                              
                                            </tr>
                                        </tr>
                                    </tbody>
                                </table>                                
                            </div>
                        </div>
                         <!-- ACTIVIDADES-->
                        <div class="row">
                            
                            <legend>Actividades</legend>
                            <div class="col-md-12">

                                <table class="table table-bordered">
                                    <caption>Equipos que requieren atención</caption>
                                    <thead>
                                        <tr>
                                          <th scope="col" class="text-center">ID</th>
                                          <th scope="col" class="text-center">EQUIPO</th>
                                          <th scope="col" class="text-center">ACCION</th>
                                          <th scope="col" class="text-center">ACTIVIDAD</th>
                                          <th scope="col" class="text-center">FECHA</th>
                                          <th scope="col" class="text-center">FECHA COMPROMISO</th>
                                          <th scope="col" class="text-center">FECHA VENCIMIENTO</th>
                                        </tr>                
                                    </thead>
                                    <tbody>                                        
                                            <tr v-for="det in datos_resultados_actividades">                        
                                              <td class="text-left">&nbsp;&nbsp;{{det.rc_id}}</td>
                                              <td class="text-center">&nbsp;{{det.rc_equipo}} {{det.rc_comp_equipo}}</td>
                                              <td class="text-right">&nbsp;{{det.acc_descrip}}</td>
                                              <td class="text-left">&nbsp;{{det.act_descrip}}</td>
                                              <td class="text-right">&nbsp;{{det.ac_tsc}}</td>
                                              <td class="text-left">&nbsp;{{det.ac_tst}}</td>
                                              <td class="text-left">&nbsp;{{det.rc_fecha_venc}}</td>                                              
                                            </tr>                                        
                                    </tbody>
                                </table>                                
                            </div>
                        </div>                        
                        <!-- FIN ACTIVIDADES-->


                     <!--   <div class="row">
                            <template>
                              <b-table striped hover :items="datos_resultados_cpr" :fields="encabezados"></b-table>
                            </template>
                        </div> -->
                     <!--   <div class="row">
                            <legend>Resultados Compensación de Potencia Reactiva</legend>
                            <div class="col-md-12" v-html="cmphtml">

                            </div>
                        </div>-->

                    </div>
                </div>
               

                `,
    methods: {

        escondead: function(){
            console.log('Aquiii');
            // app.perfil.fn.wfn = false; //Esconde componente WorkFlow Nacional
            // app.perfil.en.wen = false;
        },

        test: function() {
            alert(this.usu_id);
        },

        jover : function(){
            console.log('MouseOver');
        },

        liv : function(){
            console.log('MouseLeave');
        },

        eqs_atn_cpr: function(){

            ero = this;
            axios.post('index.php/zon/eqs_atn_cpr', {usu_id: this.usu_id, zona_id: this.zona_id}).then(function (res) {

                    
                    //console.log(res.data);

                    if(res.data)
                    {
                        var resp = {};
                        resp = res.data;
                        console.log(resp); 
                        if(resp.estatus)
                        {
                            //ero.procesando = false;
                            //store.commit('llena_solpre',resp.datos);
                            ero.eqs_atn_cpr =  resp.datos;
                            console.log('Datos traidos');
                        }
                        else
                        {
                            //ero.procesando = false;
                            alert(resp.mensaje);
                        }  
                    }
                    else
                    {
                        //ero.procesando = false;
                        console.log("No se pudo obtener el mensaje asociado a la acción.");
                    }              
                    console.log(res.data);
                })
                .catch(function (err) {
                    //ero.procesando = false;
                    console.log(err.message);
                });
        }

        // trae_resultados_cpr: function(){
        //     //console.log(ob_id);
        //     //this.procesando = true;
        //     //alert(this.zona_id);
        //     this.$http.post('index.php/estdopz/trae_resultados_cpr', {usu_id: this.usu_id, zona_id: this.zona_id}).then(function(respuesta){
        //         //console.log(JSON.stringify(respuesta.body[0]));
        //         if(respuesta.body)
        //         {
        //             var resp = {};
        //             resp = respuesta.body;

        //             console.log(resp);
        //             this.cmphtml = resp
        //             this.datos_resultados_cpr =  resp.datos;
        //             //this.rc_id = resp.datos.rc_id;

        //             // if(resp.estatus)
        //             // {
                        
        //             //     //this.traeobras(this.usu_id);

        //             // }
        //             // else
        //             // {
        //             //     alert(resp.mensaje);
        //             // }
        //             //console.log(respuesta.body);
        //             //this.valores_metrica = respuesta.body;

        //         }
        //         else
        //         {
        //             console.log("No existen registros asociados la métrica indicada");
        //         }
        //     }, function(){
        //         alert('Error al contactar a la API Backend "valida".');
        //     });
        // }
        // trae_resultados_act: function(){
        //     //console.log(ob_id);
        //     //this.procesando = true;
        //     //alert(this.zona_id);
        //     this.$http.post('index.php/estdopz/trae_resultados_act', {usu_id: this.usu_id, rc_id: this.rc_id}).then(function(respuesta){
        //         //console.log(JSON.stringify(respuesta.body[0]));
        //         if(respuesta.body)
        //         {
        //             var resp = {};
        //             resp = respuesta.body;

        //             console.log(resp);
        //             this.cmphtml = resp
        //             this.datos_resultados_actividades =  resp.datos;

        //             // if(resp.estatus)
        //             // {
                        
        //             //     //this.traeobras(this.usu_id);

        //             // }
        //             // else
        //             // {
        //             //     alert(resp.mensaje);
        //             // }
        //             //console.log(respuesta.body);
        //             //this.valores_metrica = respuesta.body;

        //         }
        //         else
        //         {
        //             console.log("No existen registros asociados la métrica indicada");
        //         }
        //     }, function(){
        //         alert('Error al contactar a la API Backend "valida".');
        //     });
        // }

        // res_cpr: function(){
        //     //console.log(ob_id);
        //     //this.procesando = true;
        //     this.$http.post('index.php/estdop/res_cpr', {usu_id: this.usu_id}).then(function(respuesta){
        //         //console.log(JSON.stringify(respuesta.body[0]));
        //         if(respuesta.body)
        //         {
        //             var resp = {};
        //             resp = respuesta.body;

        //             console.log(resp);
        //             this.cmphtml = resp

        //             // if(resp.estatus)
        //             // {
                        
        //             //     //this.traeobras(this.usu_id);

        //             // }
        //             // else
        //             // {
        //             //     alert(resp.mensaje);
        //             // }
        //             //console.log(respuesta.body);
        //             //this.valores_metrica = respuesta.body;

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
    mounted: function(){

        
        console.log('Resultados CPR Montado');
        //Catalogo de Divisiones
 

        this.eqs_atn_cpr();
        //this.trae_resultados_act(this.usu_id);
        //GRAFICAS
        //ero = this;
        //De entrada al montar el componente vamos y traemos las solicitudes pendientes o en atención via ajax
        // axios.post('index.php/div/infodash/', {div_id:this.div_id}).then(function (res) {

                
        //         //console.log(res.data);

        //         if(res.data)
        //         {
        //             var resp = {};
        //             resp = res.data;
        //             console.log(resp); 
        //             if(resp.estatus)
        //             {
        //                 //ero.procesando = false;
        //                 //store.commit('llena_solpre',resp.datos);
        //                 ero.dataExC = resp.datos;
        //                 console.log('Datos traidos');
        //             }
        //             else
        //             {
        //                 //ero.procesando = false;
        //                 alert(resp.mensaje);
        //             }  
        //         }
        //         else
        //         {
        //             //ero.procesando = false;
        //             console.log("No se pudo obtener el mensaje asociado a la acción.");
        //         }              
        //         console.log(res.data);
        //     })
        //     .catch(function (err) {
        //         //ero.procesando = false;
        //         console.log(err.message);
        //     });
        //GRAFICAS

        // this.$http.get('index.php/cat/obtdivs').then(function(respuesta){
        //     //console.log(JSON.stringify(respuesta.body[0]));
        //     if(respuesta.body)
        //     {
        //         var resp = {};
        //         resp = respuesta.body;
        //         console.log(resp);
        //         if(resp.estatus)
        //         {
        //             this.divisiones = resp.datos;
        //         }
        //         else
        //         {
        //             alert(resp.mensaje);
        //         }
        //     }
        //     else
        //     {
        //         console.log("No existen registros de divisiones");
        //     }
        // }, function(){
        //     alert('Error al contactar a la API Backend "valida".');
        // });
    }

})