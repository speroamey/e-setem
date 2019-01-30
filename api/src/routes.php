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



$app->get("/secure",  function ($request, $response, $args) {

    $data = ["status" => 1, 'msg' => "This route is secure!"];
    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
});

$app->get('/home', function (Request $request, Response $response, array $args) {
    
    $response->getBody()->write("Hello");

    return $response;
});



$app->post('/register', function(Request $request, Response $response) {

    $data= $request->getParsedBody();

     $user = R::dispense('user');
     $user->username = $data['username'];
     $user->password = $data['password'];

     $isUserExists = R::findOne('user', 'username = ? ', [$user->username] );

    if(empty($isUserExists)){
        $user->password= passwordHash::hash($user->password);
        $user->username= $user->username;
        $id = R::store($user);

        if ($id != NULL) {
            $res=NULL;
            $res->status = "success";
            $res->message = "Félicitation, Votre compte est créé";
            return $response->withJson($res);
        } else {

            $res->status  = "error";
            $res->message  = "Désolé. veuillez réessayer";
            // echo "désolé. veuillez réessayer";
            return $response->withJson($res,201);
        }
    }else{
        $res->status = "error";
        $res->message = "désolé cet utilisateur existe déja";
        return $response->withJson($res);
    }
});