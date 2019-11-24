<?php
    class Medicamento {

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

		public function alta($nom,$activo,$tipo_medic,$efectos_sec,$laboratorio,$precio,$imagen){
            $query = "INSERT INTO medicamento (`nombre_comun`, `activo`, `tipo_medicamento`, `efectos_secundarios`, `laboratorio`, `precio`, `imagen_muestra`) 
             VALUES (
                        '$nom','$activo','$tipo_medic','$efectos_sec','$laboratorio','$precio','$imagen'
                    )";

            //Se usa una var. auxiliar para ejecutar el script
            $stm = $this->connect->prepare($query);
            
            if($stm->execute()){
                return true;
            } else{
                return false;
            }
        }

        public function cambio($id,$nom,$activo,$tipo_medic,$efectos_sec,$laboratorio,$precio,$imagen){
            $query = "UPDATE medicamento SET `nombre_comun`='$nom', `activo`='$activo', `tipo_medicamento`='$tipo_medic', `efectos_secundarios`='$efectos_sec', `laboratorio`='$laboratorio', `precio`='$precio', `imagen_muestra`='$imagen'
            WHERE id_medicamento = $id";

            //Se usa una var. auxiliar para ejecutar el script
            $stm = $this->connect->prepare($query);
            
            if($stm->execute()){
                return true;
            } else{
                return false;
            }
        }

        public function baja($id){
            $query = "DELETE from medicamento
			    WHERE id_medicamento=$id";

            //Se usa una var. auxiliar para ejecutar el script
            $stm = $this->connect->prepare($query);
            
            if($stm->execute()){
                return true;
            } else{
                return false;
            }
        }

        public function getMedicamento($id)
        {
            $query = "SELECT * FROM medicamento WHERE id_medicamento = $id";

            $stm = $this->connect->prepare($query);

            if($stm->execute()){
                return $stm->fetch();
            }else{
                return false;
            }
        }

        public function getMedicamentos()
        {
            $query = "SELECT * FROM medicamento";

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