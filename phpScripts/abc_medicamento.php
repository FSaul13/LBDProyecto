
<?php
require_once 'medicamento.php';
    require 'dbconfig.php';
    require_once 'connect.php';

    $json = json_decode(file_get_contents("php://input"));

    $a = new Medicamento($dbname, $host, $username, $password);
   

    switch($json->_accion){
        case 'nuevo': 
            if($a->alta(
                $json->_valor->_nombre_comun, 
                $json->_valor->_activo, 
                $json->_valor->_tipo_medicamento,
                $json->_valor->_efectos_secundarios,
                $json->_valor->_laboratorio,
                $json->_valor->_precio,
                $json->_valor->_imagen_muestra
            )){
                echo json_encode(['_success' => true, '_message' => 'Creado con exito']);
            } else{
                echo json_encode(['_message' => 'Error al crear']);
            }
                break;
        case 'editar': 
            if($a->cambio(
            	$json->_valor->_id_medicamento,
                  $json->_valor->_nombre_comun, 
                $json->_valor->_activo, 
                $json->_valor->_tipo_medicamento,
                $json->_valor->_efectos_secundarios,
                $json->_valor->_laboratorio,
                $json->_valor->_precio,
                $json->_valor->_imagen_muestra
            )){
                echo json_encode(['_success' => true, '_message' => 'Editado con exito']);
            } else{
                echo json_encode([ '_message' => 'Error al cambiar']);
            }
                break;
        case 'eliminar': 
            if($a->baja($json->_valor->_id_medicamento)){
                echo json_encode(['_success' => true, '_message' => 'Eliminado con exito']);
            } else{
                echo json_encode(['_message' => 'Error al eliminar']);
            }
            break;
        case 'obtenerId': 
            if($var = $a->getMedicamento($json->_valor)){
                echo json_encode(
                    [   
                 '_id_medicamento' =>$var['id_medicamento'],
                '_nombre_comun'=>$var['nombre_comun'], 
                '_activo'=>$var['activo'], 
                '_tipo_medicamento'=>$var['tipo_medicamento'],
                '_efectos_secundarios'=>$var['efectos_secundarios'],
                '_laboratorio'=>$var['laboratorio'],
                '_precio'=>$var['precio'],
                '_imagen_muestra'=>$var['imagen_muestra']
                    ]
                );
            } else{
                echo json_encode(['_message' => 'Error al eliminar']);
            }
            break;
        case 'obtenerMedicamento':
            $var = $a->getMedicamentos();
                if($var== false){
                     echo json_encode(['_message' => 'Error al cargar']);
                }else{
                	 $data = array();
                for($i = 0; $i < count($var); $i++)
                {

                	$data[$i]['_id_medicamento'] = $var[$i]['id_medicamento'];
                    $data[$i]['_nombre_comun'] = $var[$i]['nombre_comun'];
                    $data[$i]['_activo'] = $var[$i]['activo'];
                    $data[$i]['_tipo_medicamento'] = $var[$i]['tipo_medicamento'];
                    $data[$i]['_efectos_secundarios'] = $var[$i]['efectos_secundarios'];
                    $data[$i]['_laboratorio'] = $var[$i]['laboratorio'];
                    $data[$i]['_precio'] = $var[$i]['precio'];
                    $data[$i]['_imagen_muestra'] = $var[$i]['imagen_muestra'];
                } 
   
                echo json_encode($data);
            }
              
                break;
           
    }


?>