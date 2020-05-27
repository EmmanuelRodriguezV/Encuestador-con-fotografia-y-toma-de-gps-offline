<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Mcfeencuesta extends CI_Model
{
    public function __construct ()
    {
        parent::__construct();
    }

    public function sinc_encuestas()
    {

        $nivel = 0;

        $query = $this->db->query("SELECT * FROM cfeencuesta.serv_encuestas;");

        $result = $query->result(); //Arrreglo Asociativo

        //logica para formar los arreglos de objetos $arregloresult

        //[{"senc_id":"1","senc_descripcion":"Encuesta de prueba 1","preguntas":[{"spr_id":"1","spr_pregunta":"Pregunta 1?"},{"spr_id":"2","spr_pregunta":"Pregunta 2?"}]},{"senc_id":"2","senc_descripcion":"Encuesta de prueba 2","preguntas":[{"spr_id":"1","spr_pregunta":"Pregunta 1?"},{"spr_id":"2","spr_pregunta":"Pregunta 2?"}]}]

        #return $arregloresult;
        return $result;

    }

    public function alm_res_encuesta($request)
    {

        //$request contiene un objeto con los datos para almacenar en la tabla serv_encuesta y serv_respuestas

        $result = true;

        $this->db->query("SET autocommit = 0");
        $this->db->query("START TRANSACTION");
        if(!$this->db->query("INSERT INTO serv_encuesta...."))
        {
            //Falló
            $this->db->query("ROLLBACK");
            $result = false;
        }
        else
        {

            if(!$this->db->query("INSERT INTO serv_respuestas...."))
            {
                //Falló
                $this->db->query("ROLLBACK");
                $result = false;
            }
            else
            {
                $this->db->query("COMMIT");       
            }
            

        }

        return $result;


    }


}