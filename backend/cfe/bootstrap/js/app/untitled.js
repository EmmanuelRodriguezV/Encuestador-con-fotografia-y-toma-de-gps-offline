Vue.component('zon-res_cpr', {
    props : {
        usu_id: [Number,String]
    },
    data: function () {
    return {
      datos_obra: { //Objeto para envio a guardar obra
        ob_numob:'',
        ob_year:'',
        ob_inversion:0.0,
        ob_benefic:0,
        ob_viviendas:0,
        ob_montot:0.0,
        ob_descpago:'',
        ob_importe:'',
        ob_folio:''
      },
      obras:[], //Almancenará las obras para mostrar con v-for en la tabla
      procesando: false,
      tobras: true

    }
    },
    //template: '#fn-ver-obras'
    template: `
                <div class="row" v-if="tobras">
                    <div class="col-md-12 offset-md-0">
                        <div class="row justify-content-center align-items-center" v-if="procesando"><img src="./bootstrap/img/lg.comet-spinner.gif"></img></div>

                        <div class="row">
                            <legend>Catálogo de Obras x División</legend>
                            <div class="col-md-12">
                                <table class="table table-bordered table-hover">
                                    <thead class="table-active">
                                        <tr>
                                            <td>Num. Obra</td>

                                            <td>Año</td>
                                            <td>División</td>
                                            <td>Zona</td>
                                            <!--<td>Inversion</td>-->
                                            <td>Beneficiarios</td>
                                            <td>Viviendas</td>
                                            <!--<td>Monto Total</td>-->
                                            <td>Desc. Pago</td>
                                            <td>Importe</td>
                                            <td>Folio</td>
                                            <td>Oficio</td>
                                            <td>Accion</td>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="obra in obras">
                                            <td class="text-right">{{obra.ob_numob}}</td>
                                            <td>{{obra.inv_year}}</td>
                                            <td>{{obra.div_nombre}}</td>
                                            <td>{{obra.zona_nombre}}</td>
                                            <!--<td class="text-right">{{format_moneda(obra.ob_inversion)}}</td>-->
                                            <td class="text-right">{{obra.ob_benefic}}</td>
                                            <td class="text-right">{{obra.ob_viviendas}}</td>
                                            <!--<td class="text-right">{{format_moneda(obra.ob_montot)}}</td>-->
                                            <td>{{obra.ob_descpago}}</td>
                                            <td class="text-right">{{format_moneda(obra.ob_importe)}}</td>
                                            <td class="text-right">{{obra.ob_folio}}</td>
                                            <td class="text-center"><a target="_new" v-bind:href="obra.doc_ruta">Ver</a></td>
                                            <td><button disabled class="btn btn-success" @click="elimina_obra_fn(obra.ob_id)">Eliminar</button></td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
                `,
    methods: {

        test: function() {
            alert(this.usu_id);
        },

        traeobras: function(usu_id){

            console.log('Capturando');
            this.procesando = true;
            this.$http.post('index.php/fn/traeobras', {usu_id:this.usu_id}).then(function(respuesta){
                //console.log(JSON.stringify(respuesta.body[0]));
                if(respuesta.body)
                {
                    var resp = {};
                    resp = respuesta.body;

                    console.log(resp);

                    if(resp.estatus)
                    {
                        //alert(resp.datos.perf_perfil);

                        this.obras = resp.datos;
                        //this.obras.forEach(function(obra){
                        //    console.log(obra);
                        //})
                        this.procesando = false;
                        this.tobras = true;

                        //this.login = false;
                        //this.perfil.fn.activo = true;
                        //this.usuario = {};


                    }
                    else
                    {
                        this.procesando = false;
                        this.tobras = false;
                        this.obras = [];
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
        format_moneda: function(valor){
            return accounting.formatMoney(valor);
        },
        elimina_obra_fn: function(ob_id){
            console.log(ob_id);
            //this.procesando = true;
            this.$http.post('index.php/fn/elimina_obra_fn', {usu_id: this.usu_id, ob_id: ob_id}).then(function(respuesta){
            //console.log(JSON.stringify(respuesta.body[0]));
            if(respuesta.body)
            {
                var resp = {};
                resp = respuesta.body;

                console.log(resp);

                if(resp.estatus)
                {

                    this.traeobras(this.usu_id);

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
        }

    },
    mounted: function(){

            this.traeobras(this.usu_id);

        console.log('Ver Obras Montado');
    }

})