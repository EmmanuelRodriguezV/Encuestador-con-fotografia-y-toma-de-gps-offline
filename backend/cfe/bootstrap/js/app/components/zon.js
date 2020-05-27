Vue.component('zon-res-cpr', {
    props : {
        usu_id: [Number,String],
        zona_id: [Number,String]
    },
    data: function () {
        return {
          procesando: false,
          cmphtml: ''

        }
    },
    //template: '#fn-ver-obras'
    template: `
                <div class="row" >
                    <div class="col-md-12 offset-md-0">
                        
                        <div class="row justify-content-center align-items-center" v-if="procesando"><img src="./bootstrap/img/lg.comet-spinner.gif"></img></div>


                        <div class="row">
                            <legend>Resultados Compensación de Potencia Reactiva</legend>
                            <div class="col-md-12">
                                <table class="table table-bordered">
                                    <caption>table title and/or explanatory text</caption>
                                    <thead>
                                        <tr>
                                            <th>header</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td @mouseover="jover()" @mouseleave="liv()">data</td>
                                        </tr>
                                    </tbody>
                                </table>                                
                            </div>
                        </div>

                        <div class="row">
                            <legend>Resultados Compensación de Potencia Reactiva</legend>
                            <div class="col-md-12" v-html="cmphtml">

                            </div>
                        </div>

                    </div>
                </div>
                `,
    methods: {

        test: function() {
            alert(this.usu_id);
        },

        jover : function(){
            console.log('MouseOver');
        },

        liv : function(){
            console.log('MouseLeave');
        },
        res_cpr: function(){
            //console.log(ob_id);
            //this.procesando = true;
            this.$http.post('index.php/estdop/res_cpr', {usu_id: this.usu_id}).then(function(respuesta){
                //console.log(JSON.stringify(respuesta.body[0]));
                if(respuesta.body)
                {
                    var resp = {};
                    resp = respuesta.body;

                    console.log(resp);
                    this.cmphtml = resp

                    // if(resp.estatus)
                    // {
                        
                    //     //this.traeobras(this.usu_id);

                    // }
                    // else
                    // {
                    //     alert(resp.mensaje);
                    // }
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

            this.res_cpr(this.usu_id);

        console.log('Resultados CPR Montado');
    }

})