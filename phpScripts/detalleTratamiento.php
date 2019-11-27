<?php



    class DetalleTratamiento

    {

        private $connect;
        private $hola;
       

        //Constructor
        function __construct($dbname='', $host='', $username='', $password=''){
            try{
                $dsn = "mysql:host=$host;dbname=$dbname";
                $this->connect = new PDO($dsn, $username, $password);
            }catch(PDOException $e){
                echo $e->getMessage();
            }
        }
                

		public function alta($id_tratamiento,$id_medicamento,$maxCant,$minCant,$dosificacion){
             $sql = 'CALL insertar_detalle_tratamiento(:idTratamiento, :idEnfermedad,:maxCant, :minCant, :dosificacion )';
            $stmt = $this->connect->prepare($sql);
            $stmt->bindParam(':idTratamiento', $id_tratamiento, PDO::PARAM_INT);
            $stmt->bindParam(':idEnfermedad', $id_medicamento, PDO::PARAM_INT);
            $stmt->bindParam(':maxCant', $maxCant, PDO::PARAM_STR);
            $stmt->bindParam(':minCant', $minCant, PDO::PARAM_STR);
            $stmt->bindParam(':dosificacion', $dosificacion, PDO::PARAM_STR);

             if($stmt->execute()){
                return true;
            } else {
                return $stmt->errorInfo();
                //return false;
            }
        }

        public function cambio($id_tratamiento,$id_medicamento,$maxCant,$minCant,$dosificacion){


            $query = "UPDATE detalle_tratamiento SET `max_cant_med`='$maxCant',`min_cant_med`='$minCant',`periodo_dosificacion`='$dosificacion' 
            WHERE `id_tratamiento_fk`='$id_tratamiento' AND `id_medicamento_fk`='$id_medicamento'";

            //Se usa una var. auxiliar para ejecutar el script
            $stmt = $this->connect->prepare($query);
            
            if($stmt->execute()){
              
            return true;

            } else{
                return $stmt->errorInfo();
                //return false;
            }
        }

        public function baja($id){
            $query = "DELETE from tratamiento
			    WHERE id_Tratamiento=$id";

            //Se usa una var. auxiliar para ejecutar el script
            $stm = $this->connect->prepare($query);
            
            if($stm->execute()){
                return true;
            } else{
                return false;
            }
        }

        public function getDetalleTratamiento($id,$id2)
        {
            $query = "SELECT * FROM detalle_tratamiento WHERE id_tratamiento_fk = $id AND id_medicamento_fk=$id2";

            $stm = $this->connect->prepare($query);

            if($stm->execute()){
               /* $x = $stm->fetch();
                $query = "SELECT id_enfermedad,enfermedad.nombre_comun FROM tratamiento,enfermedad_tratamiento, enfermedad 
                            WHERE id_tratamiento = '$id' AND id_tratamiento = id_tratamiento_fk AND id_enfermedad_fk = id_enfermedad";
                $stm = $this->connect->prepare($query);
                if($stm->execute()){
                    $x['enfermedad'] = $stm->fetchAll();
                    return $x;
                } else {
                    return false;
                }*/
                return $stm->fetch();

            }else{
                return false;
            }
        }

        public function getDetallesTratamientos()
        {
            $query = "SELECT * FROM `detalle_tratamiento`";

            $stm = $this->connect->prepare($query);

            if($stm->execute())
            {
                return $stm->fetchAll();
               
            } else{
                return false;
            }
        }

    }

?>