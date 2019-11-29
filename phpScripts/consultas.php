<?php
    class Consultas {
        private $connect;

        //Constructor
        function __construct($dbname='', $host='', $username='', $password=''){
            try{
                $dsn = "mysql:host=$host;dbname=$dbname";
                $this->connect = new PDO($dsn, $username, $password);
            }catch(PDOException $e){
                echo $e->getMessage();
            }
        }

        public function alimentosPorAnimal($id){
            $query = "SELECT alimento.id_alimento, alimento.nombre, alimento.presentacion, 
            alimento.indicaciones_uso, alimento.contenido_alimenticio, alimento.imagen_alimento ,alimento.precio
                FROM animal, alimento, animal_alimento 
                WHERE id_animal = '$id'
                    AND id_animal = id_animal_fk 
                    AND id_alimento_fk = id_alimento";
            
            $stmt = $this->connect->prepare($query);

            if($stmt->execute()){
                $var = $stmt->fetchAll();
                return $var;
            }else{
                return false;
            }
        }

        public function sintomasPorEnfermedad($id){
            $query = "SELECT sintoma.id_sintoma, sintoma.descripcion, sintoma.imagen_muestra
            FROM sintoma, enfermedad, detalle_enfermedad 
            WHERE id_enfermedad = '$id'
                AND id_enfermedad_fk = id_enfermedad
                AND id_sintoma = id_sintoma_fk";
            
            $stmt = $this->connect->prepare($query);

            if($stmt->execute()){
                $var = $stmt->fetchAll();
                return $var;
            }else{
                return false;
            }
        }

        public function tratamientosPorEnfermedad($id){
            $query = "SELECT tratamiento.id_tratamiento, tratamiento.indicaciones, tratamiento.tipo_tratamiento
            FROM tratamiento, enfermedad, enfermedad_tratamiento 
            WHERE id_enfermedad = '$id'
                AND id_enfermedad_fk = id_enfermedad
                AND id_tratamiento = id_tratamiento_fk";
            
            $stmt = $this->connect->prepare($query);

            if($stmt->execute()){
                $var = $stmt->fetchAll();
                return $var;
            }else{
                return false;
            }
        }

        public function enfermedadConSintoma($criterio){
            /*$query = "SELECT enfermedad.id_enfermedad, enfermedad.nombre_comun, enfermedad.grado_mortalidad, enfermedad.virus_causante, enfermedad.causas_infeccion
            FROM enfermedad, detalle_enfermedad, sintoma
            WHERE sintoma.descripcion LIKE '%$criterio%'
                AND sintoma.id_sintoma = detalle_enfermedad.id_sintoma_fk 
                AND detalle_enfermedad.id_enfermedad_fk = enfermedad.id_enfermedad";*/
            
           $query ="SELECT enfermedad.nombre_comun
        FROM (enfermedad,sintoma,detalle_enfermedad) INNER JOIN 
            (SELECT enfermedad.id_enfermedad AS enf
            FROM (enfermedad,sintoma,detalle_enfermedad) INNER JOIN
                (SELECT enfermedad.id_enfermedad AS enferme
                FROM enfermedad,sintoma,detalle_enfermedad 
                WHERE id_sintoma=3 AND id_sintoma_fk=id_sintoma AND id_enfermedad_fk=id_enfermedad) AS t_3 ON (enfermedad.id_enfermedad=t_3.enferme)
                    WHERE id_sintoma=2 AND id_sintoma_fk=id_sintoma AND id_enfermedad_fk=enfermedad.id_enfermedad) AS t_2
                ON (enfermedad.id_enfermedad=t_2.enf)
                WHERE id_sintoma=1 AND id_sintoma_fk=id_sintoma AND id_enfermedad_fk=enfermedad.id_enfermedad;";
            $stmt = $this->connect->prepare($query);

            if($stmt->execute()){
                $var = $stmt->fetchAll();
                return $var;
            }else{
                return false;
            }
        }

        public function enfermedadesSegunAnimal($id){
            $query = "SELECT enfermedad.id_enfermedad, enfermedad.nombre_comun, enfermedad.grado_mortalidad, enfermedad.virus_causante, enfermedad.causas_infeccion
            FROM enfermedad, animal_enfermedad, animal
            WHERE animal.id_animal = '$id'
                AND animal.id_animal = animal_enfermedad.id_animal_fk
                AND animal_enfermedad.id_enfermedad_fk = enfermedad.id_enfermedad";
            
            $stmt = $this->connect->prepare($query);

            if($stmt->execute()){
                $var = $stmt->fetchAll();
                return $var;
            }else{
                return false;
            }
        }

        public function medicamentosPorTratamiento($id){
            
            $query = "SELECT medicamento.nombre_comun, medicamento.activo, medicamento.tipo_medicamento, medicamento.efectos_secundarios, medicamento.laboratorio,
            medicamento.precio, medicamento.imagen_muestra
            FROM medicamento, tratamiento, detalle_tratamiento
            WHERE tratamiento.id_tratamiento = '$id'
                AND detalle_tratamiento.id_tratamiento_fk = tratamiento.id_tratamiento
                AND detalle_tratamiento.id_medicamento_fk = medicamento.id_medicamento";
            
            $stmt = $this->connect->prepare($query);

            if($stmt->execute()){
                $var = $stmt->fetchAll();
                return $var;
            }else{
                return false;
            }
        }

        public function enfermedades_peligrosas(){
           /* $query = "SELECT enfermedad.id_enfermedad, enfermedad.nombre_comun, enfermedad.grado_mortalidad, enfermedad.virus_causante, enfermedad.causas_infeccion
            FROM enfermedad
            WHERE enfermedad.grado_mortalidad >= 7";*/

            $query = "SELECT * FROM enfermedades_peligrosas";
            
            $stmt = $this->connect->prepare($query);

            if($stmt->execute()){
                $var = $stmt->fetchAll();
                return $var;
            }else{
                return false;
            }
        }

        public function medicamentosSegunTipo($criterio){
            $query = "SELECT medicamento.nombre_comun, medicamento.activo, medicamento.tipo_medicamento, medicamento.efectos_secundarios, medicamento.laboratorio,
            medicamento.precio, medicamento.imagen_muestra
            FROM medicamento
            WHERE medicamento.tipo_medicamento LIKE '$criterio'";
            
            $stmt = $this->connect->prepare($query);

            if($stmt->execute()){
                $var = $stmt->fetchAll();
                return $var;
            }else{
                return false;
            }
        }
    }
?>