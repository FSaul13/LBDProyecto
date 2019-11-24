<?php
    class Alimento {

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
       
		public function alta($nom,$presentacion,$indicaciones,$contenido,$imagen, $precio){
            $query = "INSERT INTO alimento (`nombre`, `presentacion`, `indicaciones_uso`, `contenido_alimenticio`, `imagen_alimento`, `precio`)
                VALUES ('$nom', '$presentacion', '$indicaciones', '$contenido', '$imagen', '$precio'
                    )";

            //Se usa una var. auxiliar para ejecutar el script
            $stm = $this->connect->prepare($query);
            
            if($stm->execute()){
                return true;
            } else{
                return false;
            }
        }

        public function cambio($id, $nom,$presentacion,$indicaciones,$contenido,$imagen, $precio){
            $query = "UPDATE alimento SET nombre = '$nom', presentacion = '$presentacion', indicaciones_uso = '$indicaciones', contenido_alimenticio = '$contenido', imagen_alimento = '$imagen', precio = '$precio' 
            WHERE id_alimento = '$id'";

            //Se usa una var. auxiliar para ejecutar el script
            $stm = $this->connect->prepare($query);
            
            if($stm->execute()){
                return true;
            } else{
                return false;
            }
        }

        public function baja($id){
            $query = "DELETE from alimento
			    WHERE id_alimento=$id";

            //Se usa una var. auxiliar para ejecutar el script
            $stm = $this->connect->prepare($query);
            
            if($stm->execute()){
                return true;
            } else{
                return false;
            }
        }

        public function getAlimento($id)
        {
            $query = "SELECT * FROM alimento WHERE id_alimento = $id";

            $stm = $this->connect->prepare($query);

            if($stm->execute()){
                return $stm->fetch();
            }else{
                return false;
            }
        }

        public function getAlimentos()
        {
            $query = "SELECT * FROM alimento";

            $stm = $this->connect->prepare($query);

            if($stm->execute())
            {
                return $stm->fetchAll();
            } else{
                return false;
            }
        }
    }
