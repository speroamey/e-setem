<?php
// Application middleware
use Tuupola\Middleware\HttpBasicAuthentication;
// e.g: $app->add(new \Slim\Csrf\Guard);

$container = $app->getContainer();

$container["jwt"] = function ($container) {
    return new StdClass;
};


$app->add(new Tuupola\Middleware\JwtAuthentication([
    "path" => "/",
    "logger" => $container['logger'],
    "attribute" => "jwt",
    "secret" => "123456789helo_secret",
    "ignore" => ["/api/token", "/api/users/signin","/api/users/registrer","/secure","/api/parametres/pieces_administratives/list"],
    "before" => function ($request, $arguments) use ($container) {
        $container["jwt"] = $arguments["decoded"];
    },
    "error" => function ( $response, $arguments) {
        $data["status"] = "error";
        $data["message"] = $arguments["message"];
       
        return $response
            ->withHeader("Content-Type", "application/json")
            ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }
]));
 
// $app->add(new Tuupola\Middleware\HttpBasicAuthentication([
//     "path" => ["/api/token"],
//     "users" => [
//         "root" => "spero",
//         "somebody" => "password"
//     ],
//     "before" => function ($request, $arguments) {
//         return $request->withAttribute("user", $arguments["user"]);
//     },
//     "error" => function ($response, $arguments) {
//         $data = [];
//         print_r("something2");
//         $data["status"] = "error";
//         $data["message"] = $arguments["message"];
//         return $response->write(json_encode($data, JSON_UNESCAPED_SLASHES));
//     }
// ]));
 
 

    // $app->options('/{routes:.+}', function ($request, $response, $args) {
    //     return $response;
    // });
    // $app->add(function ($req, $res, $next) {
    // $response = $next($req, $res);
    //     return $response->withHeader('Access-Control-Allow-Origin','http://127.0.0.1:8080')
    //         ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
    //         ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // });



    
// $app->add(new Tuupola\Middleware\CorsMiddleware([
//     "logger" => $container["logger"],
//     "origin" => [],
//     "methods" => ["GET", "POST", "PUT", "PATCH", "OPTIONS","DELETE"],
//     "headers.allow" => ["Authorization", "If-Match", "If-Unmodified-Since"],
//     "headers.expose" => ["Authorization", "Etag"],
//     "credentials" => true,
//     "cache" => 60,
//     "error" => function ($request, $response, $arguments) {
//         return new UnauthorizedResponse($arguments["message"], 401);
//     }
// ]));