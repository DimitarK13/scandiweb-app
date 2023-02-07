<?php
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: *");
  header("Access-Control-Allow-Methods: *");

  class Database {
    private $host = "localhost";
    private $user = "root";
    private $password = "";
    private $dbname = "scandiweb_app";
    private $dsn;
    private $pdo;

    public function __construct() {
      $this->dsn = "mysql:host=" . $this->host . ";dbname=" . $this->dbname;

      $this->pdo = new PDO($this->dsn, $this->user, $this->password);

      $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function getData(){
      $sql = "SELECT * FROM products";

      $stmt = $this->pdo->prepare($sql);
      $stmt->execute();
      $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

      return $data;
    }
  }

  if(($_SERVER['REQUEST_METHOD'] == 'DELETE')&& (isset($_DELETE[$parameter]))){
    $value = $_DELETE[$parameter];
    echo $value;
}
  $database = new Database();
  $data = $database->getData();

  $json_data = json_encode($data);

  header('Content-Type: application/json');
  echo $json_data;
?>