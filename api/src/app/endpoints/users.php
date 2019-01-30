<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Tuupola\Base62;
use Firebase\JWT\JWT;
use App\Models\Users;


$app->group("/api", function() use ($app){
 
    $app->group("/users", function() use ($app){
        $app->get("/list", function(Request $request,Response $response,$args){              
            $Users = Users::all();
            return $response->withStatus(200)
                ->withHeader("Content-Type", "application/json")
                ->withJson($Users);
        });

        $app->post("/register", function(Request $request,Response $response,$args) use ($app){
            $data = $request->getParams();
            $username = $data['username'];
            $password = $data['password'];
            $isUserExists = Users::where('username', $username)->first();
           
            $hashpassword= passwordHash::hash($password);

            if(empty($isUserExists)){
                $us=Users::create([
                    'username'=>$data['username'],
                    'password'=>$hashpassword,
                    'email' => $data['email'],
                    'roles' => $data['roles'],
                    'address'=>$data['address']
                ]);
                
                if ($us->id != NULL) {
                    $res->status = "success";
                    $res->message = "Félicitation, Votre compte est créé";
                    $user='fairfoncier';
                    $pass='Eternel1994';
                    $api='6932';

                    $url = 'http://api.flickr.com/services/xmlrpc/';

                    // $app->post('http://oceanicsms.com/api/http/sendmsg.php?user=$user&password=$user&from=7080&to=22961725134&text=sms&api=$api');
                    return $response->withJson($us);
                } else {
                    $res->status  = "error";
                    $res->message  = "Désolé. veuillez réessayer";
                    return $response->withJson($res,401);
                }
            }else{
                $res->status = "error";
                $res->message = "désolé cet utilisateur existe déja";
                return $response->withJson($res);
            }


        });

        $app->post("/signin", function(Request $request,Response $response,$args){
            $data = $request->getParams();
            $username = $data['username'];
            $password = $data['password'];
            $isUserExiste = Users::where('username', $username)->first();;
            
            if (!empty($isUserExiste)) {
                if(passwordHash::check_password($isUserExiste->password,$password)){
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
                    $data["roles"]=$isUserExiste->roles;
                    $data["id"]=$isUserExiste->id;
                    return $response->withJson($data,200);
                } else {
                       
                        $message='Login failed. Incorrect credentials';
                        return $response->withStatus(401)
                        ->withJson($message);
                     }
                }else {
                    $message='Utilisateur non identifié';
                    return $response->withJson($message,401);
            }


        });

        $app->post("/add", function(Request $request, Response $response,$args){
            $data = $request->getParams();
            Users::create([
                'username'=>$data['username'],
                'password'=>$data['password'],
                'email' => $data['email'],
                'roles' => $data['roles'],
                'address'=>$data['address']
            ]);
            return $response->withStatus(200)
            ->withJson($data);
        });

        $app->put("/update/{id}", function(Request $request, Response $response,$args){
            $id= $request->getAttribute('id');
            $data= $request->getParams();
            $Users=Users::where('id', $id)
                ->update([
                    'username'=>$data['username'],
                    // 'password'=>$data['password'],
                    'email' => $data['email'],
                    'roles' => $data['roles'],
                    'address'=>$data['address']
            ]);
            return $response->withStatus(200)
            ->withJson($Users);
        });


        $app->put("/password/{id}", function(Request $request, Response $response,$args){
            $id= $request->getAttribute('id');
            $data= $request->getParsedBody();
            $password = $data['password'];
            $hashpassword= passwordHash::hash($password);

            $Users=Users::where('id', $id)
                ->update([
                    'username'=>$data['username'],
                    'password'=>$hashpassword,
                    'email' => $data['email'],
                    'roles' => $data['roles'],
                    'address'=>$data['address']
            ]);
            return $response->withStatus(200)
            ->withJson($Users);
        });



        $app->get("/find/{id}", function(Request $request, Response $response,$args){
            $id= $request->getAttribute('id');
            
            $Users=Users::find($id);
            return $response->withStatus(200)
            ->withJson($Users);
        });
            
        $app->delete("/delete/{id}", function(Request $request, Response $response,$args){
            $id= $request->getAttribute('id');
            $Users=Users::where('id', $id)->delete();
            return $response->withStatus(200)
            ->withJson($Users);
        });
    });
    

});