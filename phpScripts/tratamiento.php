<?php



    class Tratamiento

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

		public function alta($indicaciones,$tipoTratamiento,$enfermedad){

             $sql = 'CALL insertar_tratamiento(:indicaciones, :tipoTratamiento, :enfermedad )';
            $stmt = $this->connect->prepare($sql);
            $stmt->bindParam(':indicaciones', $indicaciones, PDO::PARAM_STR);
            $stmt->bindParam(':tipoTratamiento', $tipoTratamiento, PDO::PARAM_STR);
            $stmt->bindParam(':enfermedad', $enfermedad, PDO::PARAM_STR);

             if($stmt->execute()){
                return true;
            } else {
                return false;
            }
        }

        public function cambio($id,$indicaciones,$tipoTratamiento,$enfermedad){
            $query = "UPDATE tratamiento SET `indicaciones`='$indicaciones',`tipo_tratamiento`='$tipoTratamiento'
            WHERE id_tratamiento = $id";

            //Se usa una var. auxiliar para ejecutar el script
            $stmt = $this->connect->prepare($query);
            
            if($stmt->execute()){
                 $query = "CALL relacion_enferme_tratam(:id,:enfermedades)";
                  $stm = $this->connect->prepare($query);
                $stm->bindParam(':id', $id, PDO::PARAM_INT);
                $stm->bindParam(':enfermedades', $enfermedad, PDO::PARAM_STR);
                
                if($stm->execute()){
                    return true;
                } else {    
                    return false;
                }

            } else{
                return false;
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

        public function getTratamiento($id)
        {
            $query = "SELECT * FROM tratamiento WHERE id_tratamiento = $id";

            $stm = $this->connect->prepare($query);

            if($stm->execute()){
                $x = $stm->fetch();
                $query = "SELECT id_enfermedad,enfermedad.nombre_comun FROM tratamiento,enfermedad_tratamiento, enfermedad 
                            WHERE id_tratamiento = '$id' AND id_tratamiento = id_tratamiento_fk AND id_enfermedad_fk = id_enfermedad";
                $stm = $this->connect->prepare($query);
                if($stm->execute()){
                    $x['enfermedad'] = $stm->fetchAll();
                    return $x;
                } else {
                    return false;
                }
            }else{
                return false;
            }
        }

        public function getTratamientos()
        {
            $query = "SELECT * FROM tratamiento";

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