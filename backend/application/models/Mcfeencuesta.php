<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
class Mcfeencuesta extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function sinc_encuestas()
    {

        $nivel = 0;
        #$query = $this->db->query("SELECT * FROM GETENCUESTAS_PREGUNTAS_ACT;");
        $query = $this->db->query("SELECT * FROM getencuestas_preguntas_act;");

        $result = $query->result(); //Arrreglo Asociativo

        //logica para formar los arreglos de objetos $arregloresult

        //[{"senc_id":"1","senc_descripcion":"Encuesta de prueba 1","preguntas":[{"spr_id":"1","spr_pregunta":"Pregunta 1?"},{"spr_id":"2","spr_pregunta":"Pregunta 2?"}]},{"senc_id":"2","senc_descripcion":"Encuesta de prueba 2","preguntas":[{"spr_id":"1","spr_pregunta":"Pregunta 1?"},{"spr_id":"2","spr_pregunta":"Pregunta 2?"}]}]

        return $result;
    }
    public function save_picture($request)
    {
        /*
        $this->request->idencuesta = $encuesta_id;
        $this->request->namefile = $value;
        */

        
        $QUERY_ALT_UPDATE = "UPDATE serv_encuesta SET  serv_encfoto = ? WHERE sen_orden = ? ;";
        $SQL_QUERY_FN_REGISTRA_FOTO = 'select cfeencuesta.fn_registra_foto(?,?);';
        $res = new stdClass();
        $res->mensaje = 'todo esta bien aqui termina';
        try {
            $query = $this->db->query($QUERY_ALT_UPDATE, array($request->filename, $request->idencuesta));
            $response = new stdClass();
            if ($query) {

               
                $response->message = 'foto guardada correctamente';
                $response->status = 200;
            } else {
                $response->message = 'Hubo un error en el proceso';
                $response->status = 400;
            }
            return $response;
        } catch (\Throwable $th) {
            //throw $th;
            return $response;
        }
    }

    public function alm_res_encuesta($request)
    {
        $response = new stdClass();
        $response->mensaje = "se completo";

        $id_encuesta_numOrden = array();
        $id_enc_ord_temp = new stdClass();

        $numero = 0;
        $id_encuesta_numOrden = array();
        //$error;

        // $response = new stdClass();
        // $debug = "Hola";
        // $response->mensaje = $debug;
        // $response->codigo = 200;
        // echo json_encode($response);
        // exit();        

        // $SQL_QUERY_FN_REGISTRA_ENCUESTA = "SELECT FN_REGISTRA_ENCUESTA(?,?,?,?) as ID_DISPONIBLE";
        // $SQL_QUERY_FN_REGISTRA_RESPUESTA = "CALL REGISTRA_RESPUESTA(?,?,?)";

        $SQL_QUERY_FN_REGISTRA_ENCUESTA = "select fn_registra_encuesta(?,?,?,?) as id_disponible";
        $SQL_QUERY_FN_REGISTRA_RESPUESTA = "call registra_respuesta(?,?,?)";
        $diccionario_id = array();

        $error = false;
        foreach ($request['ENCUESTAS_USUARIOS'] as $user) {
            /*
                jsonObject = new JSONObject();
                    jsonObject.put("NUMEROID",c.getString(0));  la encuesta
                    jsonObject.put("NOMBREUSUARIO",c.getString(1));
                    jsonObject.put("LATITUD",c.getString(2));
                    jsonObject.put("LONGITUD",c.getString(3));
             */
            $id_enc_ord_temp = new stdClass();
            try {
                //code...

                $query = $this->db->query($SQL_QUERY_FN_REGISTRA_ENCUESTA, array($user['NUMEROID'], $user['NOMBREUSUARIO'], $user['LONGITUD'], $user['LATITUD']));
            } catch (\Throwable $th) {
                //throw $th;
                $error = true;
                return $error;
            }
            $id_disponible =   $query->result()[0]->id_disponible;
            $id_enc_ord_temp->ID_ENCUESTA = $id_disponible;
            $diccionario_id[$user['NOMBREUSUARIO']] = $id_disponible;
            $id_enc_ord_temp->USER_ORDEN = $user['NOMBREUSUARIO'];
            # $this->db-query($SQL_INSERT_ENCUESTA,array($id_disponible,$user['NOMBREUSUARIO'],$user['NUMEROID'],$user['LONGITUD'],$user['LATITUD']));
            #echo json_encode($id_enc_ord_temp);
            array_push($id_encuesta_numOrden, $id_enc_ord_temp);
        }


        /*
        JSON RESPUESTAS
          jsonObject.put("NUMEROID",c.getString(0));
          jsonObject.put("IDPREGUNTA",c.getString(1));
          jsonObject.put("RESPUESTA",c.getString(2));
        */
        $resp = new stdClass();
        #$query = $this->db-query("INSERT INTO SERV_RESPUESTAS (SPR_ID,SPR_VALOR,SEN_ID) VALUES (22211117,5,36)");

        foreach ($request['RESPUESTAS'] as $respuesta) {
            $resp->idpregunta = $respuesta['IDPREGUNTA'];
            $resp->respuesta = $respuesta['RESPUESTA'];
            $resp->numeroid = $respuesta['NUMEROID'];
            $resp->encuesta_id = $diccionario_id[$respuesta['NUMEROID']];
            try {
                //code...
                $query = $this->db->query($SQL_QUERY_FN_REGISTRA_RESPUESTA, array($resp->idpregunta, $resp->respuesta, $resp->encuesta_id));
            } catch (\Throwable $th) {
                //throw $th;
                $error = false;
                return $error;
            }
        }
    }
}
