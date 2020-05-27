
//Componente WorkFlow
Vue.component('avance-nac', {
    props : {
        usu_id: [Number,String],
        div_id : [Number,String],
        zona_id : [Number,String]
    },
    data: function () {
        return {
            dato:'',
            procesando: false,
            tablaactiv: false,
            tablatd: false,
            data_circ: [],
            data_totales: [],
            data_act_avance: [],
            data_actividades: [],
            datos_filtro:{rc_year:'', rc_mes:''},

            fields_data_tablanac : [
                                        {
                                          key: 'index',
                                          sortable: false,
                                          label: 'Consec.'
                                        },
                                        {
                                          key: 'div_nombre',
                                          sortable: true
                                        },
                                        {
                                          key: 'total_eq',
                                          sortable: true
                                        },
                                        {
                                          key: 'sin_atender',
                                          sortable: true
                                        },
                                        {
                                          key: 'en_atencion',
                                          sortable: true
                                        },
                                        {
                                          key: 'atendidos',
                                          sortable: true
                                        },
                                    ],

            fields_data_tabladiv : [
                                        {
                                          key: 'index',
                                          sortable: false,
                                          label: 'Consec.'
                                        },
                                        {
                                          key: 'zona_nombre',
                                          sortable: true
                                        },
                                        {
                                          key: 'total_eq',
                                          sortable: true
                                        },
                                        {
                                          key: 'sin_atender',
                                          sortable: true
                                        },
                                        {
                                          key: 'en_atencion',
                                          sortable: true
                                        },
                                        {
                                          key: 'atendidos',
                                          sortable: true
                                        },
                                    ],


            data_tabladiv: [],
            data_tablanac: [],
            zona_res_act:'',
            div_res_eq:'',

        }
    },
    //template: '#fn-agregar-obras'
    template: `
                <div class="row">
                    <div class="col-md-12 offset-md-0">

                        <div class="row justify-content-center align-items-center" v-if="procesando"><img src="./bootstrap/img/lg.comet-spinner.gif"></img></div>

                        <div class="row">
                            <div class="col-11">
                                <legend>CPR - Estrategias Nacional </legend>
                            </div>
                            <div class="col no-gutters" >
                               <!-- <button @click="esconde_dash()" class="btn btn-secondary"><span class="fas fa-times"></span></button> -->
                            </div>                       
                            
                        </div>

                        <div class="row">
                            <div class="col-md">
                                <form @submit.prevent="actualiza_dash()" action="index.php" method="post"><!--Filtrar Catalogo de Inversiones-->
                                    <div class="row">

                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label for="rc_year">Año</label>
                                                <select  class="form-control" id="rc_year" v-model="datos_filtro.rc_year" required>
                                                    <option selected value="2018">2018</option>
                                                    <option value="2019">2019</option>
                                                    <option value="2020">2020</option>
                                                    <option value="2021">2021</option>
                                                    <option value="2022">2022</option>
                                                    <option value="2023">2023</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label for="rc_mes">Mes</label>
                                                <select  class="form-control" id="rc_mes" v-model="datos_filtro.rc_mes" required>
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
                                                    <option selected value="11">Noviembre</option>
                                                    <option value="12">Diciembre</option>
                                                </select>
                                            </div>
                                        </div>


                                        <!--<div class="col-md">
                                            <div class="form-group">
                                                <label for="bdiv_id">División</label>
                                                <select  class="form-control" id="bdiv_id" v-model="dbinv.div_id" required>
                                                    <option v-for="div in divisiones" v-bind:value="div.div_id">{{div.div_nombre}}</option>
                                                </select>
                                            </div>
                                        </div>-->

                                        <div class="col-md">
                                            <div style="margin-top: 30px;">
                                                <button type="submit"  class="btn btn-primary">Actualizar</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <!--<column-chart :data="data_circ" :legend="true" :download="true"></column-chart>-->
                                <column-chart :data="data_circ" :legend="true" :download="true" :colors="['#ad296f', '#d30a0a', '#dbd00a', '#0ccc48']"></column-chart>
                            </div>                            
                        </div>

                        <!--<div class="row" style="padding-top: 40px;">
                            <div class="col-12">
                                <legend>CPR - % Avance Total </legend>
                            </div>                            
                        </div>-->

                        <div class="row" style="padding-top: 40px;">
                            <div class="col-md-6 offset-md-3">
                                <pie-chart :data="data_totales" :legend="true"  :download="true" :colors="['#d30a0a', '#dbd00a', '#0ccc48']"></pie-chart>
                            </div>                            
                        </div>


                        <div class="row" style="padding-top: 40px;">
                            <div class="col-12">
                                <div id="tablatn" class="row" style="padding-top: 40px;" >
                                    <div class="col-12">
                                        <template>
                                          <b-table striped hover small :items="data_tablanac" :fields="fields_data_tablanac" caption-top>
                                            <template slot="table-caption">
                                              TOTAL CIRCUITOS POR DIVISIÓN
                                            </template>
                                            <template slot="index" slot-scope="data">
                                              <div class="text-center">{{data.index + 1}}</div>
                                            </template>
                                            <template slot="div_nombre" slot-scope="data">
                                              <a :href="'#tablatd'" @click.stop="actxdiv(data.item)">
                                                {{data.value}}
                                              </a>
                                            </template>
                                          </b-table>
                                        </template>
                                    </div>
                                </div> 

                                <div id="tablatd" v-if="tablatd" class="row" style="padding-top: 40px;" >
                                    <div class="col-12">
                                        <template>
                                          <b-table striped hover small :items="data_tabladiv" :fields="fields_data_tabladiv" caption-top>
                                            <template slot="table-caption">
                                              TOTAL CIRCUITOS POR ZONA - DIVISIÓN {{div_res_eq}}
                                            </template>
                                            <template slot="index" slot-scope="data">
                                              <div class="text-center">{{data.index + 1}}</div>
                                            </template>
                                            <template slot="zona_nombre" slot-scope="data">
                                              <a :href="'#tablaactiv'" @click.stop="actxzona(data.item)">
                                                {{data.value}}
                                              </a>
                                            </template>
                                          </b-table>
                                        </template>
                                    </div>
                                </div>

                                <div class="row" id="tablaactiv" v-if="tablaactiv"  style="padding-top: 40px;">
                                    <div class="col-12">
                                        <table class="table table-bordered table-hover table-sm">
                                            <caption style="caption-side: top;">RESUMEN ACTIVIDADES ZONA {{zona_res_act}}</caption>
                                            <thead class="table-primary">
                                                <tr class="text-center"> 
                                                    <td>Cons.</td>
                                                    <td>Equipo</td>
                                                    <td>Estado</td>
                                                    <td>Activ. Totales</td>
                                                    <td>Activ. Terminadas</td>
                                                    <td>%Avance</td>
                                                    
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(act, index) in data_act_avance" v-bind:style="act.bg">
                                                    <td class="text-center">{{index + 1}}</td>
                                                    <td>{{act.rc_equipo}}</td>
                                                    <td>{{act.rc_nomestatus}}</td>
                                                    <td class="text-center"><a href="#tablaactiv" v-b-modal="'modal-det-act'" @click="muestra_act(1,act.rc_id)" >{{act.act_totales}}</a></td>
                                                    <td class="text-center">{{act.act_completas}}</td>
                                                    <td class="text-center">{{act.act_avance}}</td>
                                                </tr>

                                            </tbody>
                                        </table>                                        
                                    </div>
                                </div> 

                                <div class="row">
                                    <b-modal id="modal-det-act" size="lg" title="Detalle Actividades" centered>
                                          <div class="row">
                                              <div class="col-md-12 offset-md-0">                  
                                                  <div class="row">  
                                                      <div class="col-md-12">
                                                        <div id="tablaact"  style="margin-top: 20px;">
                                                            <div class="row">
                                                                <div class="col-12">
                                                                    <table class="table table-bordered table-hover table-sm" style="font-size: 10px;">
                                                                        <thead class="table-primary">
                                                                            <tr class="text-center">
                                                                                
                                                                                <td>Cons.</td>
                                                                                <td>Zona</td>
                                                                                <td>Equipo</td>
                                                                                <td>Actividad</td>
                                                                                <td>Alta Actividad</td>
                                                                                <td>Compromiso Actividad</td>
                                                                                <td>Anexos</td>
                                                                                <td>Comentarios</td>
                                                                                
                                                                                <td>Estado</td>



                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr v-for="(act, index) in data_actividades">
                                                                                <td>{{index + 1}}</td>
                                                                                <td>{{act.zona_nombre}}</td>
                                                                                <td>{{act.rc_equipo}}</td>
                                                                                <td>{{act.act_descrip}}</td>
                                                                                <td>{{act.ac_tsc}}</td>
                                                                                <td>{{act.ac_fec_atn}}</td>
                                                                                <td>
                                                                                    <strong style="text-decoration: underline;">Anexo Carga</strong>
                                                                                    <br>
                                                                                    <a v-bind:href="act.aac_url" target="_blank">{{act.aac_ruta}}</a>
                                                                                    <br>
                                                                                    <strong style="text-decoration: underline;">Anexo Fin.</strong>
                                                                                    <br>
                                                                                    <a v-bind:href="act.aacc_url" target="_blank">{{act.aacc_ruta}}</a>
                                                                                </td>
                                                                                <td>
                                                                                    <strong style="text-decoration: underline;">Obs. Carga</strong>
                                                                                    <br>
                                                                                    {{act.aac_observ}}
                                                                                    <br>
                                                                                    <strong style="text-decoration: underline;">Obs. Fin</strong>
                                                                                    <br>
                                                                                    {{act.aacc_observ}}
                                                                                </td>
                                                                                <td>{{act.estatus}}</td>                                                              

                                                                            </tr>

                                                                        </tbody>
                                                                    </table>                                        
                                                                </div>
                                                            </div>

                                                        </div>
                                                      </div>
                                                  </div>                     
                                                  <div class="row">  
                                                      <div class="col-md-12">
                                                        <p></p>
                                                      </div>
                                                  </div>                      

                                              </div>
                                          </div>
                                    </b-modal> 
                                </div>


                            </div>
                        </div>                        


                    </div>
                </div>
                
                `,
    methods: {


        esconde_dash: function(){
            console.log('Aquiii');
            app.perfil.nac.dash_nac = false;
            // app.perfil.fn.wfn = false; //Esconde componente WorkFlow Nacional
            // app.perfil.en.wen = false;
        },

        actxdiv : function(item){

            //console.log(JSON.stringify(item));

            if(item.div_id != -1)
            {

                this.tablatd = true;
                this.div_res_eq = item.div_nombre;
                ero = this;
                //De entrada al montar el componente vamos y traemos las solicitudes pendientes o en atención via ajax
                axios.post('index.php/div/infodash/', {div_id:item.div_id, rc_year:this.datos_filtro.rc_year, rc_mes:this.datos_filtro.rc_mes}).then(function (res) {

                        
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
                                //ero.data_circ = resp.datos;
                                //ero.data_totales = resp.totales;
                                ero.data_tabladiv = resp.tabladiv;
                                ero.tablaactiv = false;
                                

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
                console.log(item);
                //alert(JSON.stringify(item));                
            }

        },

        actxzona : function(item){
            if(item.zona_id != -1)
            {

                this.tablaactiv = true;
                this.zona_res_act = item.zona_nombre;
                ero = this;
                //De entrada al montar el componente vamos y traemos las solicitudes pendientes o en atención via ajax
                axios.post('index.php/zon/actxzona/', {zona_id:item.zona_id, rc_year:this.datos_filtro.rc_year, rc_mes:this.datos_filtro.rc_mes}).then(function (res) {

                        
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
                                ero.data_act_avance = resp.datos;
                                ero.tablaactiv = true;

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
                console.log(item);
                //alert(JSON.stringify(item));                
            }

        },

        actualiza_dash: function(){
            //console.log('Montado WF ' + this.estatus_obras);
            ero = this;
            //De entrada al montar el componente vamos y traemos las solicitudes pendientes o en atención via ajax
            axios.post('index.php/nac/infodash/', {div_id:this.div_id, zona_id:this.zona_id, rc_year:this.datos_filtro.rc_year, rc_mes:this.datos_filtro.rc_mes}).then(function (res) {

                    
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
                            ero.data_circ = resp.datos;
                            ero.data_totales = resp.totales;
                            ero.data_tablanac = resp.tablanac;
                            ero.tablaactiv = false;
                            ero.tablatd = false;
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
            
        },

        muestra_act: function(tipo,rc_id){
            console.log(tipo + '--' + rc_id);

            ero = this;
            //De vamos y traemos las actividades relacionadas del rc_id si el tipo es 1 entonces traemos todas las actividades, si es 2 traemos las completas
            axios.post('index.php/zon/muestra_act/', {rc_id:rc_id, act_tipo:tipo}).then(function (res) {

                    
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
                            ero.data_actividades = resp.datos;
                            console.log('Datos traidos');
                        }
                        else
                        {
                            //ero.procesando = false;
                            ero.data_actividades = [];
                            //alert(resp.mensaje);
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

        },






    },
    mounted: function(){

        this.datos_filtro.rc_year = moment().format('YYYY');
        this.datos_filtro.rc_mes = moment().format('M');

        if(this.datos_filtro.rc_mes === '1')
        {
            this.datos_filtro.rc_year--;
            this.datos_filtro.rc_mes = '12';
        }
        else
        {
            this.datos_filtro.rc_mes--;
        }

        this.actualiza_dash();        
        //console.log('Montado WF ' + this.estatus_obras);
    //     ero = this;
    //     //De entrada al montar el componente vamos y traemos las solicitudes pendientes o en atención via ajax
    //     axios.post('index.php/div/infodash/', {div_id:this.div_id}).then(function (res) {

                
    //             //console.log(res.data);

    //             if(res.data)
    //             {
    //                 var resp = {};
    //                 resp = res.data;
    //                 console.log(resp); 
    //                 if(resp.estatus)
    //                 {
    //                     //ero.procesando = false;
    //                     //store.commit('llena_solpre',resp.datos);
    //                     ero.dataExC = resp.datos;
    //                     console.log('Datos traidos');
    //                 }
    //                 else
    //                 {
    //                     //ero.procesando = false;
    //                     alert(resp.mensaje);
    //                 }  
    //             }
    //             else
    //             {
    //                 //ero.procesando = false;
    //                 console.log("No se pudo obtener el mensaje asociado a la acción.");
    //             }              
    //             console.log(res.data);
    //         })
    //         .catch(function (err) {
    //             //ero.procesando = false;
    //             console.log(err.message);
    //         }); 


    }

})