<?php



    class Sintoma

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

		public function alta($descripcion,$imagen,$enfermedad){

             $sql = 'CALL insertar_sintoma(:descripcion, :imagen, :enfermedad )';
            $stmt = $this->connect->prepare($sql);
            $stmt->bindParam(':descripcion', $descripcion, PDO::PARAM_STR);
            $stmt->bindParam(':imagen', $imagen, PDO::PARAM_STR);
            $stmt->bindParam(':enfermedad', $enfermedad, PDO::PARAM_STR);

             if($stmt->execute()){
                return true;
            } else {
                return false;
            }
        }

        public function cambio($id,$descripcion,$imagen,$enfermedades){
            $query = "UPDATE sintoma SET `descripcion`='$descripcion', `imagen_muestra`='$imagen'
            WHERE id_sintoma = $id";

            //Se usa una var. auxiliar para ejecutar el script
            $stm = $this->connect->prepare($query);
            
            if($stm->execute()){
                 $query = "CALL  relacion_sintoma_enfer(:id, :enfermedades)";
                $stmt = $this->connect->prepare($query);
                $stmt->bindParam(':id', $id, PDO::PARAM_INT);
                $stmt->bindParam(':enfermedades', $enfermedades, PDO::PARAM_STR);

                if($stmt->execute()){
                    return true;
                } else {    
                    return false;
                }

            } else{
                return false;
            }
        }

        public function baja($id){
            $query = "DELETE from sintoma
			    WHERE id_sintoma=$id";

            //Se usa una var. auxiliar para ejecutar el script
            $stm = $this->connect->prepare($query);
            
            if($stm->execute()){
                return true;
            } else{
                return false;
            }
        }

        public function getSintoma($id)
        {
            $query = "SELECT * FROM sintoma WHERE id_sintoma = $id";

            $stm = $this->connect->prepare($query);

            if($stm->execute()){
                $x = $stm->fetch();
                $query = "SELECT id_enfermedad,enfermedad.nombre_comun FROM sintoma,detalle_enfermedad , enfermedad 
                            WHERE id_sintoma = '$id' AND id_sintoma = id_sintoma_fk AND id_enfermedad_fk = id_enfermedad";
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

        public function getSintomas()
        {
            $query = "SELECT * FROM todo_sintoma";

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