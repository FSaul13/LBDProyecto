<?php


    require_once 'tratamiento.php';
    require 'dbconfig.php';
    require_once 'connect.php';

    $json = json_decode(file_get_contents("php://input"));

    $a = new Tratamiento($dbname, $host, $username, $password);
   

    switch($json->_accion){
        case 'nuevo': 
            if($a->alta(
                $json->_valor->_indicaciones, 
                $json->_valor->_tipo_Tratamiento,
                $json->_valor->_enfermedad
            )){
                echo json_encode(['_success' => true, '_message' => 'Creado con exito']);
            } else{
                echo json_encode(['_message' => 'Error al crear']);
            }
                break;
        case 'editar': 
            if($a->cambio(
            	$json->_valor->_id_tratamiento,
                $json->_valor->_indicaciones, 
                $json->_valor->_tipo_tratamiento,
                $json->_valor->_enfermedad
            )){
                echo json_encode(['_success' => true, '_message' => 'Editado con exito','id'=> $json->_valor->_enfermedad,'idsecon'=> $json->_valor->_id_tratamiento ]);
            } else{
                echo json_encode([ '_message' => 'Error al cambiar']);
            }
                break;
        case 'eliminar': 
            if($a->baja($json->_valor->_id_tratamiento)){
                echo json_encode(['_success' => true, '_message' => 'Eliminado con exito']);
            } else{
                echo json_encode(['_message' => 'Error al eliminar']);
            }
            break;
        case 'obtenerId': 
            if($var = $a->getTratamiento($json->_valor)){
                echo json_encode(
                    [   
                 '_id_tratamiento' =>$var['id_tratamiento'],
                '_indicaciones'=>$var['indicaciones'], 
                '_tipo_tratamiento'=>$var['tipo_tratamiento'],
                '_enfermedad'=> $var['enfermedad']
                    ]
                );
            } else{
                echo json_encode(['_message' => 'Error al de obtener']);
            }
            break;
        case 'obtenerTratamiento':
            $var = $a->getTratamientos();
                if($var== false){
                     echo json_encode(['_message' => 'Error al cargar']);
                }else{
                	 $data = array();
                for($i = 0; $i < count($var); $i++)
                {

                	$data[$i]['_id_tratamiento'] = $var[$i]['id_tratamiento'];
                    $data[$i]['_indicaciones'] = $var[$i]['indicaciones'];
                  
                    $data[$i]['_tipo_tratamiento'] = $var[$i]['tipo_tratamiento'];
                } 
   
                echo json_encode($data);
            }
              
                break;
           
    }

    ?>