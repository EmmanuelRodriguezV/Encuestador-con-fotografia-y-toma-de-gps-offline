                <div class="row">
                    <div class="col-md-4 offset-md-4">
                        <div class="row">
                            <legend>Agregar Obra</legend>

                            <form>
                                <div class="form-group">
                                    <label for="ob_numob">Numero de Obra</label>
                                    <input type="text" class="form-control" id="ob_numob" placeholder="Ingrese número de obra" v-model="datos_obra.ob_numob"/>
                                    <!--<small id="emailHelp" class="form-text text-muted">Texto peqeño</small>-->
                                </div>
                                <div class="form-group">
                                    <label for="ob_year">Año</label>
                                    <select  class="form-control" id="ob_year" v-model="datos_obra.ob_year"> 
                                        <option value="2018">2018</option>
                                        <option value="2019">2019</option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                        <option value="2023">2023</option>
                                    </select>                            
                                </div>

                                <div class="form-group">
                                    <label for="ob_inversion">Inversion</label>
                                    <input class="form-control" id="ob_inversion" type="text" v-model="datos_obra.ob_inversion"/>                             
                                </div>

                                <div class="form-group">
                                    <label for="ob_benefic">Beneficiarios</label>
                                    <input class="form-control" id="ob_benefic" type="text" v-model="datos_obra.ob_benefic"/>
                                </div>

                                <div class="form-group">
                                    <label for="ob_viviendas">Viviendas</label>
                                    <input class="form-control" id="ob_viviendas" type="text" v-model="datos_obra.ob_viviendas"/>
                                </div>

                                <div class="form-group">
                                    <label for="ob_montot">Monto Total</label>
                                    <input class="form-control" id="ob_montot" type="text" v-model="datos_obra.ob_montot"/>
                                </div>

                                <div class="form-group">
                                    <label for="ob_descpago">Descriṕción del Pago</label>
                                    <textarea class="form-control" id="ob_descpago"  v-model="datos_obra.ob_descpago" rows="3"></textarea>
                                </div>

                                <div class="form-group">
                                    <label for="ob_importe">Importe</label>
                                    <input class="form-control" id="ob_importe" type="text" v-model="datos_obra.ob_importe"/>
                                </div>                                

                                <div class="form-group">
                                    <label for="ob_folio">Folio</label>
                                    <input class="form-control" id="ob_folio" type="text" v-model="datos_obra.ob_folio"/>
                                </div> 


                                <button type="submit" @click="cap_obra(1)" class="btn btn-primary">Guardar</button>
                                <button @click="cap_obra(0)" class="btn btn-secondary">Cancelar</button>

                            </form>
                        </div>

                    </div>
                </div>