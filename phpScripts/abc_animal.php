<?php

    require_once 'animal.php';
    require 'dbconfig.php';
    require_once 'connect.php';

    $json = json_decode(file_get_contents("php://input"));

    $a = new Animal($dbname, $host, $username, $password);
   

    switch($json->_accion){
        case 'nuevo': 
            if($a->alta(
                $json->_valor->_nombre, 
                $json->_valor->_caracteristicas, 
                $json->_valor->_tipo_alimentacion,
                $json->_valor->_tipo_animal,
                $json->_valor->_imagen_muestra)){
                echo json_encode(['_success' => true, '_message' => 'Creado con exito']);
            } else{
                echo json_encode(['_message' => 'Error al crear']);
            }
                break;
        case 'editar': 
            if($a->cambio(
                $json->_valor->_id_animal,
                $json->_valor->_nombre, 
                $json->_valor->_caracteristicas, 
                $json->_valor->_tipo_alimentacion,
                $json->_valor->_tipo_animal,
                $json->_valor->_imagen_muestra)){
                echo json_encode(['_success' => true, '_message' => 'Creado con exito']);
            } else{
                echo json_encode([ '_message' => 'Error al cambiar']);
            }
                break;
        case 'eliminar': 
            if($a->baja($json->_valor->id_animal)){
                echo json_encode(['_success' => true, '_message' => 'Eliminado con exito']);
            } else{
                echo json_encode(['_message' => 'Error al eliminar']);
            }
            break;
        case 'obtenerId': 
            if($var = $a->getAnimal($json->_valor)){
                echo json_encode(
                    [   '_id_animal' => $var['id_animal'],
                        '_nombre' => $var['nombre'],
                        '_caracteristicas' => $var['caracteristicas'],
                        '_tipo_alimentacion' => $var['tipo_alimentacion'],
                        '_tipo_animal' => $var['tipo_animal'],
                        '_imagen_muestra' => $var['imagen_muestra'],
                    ]
                );
            } else{
                echo json_encode(['_message' => 'Error al eliminar']);
            }
            break;
        case 'obtenerAnimales':
            $var = $a->getAnimales();
                if($var== false){
                     echo json_encode(['_message' => 'Error al cargar']);
                }else{
   
                echo json_encode($var);
            }
              
                break;
           
    }
?>