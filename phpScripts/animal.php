<?php
    class Animal {

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
/*
		public function alta($nom,$carac,$tipo_alimen,$tipo_animal,$imagen){
            $query = "INSERT INTO animal(nombre, caracteristicas,tipo_alimentacion,tipo_animal,imagen_muestra) VALUES (
                        '$nom','$carac','$tipo_alimen','$tipo_animal','$imagen'
                    )";

            //Se usa una var. auxiliar para ejecutar el script
            $stm = $this->connect->prepare($query);
            
            if($stm->execute()){
                return true;
            } else{
                return false;
            }
        }
*/

        public function alta($nom,$carac,$tipo_alimen,$tipo_animal,$imagen){
            $sql = 'CALL insertar_animal(:nom, :carac, :tipo_ali, :tipo_ani, :imag)';
            $stmt = $this->connect->prepare($sql);
            $stmt->bindParam(':nom', $nom, PDO::PARAM_STR);
            $stmt->bindParam(':carac', $carac, PDO::PARAM_STR);
            $stmt->bindParam(':tipo_ali', $tipo_alimen, PDO::PARAM_STR);
            $stmt->bindParam(':tipo_ani', $tipo_animal, PDO::PARAM_STR);
            $stmt->bindParam(':imag', $imagen, PDO::PARAM_STR);

            if($stmt->execute()){
                return true;
            } else{
                return false;
            }
        }
        
        public function cambio($id, $nom,$carac,$tipo_alimen,$tipo_animal,$imagen){
            $query = "UPDATE animal SET nombre='$nom',caracteristicas='$carac',tipo_alimentacion='$tipo_alimen',tipo_animal='$tipo_animal',imagen_muestra='$imagen'
			        WHERE id_animal=$id";

            //Se usa una var. auxiliar para ejecutar el script
            $stm = $this->connect->prepare($query);
            
            if($stm->execute()){
                return true;
            } else{
                return false;
            }
        }

        public function baja($id){
            $query = "DELETE from animal
			    WHERE id_animal=$id";

            //Se usa una var. auxiliar para ejecutar el script
            $stm = $this->connect->prepare($query);
            
            if($stm->execute()){
                return true;
            } else{
                return false;
            }
        }

        public function getAnimal($id)
        {
            $query = "SELECT * FROM animal WHERE id_animal = $id";

            $stm = $this->connect->prepare($query);

            if($stm->execute()){
                return $stm->fetch();
            }else{
                return false;
            }
        }

        public function getAnimales()
        {
            $query = "SELECT * FROM animal";

            $stm = $this->connect->prepare($query);

            if($stm->execute())
            {
                return $stm->fetchAll();
               
            } else{
                return false;
            }
        }

    }
