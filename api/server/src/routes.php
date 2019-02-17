<?php

use Slim\Http\Request;
use Slim\Http\Response;
use Tuupola\Base62;
use Firebase\JWT\JWT;
use Illuminate\Database\Query\Builder;
use App\Models\Users;
require_once 'passwordHash.php';
// Routes

require __DIR__ . '/app/endpoints/users.php';
require __DIR__ . '/app/endpoints/parametres.php';
require __DIR__ . '/app/endpoints/authentication.php';
require __DIR__ . '/app/endpoints/ressources_humaines.php';
require __DIR__ . '/app/endpoints/rh_formations.php';
require __DIR__ . '/app/endpoints/immobiliers.php';
require __DIR__ . '/app/endpoints/rh_outils_informatiques.php';
require __DIR__ . '/app/endpoints/rh_affiliations.php';
require __DIR__ . '/app/endpoints/rh_experiences_professionnelles.php';
require __DIR__ . '/app/endpoints/rh_personnes_ressources.php';
require __DIR__ . '/app/endpoints/rh_langues.php';
require __DIR__ . '/app/endpoints/rh_aptitudes.php';



$app->get("/secure",  function ($request, $response, $args) {

    $data = ["status" => 1, 'msg' => "This route is secure!"];
    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
});

// $app->get('/', function (Request $request, Response $response, array $args) {
    
//     $response->getBody()->write("Hello");

//     return $response;
// });


$app->get('/', function (Request $request, Response $response) {
    $this->logger->addInfo('Ticket list');
    // $mapper = new TicketMapper($this->db);
    // $tickets = $mapper->getTickets();
    // $response->getBody()->write("Hello");
    $response = $this->renderer->render($response, 'index.html');
    return $response;
});