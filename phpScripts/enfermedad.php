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

        public function alta($nom,$grado_mortalidad,$virus,$causas,$animales){
            $query = 'CALL insertar_enfermedad(:nom, :grado, :virus, :causas, :animales)';
            $stmt = $this->connect->prepare($query);
            $stmt->bindParam(':nom', $nom, PDO::PARAM_STR);
            $stmt->bindParam(':grado', $grado_mortalidad, PDO::PARAM_INT);
            $stmt->bindParam(':virus', $virus, PDO::PARAM_STR);
            $stmt->bindParam(':causas', $causas, PDO::PARAM_STR);
            $stmt->bindParam(':animales', $animales, PDO::PARAM_STR);

            if($stm->execute()){
                return true;
            } else{
                return false;
            }
        }

        
        public function cambio($id,$nom,$grado_mortalidad,$virus,$causas, $animales){
            $query = "UPDATE enfermedad 
                SET `nombre_comun` = '$nom', `grado_mortalidad` = '$grado_mortalidad', `virus_causante` = '$virus', `causas_infeccion` = '$causas' 
                WHERE `id_enfermedad` = $id";

            //Se usa una var. auxiliar para ejecutar el script
            $stmt = $this->connect->prepare($query);
            
            if($stm->execute()){
                $query = "CALL relacion_animal_enfer(:id, :animales)";
                $stmt->bindParam(':id', $id, PDO::PARAM_STR);
                $stmt->bindParam(':animales', $animales, PDO::PARAM_STR);
                
                if($stmt->execute()){
                    return true;
                } else{
                    return false;
                }
                return true;
            } else{
                return false;
            }
        }

        public function baja($id){
            $query = "DELETE from enfermedad
			    WHERE id_enfermedad=$id";

            //Se usa una var. auxiliar para ejecutar el script
            $stmt = $this->connect->prepare($query);
            
            if($stmt->execute()){
                return true;
            } else{
                return false;
            }
        }

        public function getEnfermedad($id)
        {
            $query = "SELECT * FROM enfermedad WHERE id_enfermedad = $id";

            $stmt = $this->connect->prepare($query);

            if($stmt->execute()){
                $x = $stmt->fetch();
                $query = "SELECT id_animal, animal.nombre FROM animal, enfermedad, animal_enfermedad 
                            WHERE id_enfermedad = '$id' AND id_enfermedad = id_enfermedad_fk AND id_animal_fk = id_animal";
                $stmt = $this->connect->prepare($query);
            if($stmt->execute()){
                $x['animales'] = $stmt->fetchAll();
                return $x;
            } else {
                return false;
            }
            }else{
                return false;
            }
        }

        public function getEnfermedades()
        {
            $query = "SELECT * FROM enfermedad";

            $stmt = $this->connect->prepare($query);

            if($stmt->execute())
            {
                return $stmt->fetchAll();
               
            } else{
                return false;
            }   
        }
    }
?>