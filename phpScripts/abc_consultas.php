<?php
    require_once 'consultas.php';
    require 'dbconfig.php';
    //require_once 'connect.php';
 
    $json = json_decode(file_get_contents("php://input"));
 
    $a = new Consultas($dbname, $host, $username, $password);
    $o = array(
        'alimentosPorAnimal', 
        'sintomasPorEnfermedad', 
        'tratamientosPorEnfermedad',
        'enfermedadConSintoma',
        'enfermedadesSegunAnimal',
        'medicamentosPorTratamiento',
        'enfermedades_peligrosas',
        'medicamentosSegunTipo'
    );
    // $x = $o[7];
    //$id = $json->valor->idConsulta;
    //$criterio = $json->_valor->criterioConsulta;
    
    switch($json->_accion){
        case 'alimentosPorAnimal':
            $id = $json->_valor;
            if($var = $a->alimentosPorAnimal($id)){
                $data = array();
                for($i = 0; $i < count($var); $i++)
                {
                    //$data[$i]['_id_alimento'] = $var[$i]['id_alimento'];
                    $data[$i]['_nombre'] = $var[$i]['nombre'];
                    $data[$i]['_presentacion'] = $var[$i]['presentacion'];
                    $data[$i]['_indicaciones_uso'] = $var[$i]['indicaciones_uso'];
                    $data[$i]['_contenido_alimenticio'] = $var[$i]['contenido_alimenticio'];
                    $data[$i]['_imagen_alimento'] = $var[$i]['imagen_alimento'];
                    $data[$i]['_precio'] = $var[$i]['precio'];
                }
                echo json_encode($data);
            } else{
                echo json_encode(['_message' => 'Error en alimentosPorAnimal']);
            }
        break;

        case 'sintomasPorEnfermedad':
            $id = $json->_valor;
            if($var = $a->sintomasPorEnfermedad($id)){
                $data = array();
                for($i = 0; $i < count($var); $i++)
                {
                    //$data[$i]['_id_sintoma'] = $var[$i]['id_sintoma'];
                    $data[$i]['_descripcion'] = $var[$i]['descripcion'];    
                    $data[$i]['_imagen_muestra'] = $var[$i]['imagen_muestra'];
                } 
                echo json_encode($data);
            } else{
                echo json_encode(['_message' => 'Error en sintomasPorEnfermedad']);
            }
        break;
        
        case 'tratamientosPorEnfermedad':
            $id = $json->_valor;
            if($var = $a->tratamientosPorEnfermedad($id)){
                $data = array();
                for($i = 0; $i < count($var); $i++){
                    //$data[$i]['_id_tratamiento'] = $var[$i]['id_tratamiento'];
                    $data[$i]['_indicaciones'] = $var[$i]['indicaciones'];
                    $data[$i]['_tipo_tratamiento'] = $var[$i]['tipo_tratamiento'];
                } 
                echo json_encode($data);
            } else{
                echo json_encode(['_message' => 'Error en sintomasPorEnfermedad']);
            }
        break;

        case 'enfermedadConSintoma':
            $criterio = $json->_valor->criterioConsulta;
            if($var = $a->enfermedadConSintoma($criterio)){
                $data = array();
                for($i = 0; $i < count($var); $i++){
                    $data[$i]['_nombre_comun'] = $var[$i]['nombre_comun'];
                    $data[$i]['_grado_mortalidad'] = $var[$i]['grado_mortalidad'];
                    $data[$i]['_virus_causante'] = $var[$i]['virus_causante'];
                    $data[$i]['_causas_infeccion'] = $var[$i]['causas_infeccion'];
                } 
                echo json_encode($data);
            } else{
                echo json_encode(['_message' => 'Error en sintomasPorEnfermedad']);
            }
        break;
        
        case 'enfermedadesSegunAnimal':
            $id = $json->_valor;
            if($var = $a->enfermedadesSegunAnimal($id)){
                $data = array();
                for($i = 0; $i < count($var); $i++){
                    $data[$i]['_nombre_comun'] = $var[$i]['nombre_comun'];
                    $data[$i]['_grado_mortalidad'] = $var[$i]['grado_mortalidad'];
                    $data[$i]['_virus_causante'] = $var[$i]['virus_causante'];
                    $data[$i]['_causas_infeccion'] = $var[$i]['causas_infeccion'];
                } 
                echo json_encode($data);
            } else{
                echo json_encode(['_message' => 'Error en sintomasPorEnfermedad']);
            }
        break;

        case 'medicamentosPorTratamiento':
            $id = $json->_valor;
            if($var = $a->medicamentosPorTratamiento($id)){
                $data = array();
                for($i = 0; $i < count($var); $i++){
                    $data[$i]['_nombre_comun'] = $var[$i]['nombre_comun'];
                    $data[$i]['_activo'] = $var[$i]['activo'];
                    $data[$i]['_tipo_medicamento'] = $var[$i]['tipo_medicamento'];
                    $data[$i]['_efectos_secundarios'] = $var[$i]['efectos_secundarios'];
                    $data[$i]['_laboratorio'] = $var[$i]['laboratorio'];
                    $data[$i]['_precio'] = $var[$i]['precio'];
                    $data[$i]['_imagen_muestra'] = $var[$i]['imagen_muestra'];
                }
                echo json_encode($data);
            } else{
                echo json_encode(['_message' => 'Error en medicamentosPorTratamiento']);
            }
        break;

        case 'enfermedades_peligrosas':
            if($var = $a->enfermedades_peligrosas()){
                $data = array();
                for($i = 0; $i < count($var); $i++){
                    $data[$i]['_nombre_comun'] = $var[$i]['nombre_comun'];
                    $data[$i]['_grado_mortalidad'] = $var[$i]['grado_mortalidad'];
                    $data[$i]['_virus_causante'] = $var[$i]['virus_causante'];
                    $data[$i]['_Sintoma'] = $var[$i]['Sintoma'];
                }
                echo json_encode($data);
            } else{
                echo json_encode(['_message' => 'Error en sintomasPorEnfermedad']);
            }
        break;
        
        case 'medicamentosSegunTipo':
            $criterio = $json->_valor->criterioConsulta;
            if($var = $a->medicamentosSegunTipo($criterio)){
                $data = array();
                for($i = 0; $i < count($var); $i++){
                    $data[$i]['_nombre_comun'] = $var[$i]['nombre_comun'];
                    $data[$i]['_activo'] = $var[$i]['activo'];
                    $data[$i]['_tipo_medicamento'] = $var[$i]['tipo_medicamento'];
                    $data[$i]['_efectos_secundarios'] = $var[$i]['efectos_secundarios'];
                    $data[$i]['_laboratorio'] = $var[$i]['laboratorio'];
                    $data[$i]['_precio'] = $var[$i]['precio'];
                    $data[$i]['_imagen_muestra'] = $var[$i]['imagen_muestra'];
                }
                echo json_encode($data);
            } else{
                echo json_encode(['_message' => 'Error en sintomasPorEnfermedad']);
            }
        break;
    }

    
?>