<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Cfeencuesta extends CI_Controller
{

    /**
     * Index Page for this controller.
     *
     * Maps to the following URL
     * 		http://example.com/index.php/welcome
     *	- or -
     * 		http://example.com/index.php/welcome/index
     *	- or -
     * Since this controller is set as the default controller in
     * config/routes.php, it's displayed at http://example.com/
     *
     * So any other public methods not prefixed with an underscore will
     * map to /index.php/welcome/<method_name>
     * @see https://codeigniter.com/user_guide/general/urls.html
     */
    public function index()
    {
        $this->load->helper('url');
        echo "Ruta de prueba funcionando";
        //$this->load->view('index');
    }

    public function sinc_encuestas()
    {
        //$this->load->helper('url');
        $this->load->database('default');
        $this->load->model('mcfeencuesta');

        $encuestas = $this->mcfeencuesta->sinc_encuestas();
        $respuesta = new stdClass();
        if (count($encuestas)) {
            $respuesta->estatus = 1;
            $respuesta->mensaje = 'Encuestas habilitadas';
            $respuesta->datos = $encuestas;
        } else {
            $respuesta->estatus = 0;
            $respuesta->mensaje = 'Error al recuperar las encuestas';
            $respuesta->datos = '';
        }

        echo json_encode($respuesta);
        //$this->load->view('index');
    }
    public function test()
    {

        $request = json_decode(file_get_contents('php://input'), true);
        echo json_encode($request);
        
    }

    public function save_picture()
    {
      
        $response = new stdClass();
        
        try {
            $this->load->database('default');
            $this->load->model('mcfeencuesta');
            $request = json_decode(file_get_contents('php://input'), true);
            $decoded = base64_decode($request['BASE64IMG']);
            $nombre = $request['FILENAME'];
            $encuesta_id = $request['ENCUESTAID'];
            $value = $nombre;
            $value = trim($value);



            if (get_magic_quotes_gpc()) {
                $value = stripslashes($value);
            }
            $value = strtr($value, array_flip(get_html_translation_table(HTML_ENTITIES)));
            $value = strip_tags($value);
            $value = htmlspecialchars($value);
            $value = $this->security->sanitize_filename($value);

        
           # $response->message = 'todo funcionando';             
            file_put_contents('./uploads/' . $value, $decoded);
            $model_params = new stdClass();
            $model_params->filename = $value;
            $model_params->idencuesta = $encuesta_id;            
            $confirma = $this->mcfeencuesta->save_picture($model_params);
            echo json_encode($confirma);
            return;
        } catch (\Throwable $th) {
            //throw $th;
            $response->error = "there was an error with the name or the image file";
            $response->erromessage = $th->getMessage();
            echo json_encode($response);
            return;
        }
    }

    public function alm_res_encuesta()
    {
        $this->request = json_decode(file_get_contents('php://input'), true);
        $this->load->database('default');
        $this->load->model('mcfeencuesta');
        $response = new stdClass();
        $confirma = $this->mcfeencuesta->alm_res_encuesta($this->request);

        if (!$confirma) {
            $response->mensaje = "Sincronizacion realizada correctamete";
            $response->codigo = 200;
            echo json_encode($response);
        } else {
            $response->mensaje = "Fallo la sincronizacion con el servidor";
            $response->codigo = 400;
            echo json_encode($response);
        }
    }
}
