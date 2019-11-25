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

        public function alta($nom,$presentacion,$indicaciones,$contenido,$imagen, $precio, $animales){
            $sql = 'CALL insertar_alimento(:nom, :presenta, :indica, :contenido, :imagen, :precio, :animales)';
            $stmt = $this->connect->prepare($sql);
            $stmt->bindParam(':nom', $nom, PDO::PARAM_STR);
            $stmt->bindParam(':presenta', $presentacion, PDO::PARAM_STR);
            $stmt->bindParam(':indica', $indicaciones, PDO::PARAM_STR);
            $stmt->bindParam(':contenido', $contenido, PDO::PARAM_STR);
            $stmt->bindParam(':imagen', $imagen, PDO::PARAM_STR);
            $stmt->bindParam(':precio', $precio, PDO::PARAM_INT);
            $stmt->bindParam(':animales', $animales, PDO::PARAM_STR);

            if($stmt->execute()){
                return true;
            } else {
                return false;
            }

        }

        public function cambio($id, $nom,$presentacion,$indicaciones,$contenido,$imagen, $precio, $animales){
            $query = "UPDATE alimento SET nombre = '$nom', presentacion = '$presentacion', indicaciones_uso = '$indicaciones', contenido_alimenticio = '$contenido', imagen_alimento = '$imagen', precio = '$precio' 
            WHERE id_alimento = '$id'";

            //Se usa una var. auxiliar para ejecutar el script
            $stmt = $this->connect->prepare($query);
            
            if($stmt->execute())
            {
                $query = "CALL relaciones_alimentos(:id, :animales)";
                $stmt = $this->connect->prepare($query);
                $stmt->bindParam('id', $id, PDO::PARAM_INT);
                $stmt->bindParam('animales', $animales, PDO::PARAM_STR);

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
