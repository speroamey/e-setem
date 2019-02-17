<?php

use Tuupola\Base62;
use Firebase\JWT\JWT;
use Illuminate\Database\Query\Builder;
use App\Models\Users;


$app->post("/api/token",  function ($request, $response, $args) use ($container){
    /* Here generate and return JWT to the client. */
    //$valid_scopes = ["read", "write", "delete"]
  	$requested_scopes = $request->getParsedBody() ?: [];
    $now = new DateTime();
    $future = new DateTime("+160 minutes");
    $server = $request->getServerParams();
    $jti = (new Base62)->encode(random_bytes(16));
    $payload = [
        "iat" => $now->getTimeStamp(),
        "exp" => $future->getTimeStamp(),
        "jti" => $jti,
        "sub" => $server["PHP_AUTH_USER"]
    ];
    $secret = "123456789helo_secret";
    $token = JWT::encode($payload, $secret, "HS256");
    $data["token"] = $token;
    $data["expires"] = $future->getTimeStamp();
    $users = Users::all()->toJson();
    // $this->db->table(users)->find(1);

    // var_dump($users);
    // die();

    return $response->withStatus(201)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
});