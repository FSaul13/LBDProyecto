<?php
    class Enfermedad{
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

        public function alta($nom,$grado_mortalidad,$virus,$causas){
            $query = "INSERT INTO enfermedad (`nombre_comun`, `grado_mortalidad`, `virus_causante`, `causas_infeccion`) 
             VALUES (
                        '$nom','$grado_mortalidad','$virus','$causas'
                    )";

            //Se usa una var. auxiliar para ejecutar el script
            $stm = $this->connect->prepare($query);
            
            if($stm->execute()){
                return true;
            } else{
                return false;
            }
        }

        
        public function cambio($id,$nom,$grado_mortalidad,$virus,$causas){
            $query = "UPDATE enfermedad 
                SET `nombre_comun` = '$nom', `grado_mortalidad` = '$grado_mortalidad', `virus_causante` = '$virus', `causas_infeccion` = '$causas' 
                WHERE `id_enfermedad` = $id";

            //Se usa una var. auxiliar para ejecutar el script
            $stm = $this->connect->prepare($query);
            
            if($stm->execute()){
                return true;
            } else{
                return false;
            }
        }

        public function baja($id){
            $query = "DELETE from enfermedad
			    WHERE id_enfermedad=$id";

            //Se usa una var. auxiliar para ejecutar el script
            $stm = $this->connect->prepare($query);
            
            if($stm->execute()){
                return true;
            } else{
                return false;
            }
        }

        public function getEnfermedad($id)
        {
            $query = "SELECT * FROM enfermedad WHERE id_enfermedad = $id";

            $stm = $this->connect->prepare($query);

            if($stm->execute()){
                return $stm->fetch();
            }else{
                return false;
            }
        }

        public function getEnfermedades()
        {
            $query = "SELECT * FROM enfermedad";

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