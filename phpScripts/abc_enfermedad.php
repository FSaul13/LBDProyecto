<?php
    require_once 'enfermedad.php';
    require 'dbconfig.php';
    require_once 'connect.php';

    $json = json_decode(file_get_contents("php://input"));

    $a = new Enfermedad($dbname, $host, $username, $password);
    //$x = 'obtenerId';
    //$id = 1;
    switch($json->_accion){
        case 'nuevo': 
            if($a->alta(
                $json->_valor->_nombre, 
                $json->_valor->_grado_mortalidad, 
                $json->_valor->_virus_causante,
                $json->_valor->_causas_infeccion)){
                echo json_encode(['_success' => true, '_message' => 'Creado con exito']);
            } else{
                echo json_encode(['_message' => 'Error al crear']);
            }
                break;
        case 'editar': 
            if($a->cambio(
                $json->_valor->_id_enfermedad,
                $json->_valor->_nombre, 
                $json->_valor->_grado_mortalidad, 
                $json->_valor->_virus_causante,
                $json->_valor->_causas_infeccion)){
                echo json_encode(['_success' => true, '_message' => 'Creado con exito']);
            } else{
                echo json_encode([ '_message' => 'Error al cambiar']);
            }
                break;
        case 'eliminar': 
            if($a->baja($json->_valor->_id_enfermedad)){
                echo json_encode(['_success' => true, '_message' => 'Creado con exito']);
            } else{
                echo json_encode(['_message' => 'Error al eliminar']);
            }
            break;
        case 'obtenerId': 
            if($var = $a->getEnfermedad($json->_valor)){
                echo json_encode(
                    [   '_id_enfermedad' => $var['id_enfermedad'],
                        '_nombre' => $var['nombre'],
                        '_grado_mortalidad' => $var['grado_mortalidad'],
                        '_virus_causante' => $var['virus_causante'],
                        '_causas_infeccion' => $var['causas_infeccion']
                    ]
                );
            } else{
                echo json_encode(['_message' => 'Error al eliminar']);
            }
            break;
        case 'obtenerEnfermedad':
            if($var = $a->getEnfermedades()){
                $data = array();
                for($i = 0; $i < count($var); $i++)
                {
                    $data[$i]['_id_enfermedad'] = $var[$i]['id_enfermedad'];
                    $data[$i]['_nombre'] = $var[$i]['nombre'];
                    $data[$i]['_grado_mortalidad'] = $var[$i]['grado_mortalidad'];
                    $data[$i]['_virus_causante'] = $var[$i]['virus_causante'];
                    $data[$i]['_causas_infeccion'] = $var[$i]['causas_infeccion'];
                } 

                //echo '<script>console.log('.json_encode($data).');</script>';
                echo json_encode($data);
            }
    }
?>