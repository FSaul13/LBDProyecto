
<?php


    require_once 'detalleTratamiento.php';
    require 'dbconfig.php';
    require_once 'connect.php';

    $json = json_decode(file_get_contents("php://input"));
  $a = new DetalleTratamiento($dbname, $host, $username, $password);

    switch($json->_accion){
        case 'nuevo': 
            $val =$a->alta(
                $json->_valor->_id_tratamiento_fk, 
                $json->_valor->_id_medicamento_fk,
                $json->_valor->_max_cant_med,
                 $json->_valor->_min_can_med,
                 $json->_valor->_periodo_dosificacion
            );
            if($val==true){
                echo json_encode(['_success' => true, '_message' => 'Creado con exito','id'=> $val]);
             }else{
                echo json_encode(['_message' => 'Error al crear','error'=> $val]);
            }
                break;
        case 'editar': 
            $val=$a->cambio(
            	$json->_valor->_id_tratamiento_fk, 
                $json->_valor->_id_medicamento_fk,
                $json->_valor->_max_cant_med,
                $json->_valor->_min_can_med,
                $json->_valor->_periodo_dosificacion
            );

            if($val ==true){
                echo json_encode(['_success' => true, '_message' => 'Editado con exito','id'=> $val]);
            } else{
                echo json_encode([ '_message' => 'Error al cambiar','id'=> $val]);
            }
                break;
        case 'eliminar': 
            if($a->baja($json->_valor->_id_tratamiento,$json->_valor->_id_medicamento)){
                echo json_encode(['_success' => true, '_message' => 'Eliminado con exito']);
            } else{
                echo json_encode(['_message' => 'Error al eliminar']);
            }
            break;
        case 'obtenerId': 
            if($var = $a->getDetalleTratamiento($json->_valor->_id_tratamiento,$json->_valor->_id_medicamento)){
                echo json_encode(
                    [   
                 '_id_tratamiento' =>$var['id_tratamiento_fk'],
                '_id_medicamento'=>$var['id_medicamento_fk'], 
                '_max_cant_med'=>$var['max_cant_med'],
                '_min_can_med'=> $var['min_cant_med'],
                '_periodo_dosificacion'=> $var['periodo_dosificacion']
                    ]

                );
            } else{
                echo json_encode(['_message' => 'Error al de obtener']);
            }
            //echo json_encode($json->_valor);
            break;
        case 'obtenerDetalleTratamientos':
            $var = $a->getDetallesTratamientos();
                if($var== false){
                     echo json_encode(['_message' => 'Error al cargar']);
                }else{
                	 $data = array();
                for($i = 0; $i < count($var); $i++)
                {

                		$data[$i]['_id_tratamiento'] = $var[$i]['id_tratamiento_fk'];
                		$data[$i]['_id_medicamento'] = $var[$i]['id_medicamento_fk'];
                		$data[$i]['_max_cant_med'] = $var[$i]['max_cant_med'];
                		$data[$i]['_min_can_med'] = $var[$i]['min_cant_med'];
                		$data[$i]['_periodo_dosificacion'] = $var[$i]['periodo_dosificacion'];
                   // $data[$i]['_indicaciones'] = $var[$i]['indicaciones'];
                  
                    //$data[$i]['_tipo_tratamiento'] = $var[$i]['tipo_tratamiento'];
                }
   
                echo json_encode($data);
            }
              
                break;
           
    }

    ?>