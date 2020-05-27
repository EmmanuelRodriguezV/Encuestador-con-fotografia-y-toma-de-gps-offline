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
          eq_atn_cpr:{rc_year:'', rc_mes:'', rc_id:'', act_id:'', aac_observ:'', ac_fec_atn:''},
          ocierre_ae: {ac_id:'', rc_id:'' ,aac_observ:'',act_descrip:''},
          aeqs_atn_cpr:[], //Equipos a los que habrà que darle atención de estrategias para la zona en cuestion
          actividades_cpr:[],
          actividades_cpr_carg:[],


          //Booleanos
          cae: false,
          tablaact:false,
          cierre_ae: false,
          btn_agr_act: false

          //Fin Booleanos


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

                            <div class="row">
                                <div class="col-11">
                                    <legend>Carga de Estrategias</legend>
                                </div>
                                <div class="col no-gutters" >
                                    <button @click="esconde_car_est()" class="btn btn-secondary"><span class="fas fa-times"></span></button>
                                </div>                          
                            
                            </div> 

                        <!-- FILTROS -->
                            <div class="row">
                                <div class="col-md-12">                                    
                                        <div class="row">
                                            <div class="col-3">
                                                <div class="form-group">
                                                    <label for="bob_year">Año</label>
                                                    <select  class="form-control" id="rc_year" v-model="eq_atn_cpr.rc_year" required>
                                                        <option value="">Seleccione</option>
                                                        <option value="2018">2018</option>
                                                        <option value="2019">2019</option>
                                                        <option value="2020">2020</option>
                                                        <option value="2021">2021</option>
                                                        <option value="2022">2022</option>
                                                        <option value="2023">2023</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-3">
                                                <div class="form-group">
                                                    <label for="bob_year">Mes</label>
                                                    <select  class="form-control" id="rc_mrs" v-model="eq_atn_cpr.rc_mes" @change="eqs_atn_cpr()" required>
                                                        <option value="">Seleccione</option>
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

                                            <div class="col-4">
                                                <div class="form-group">
                                                    <label for="bob_year">Equipo</label>
                                                    <select  class="form-control" id="rc_equipo" v-model="eq_atn_cpr.rc_id" @change="act_cpr_eq()" required>
                                                        <option v-for="eq in aeqs_atn_cpr" v-bind:value="eq.rc_id">{{eq.rc_equipo}} - {{eq.rc_comp_equipo}} - {{eq.rc_estatus_str}}</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="col-2">
                                                <div style="margin-top: 30px;">
                                                    <button type="submit"  class="btn btn-primary" @click="carga_act_est()" v-if="btn_agr_act">Actividades</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div  v-if="cae">
                                            <form @submit.prevent="agrega_act_cpr()" action="index.php" method="post">

                                                <div class="row">
                                                    <div class="col-md-9">
                                                        <div class="form-group">
                                                            <label for="act_descrip">Actividades</label>
                                                            <select  class="form-control" id="act_descrip" v-model="eq_atn_cpr.act_id" required>
                                                                <option v-for="act in actividades_cpr" v-bind:value="act.act_id">{{act.act_descrip}}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2">

                                                        <div class="form-group">
                                                            <label for="act_descrip">Fecha limite atención</label>
                                                            <input type="date" class="form-control" id="rc_fecha_venc" v-model="eq_atn_cpr.ac_fec_atn" required/>
                                                        </div>

                                                    </div>                                            

                                                </div>

                                                <div class="row">

                                                    <div class="col-4">
                                                        <div class="form-group">
                                                            <label for="ob_descpago">Observación</label>
                                                            <textarea class="form-control" id="rc_observa"  v-model="eq_atn_cpr.aac_observ" rows="3" required></textarea>
                                                        </div>
                                                    </div>

                                                    <div class="col-8">
                                                        <div class="form-group">
                                                            <label for="doc_ruta">Anexo</label>
                                                            <input type="file" class="form-control input-file" id="doc_ruta" name="doc_ruta" accept="application/pdf" required>
                                                            <!--<input type="file" multiple :name="uploadFieldName" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="image/*" class="input-file">-->
                                                            <!--<input type="file" id="doc_ruta" name="doc_ruta" class="input-file" @change="docoficio($event.target.name, $event.target.files[0]);" required>-->
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col no-gutters">
                                                        <div style="margin-top: 15px;">
                                                            <button  class="btn btn-primary" type="submit">Agregar Actividad</button>
                                                            <button  class="btn btn-danger" type="button" @click="cancela_act()">Cancelar</button>
                                                        </div>
                                                    </div>

                                                </div>

                                            </form>
                                        </div> <!-- v-if -->

                                        <div id="tablaact" v-if="tablaact" style="margin-top: 20px;">
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
                                                                <!--<td>Seguimiento</td>-->
                                                                <td>Finalizar</td>



                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="(act, index) in actividades_cpr_carg">
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
                                                                <!--<td><button class="btn btn-success btn-sm" @click="">+</button></td>-->
                                                                <td><button class="btn btn-success btn-sm" @click="mos_cierre_ae(act.ac_id, act.act_descrip, act.rc_id)" v-bind:disabled="act.btn2_cierre">Fin Act.</button></td> <!--mostrar el firmulario para el cierre de actividd-->                                                               
                                                                <!--<td class="text-center" v-html="obra.doc_ruta"></td>-->
                                                                <!--<td class="text-center"><span :title="obra.ceo_descrip + ' ' + obra.perf_nombre">{{obra.ceo_descab}}</span></td>-->
                                                                <!--<td><button class="btn btn-success btn-sm" @click="enviarobraaed(obra.ob_id,obra.ceo_id,obra.ceo_orden,obra.inv_id)"><span class="fas fa-arrow-circle-right"></span></button></td>-->
                                                                <!--<td><button class="btn btn-success btn-sm" @click="fapsol(obra.ob_id)" v-bind:disabled="obra.btn_apsol" v-bind:disabled="obra.btn_apsol">Aprobar/Desaprobar</button></td>-->
                                                            </tr>

                                                        </tbody>
                                                    </table>                                        
                                                </div>
                                            </div>

                                        </div> <!--tablaact-->

                                        <div  v-if="cierre_ae">

                                            <div class="row">
                                                <div class="col-11">
                                                    <legend>Cierre de Actividad</legend>
                                                </div>
                                                <div class="col no-gutters" >
                                                    <button @click="esconde_cierre_act()" class="btn btn-secondary"><span class="fas fa-times"></span></button>
                                                </div>                          
                                            
                                            </div>                                         
                                            <form @submit.prevent="cierre_act_cpr()" action="index.php" method="post">
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="form-group">
                                                            <label for="act_descrip">Actividad</label>
                                                            <input class="form-control" id="ac_res_term"  v-model="ocierre_ae.act_descrip" disabled></input>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div class="row">
                                                    <div class="col-6">
                                                        <div class="form-group">
                                                            <label for="aac_observ">Resumen</label>
                                                            <textarea class="form-control" id="aac_observ"  v-model="ocierre_ae.aac_observ" rows="3" required></textarea>
                                                        </div>
                                                    </div>

                                                    <div class="col-6">
                                                        <div class="form-group">
                                                            <label for="doc_ruta">Anexo</label>
                                                            <input type="file" class="form-control input-file" id="doc_ruta_cierre" name="doc_ruta_cierre" accept="application/pdf" required>
                                                            <!--<input type="file" multiple :name="uploadFieldName" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="image/*" class="input-file">-->
                                                            <!--<input type="file" id="doc_ruta" name="doc_ruta" class="input-file" @change="docoficio($event.target.name, $event.target.files[0]);" required>-->
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col no-gutters">
                                                        <div style="margin-top: 15px;">
                                                            <button  class="btn btn-primary" type="submit">Cerrar Actividad</button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </form>
                                        </div> <!-- v-if -->


                                </div>
                            </div>

                        <!-- FIN FILTROS -->

                    </div>
                </div>
               

                `,
    methods: {

        escondead: function(){
            console.log('Aquiii');
            // app.perfil.fn.wfn = false; //Esconde componente WorkFlow Nacional
            // app.perfil.en.wen = false;
        },

        esconde_car_est: function(){
            console.log('Aquiii');
            //app.perfil.zon.dash_zon = false;
            app.perfil.zon.car_est = false;
            // app.perfil.fn.wfn = false; //Esconde componente WorkFlow Nacional
            // app.perfil.en.wen = false;
        },

        esconde_cierre_act: function(){
            this.cierre_ae = false;
            this.tablaact = true;
        },

        cancela_act: function(){
            this.cae = false;
            this.tablaact = true;
        },

        mos_cierre_ae: function(ac_id, act_descrip, rc_id){

            this.cierre_ae = true;
            this.tablaact = false;
            this.ocierre_ae.ac_id = ac_id;
            this.ocierre_ae.act_descrip = act_descrip;
            this.ocierre_ae.rc_id = rc_id;


        },


        cierre_act_cpr : function(){

            console.log('Cerrando Actividad');

            var formData = new FormData();
            formData.append('datos', JSON.stringify({usu_id: this.usu_id,  ocierre_ae:this.ocierre_ae}));
            formData.append('file', document.getElementById('doc_ruta_cierre').files[0]);
            ero = this;
            axios.post('index.php/zon/cierre_act_cpr', formData).then(function (res) {

                    
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
                            ero.actividades_cpr_carg =  resp.datos;
                            ero.cierre_ae = false;
                            ero.tablaact = true;
                            ero.eqs_atn_cpr_act();
                            //ero.cae = false;
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
                    //console.log(res.data);
                })
                .catch(function (err) {
                    //ero.procesando = false;
                    console.log(err.message);
                });

        },

        agrega_act_cpr : function(){
            console.log('Antes de enviar');

            var formData = new FormData();
            formData.append('datos', JSON.stringify({usu_id: this.usu_id,  eq_atn_cpr:this.eq_atn_cpr}));
            formData.append('file', document.getElementById('doc_ruta').files[0]);
            ero = this;
            axios.post('index.php/zon/agrega_act_cpr', formData).then(function (res) {

                    
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
                            ero.actividades_cpr_carg =  resp.datos;
                            ero.cae = false;
                            
                            ero.eqs_atn_cpr_act();
                            //ero.tablaact = true;
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

        act_cpr_eq: function(){

            var rc_id = this.eq_atn_cpr.rc_id;

            var terminado = this.aeqs_atn_cpr.find(function(element) {
              return element.rc_id == rc_id;
            });  

            console.log(JSON.stringify(terminado));

            if(terminado.rc_estatus == 3)
            {
                //alert('Terminado');
                this.btn_agr_act = false;

            }   
            else
            {
                this.btn_agr_act = true;

            }    

            ero = this;
            axios.post('index.php/zon/act_cpr_eq', {usu_id: this.usu_id,  eq_atn_cpr:this.eq_atn_cpr}).then(function (res) {

                    
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
                            ero.actividades_cpr_carg =  resp.datos;
                            ero.tablaact = true;

                            ero.cae = false;
                            console.log('Datos traidos');
                        }
                        else
                        {
                            //ero.procesando = false;
                            ero.actividades_cpr_carg = [];
                            ero.tablaact = false;
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

        eqs_atn_cpr: function(){

            ero = this;
            axios.post('index.php/zon/eqs_atn_cpr', {usu_id: this.usu_id, zona_id: this.zona_id, rc_mes:this.eq_atn_cpr.rc_mes, rc_year:this.eq_atn_cpr.rc_year}).then(function (res) {

                    
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
                            ero.aeqs_atn_cpr =  resp.datos;
                            ero.tablaact = false;
                            console.log('Datos traidos');
                        }
                        else
                        {
                            //ero.procesando = false;
                            ero.tablaact = false;
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

        eqs_atn_cpr_act: function(){

            ero = this;
            axios.post('index.php/zon/eqs_atn_cpr', {usu_id: this.usu_id, zona_id: this.zona_id, rc_mes:this.eq_atn_cpr.rc_mes, rc_year:this.eq_atn_cpr.rc_year}).then(function (res) {

                    
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
                            ero.aeqs_atn_cpr =  resp.datos;
                            ero.tablaact = true;
                            console.log('Datos traidos');
                        }
                        else
                        {
                            //ero.procesando = false;
                            ero.tablaact = false;
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

        //Traemos el catalogo de actividades de CPR
        act_cpr: function(){

            ero = this;
            axios.post('index.php/zon/act_cpr',{rc_id:this.eq_atn_cpr.rc_id}).then(function (res) {

                    
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
                            ero.actividades_cpr =  resp.datos;
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

        carga_act_est: function(){


            if(this.eq_atn_cpr.rc_id == '')
            {
                alert('Información incompleta');
            }
            else
            {
                this.cae = true;
                this.tablaact = false;
                this.act_cpr();                
            }

        }

    },
    mounted: function(){

        
        console.log('Resultados CPR Montado');
        //Catalogo de Divisiones
 

        //this.eqs_atn_cpr();
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