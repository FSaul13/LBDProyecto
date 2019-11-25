<?php

    require_once 'alimento.php';
    require 'dbconfig.php';
    require_once 'connect.php';

    $json = json_decode(file_get_contents("php://input"));

    $a = new Alimento($dbname, $host, $username, $password);
    //$x = 'obtenerId';
    //$id = 1;
    switch($json->_accion){
        case 'nuevo': 
            if($a->alta(
                $json->_valor->_nombre, 
                $json->_valor->_presentacion, 
                $json->_valor->_indicaciones_uso,
                $json->_valor->_contenido_alimenticio,
                $json->_valor->_imagen_alimento,
                $json->_valor->_precio,
                $json->_valor->_animal)){
                echo json_encode(['_success' => true, '_message' => 'Creado con exito']);
            } else{
                echo json_encode(['_message' => 'Error al crear']);
            }
                break;
        case 'editar': 
            if($a->cambio(
                $json->_valor->_id_alimento,
                $json->_valor->_nombre, 
                $json->_valor->_presentacion, 
                $json->_valor->_indicaciones_uso,
                $json->_valor->_contenido_alimenticio,
                $json->_valor->_imagen_alimento,
                $json->_valor->_precio)){
                echo json_encode(['_success' => true, '_message' => 'Creado con exito']);
            } else{
                echo json_encode([ '_message' => 'Error al cambiar']);
            }
                break;
        case 'eliminar': 
            if($a->baja($json->_valor->_id_alimento)){
                echo json_encode(['_success' => true, '_message' => 'Creado con exito']);
            } else{
                echo json_encode(['_message' => 'Error al eliminar']);
            }
            break;
        case 'obtenerId': 
            if($var = $a->getAlimento($json->_valor)){
                echo json_encode(
                    [   '_id_alimento' => $var['id_alimento'],
                        '_nombre' => $var['nombre'],
                        '_presentacion' => $var['presentacion'],
                        '_indicaciones_uso' => $var['indicaciones_uso'],
                        '_contenido_alimenticio' => $var['contenido_alimenticio'],
                        '_imagen_alimento' => $var['imagen_alimento'],
                        '_precio' => $var['precio'],
                    ]
                );
            } else{
                echo json_encode(['_message' => 'Error al eliminar']);
            }
            break;
        case 'obtenerAlimentos':
            if($var = $a->getAlimentos()){
                $data = array();
                for($i = 0; $i < count($var); $i++)
                {
                    $data[$i]['_id_alimento'] = $var[$i]['id_alimento'];
                    $data[$i]['_nombre'] = $var[$i]['nombre'];
                    $data[$i]['_presentacion'] = $var[$i]['presentacion'];
                    $data[$i]['_indicaciones_uso'] = $var[$i]['indicaciones_uso'];
                    $data[$i]['_contenido_alimenticio'] = $var[$i]['contenido_alimenticio'];
                    $data[$i]['_imagen_alimento'] = $var[$i]['imagen_alimento'];
                    $data[$i]['_precio'] = $var[$i]['precio'];
                } 

                //echo '<script>console.log('.json_encode($data).');</script>';
                echo json_encode($data);
            }
    }
?>