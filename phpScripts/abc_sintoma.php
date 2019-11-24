

<?php
require_once 'sintoma.php';
    require 'dbconfig.php';
    require_once 'connect.php';

    $json = json_decode(file_get_contents("php://input"));

    $a = new Sintoma($dbname, $host, $username, $password);
   

    switch($json->_accion){
        case 'nuevo': 
            if($a->alta(
                $json->_valor->_descripcion, 
                $json->_valor->_imagen_muestra
            )){
                echo json_encode(['_success' => true, '_message' => 'Creado con exito']);
            } else{
                echo json_encode(['_message' => 'Error al crear']);
            }
                break;
        case 'editar': 
            if($a->cambio(
            	$json->_valor->_id_sintoma,
                  $json->_valor->_descripcion, 
                $json->_valor->_imagen_muestra
            )){
                echo json_encode(['_success' => true, '_message' => 'Editado con exito']);
            } else{
                echo json_encode([ '_message' => 'Error al cambiar']);
            }
                break;
        case 'eliminar': 
            if($a->baja($json->_valor->_id_sintoma)){
                echo json_encode(['_success' => true, '_message' => 'Eliminado con exito']);
            } else{
                echo json_encode(['_message' => 'Error al eliminar']);
            }
            break;
        case 'obtenerId': 
            if($var = $a->getSintoma($json->_valor)){
                echo json_encode(
                    [   
                 '_id_sintoma' =>$var['id_sintoma'],
                '_descripcion'=>$var['descripcion'], 
               
                '_imagen_muestra'=>$var['imagen_muestra']
                    ]
                );
            } else{
                echo json_encode(['_message' => 'Error al eliminar']);
            }
            break;
        case 'obtenerSintoma':
            $var = $a->getSintomas();
                if($var== false){
                     echo json_encode(['_message' => 'Error al cargar']);
                }else{
                	 $data = array();
                for($i = 0; $i < count($var); $i++)
                {

                	$data[$i]['_id_sintoma'] = $var[$i]['id_sintoma'];
                    $data[$i]['_descripcion'] = $var[$i]['descripcion'];
                  
                    $data[$i]['_imagen_muestra'] = $var[$i]['imagen_muestra'];
                } 
   
                echo json_encode($data);
            }
              
                break;
           
    }


?>