<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

use App\Models\Users;
use App\Models\Langues;

$app->group("/api", function() use ($app){
 
    $app->group("/rh", function() use ($app){

        $app->group("/langues", function() use ($app){
            $app->get("/list/{id}", function(Request $request,Response $response,$args){              
                $id= $request->getAttribute('id');
                $formations = Langues::where('user_id', $id)->get();
                return $response->withStatus(200)
                    ->withJson($formations);
            });
           
            $app->post("/add", function(Request $request, Response $response,$args){
                $data = $request->getParsedBody();
                $formations = Langues::create([
                    'user_id'=>$data['user_id'],
                    'langue'=>$data['langue'],
                    'lecture'=>$data['lecture'],
                    'parle'=>$data['parle'],
                    'ecriture'=>$data['ecriture'],
                ]);
            
                return $response->withStatus(200)
                                ->withJson($formations);
            });

            $app->put("/update/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $data= $request->getParsedBody();

                $formations = Langues::where('id', $id)
                    ->update([
                        'user_id'=>$data['user_id'],
                        'langue'=>$data['langue'],
                        'lecture'=>$data['lecture'],
                        'parle'=>$data['parle'],
                        'ecriture'=>$data['ecriture'],
                    ]);
                return $response->withStatus(200)
                                ->withJson($formations );
            });
                
            // $app->delete("/delete/{id}", function(Request $request, Response $response,$args){
            //     $id= $request->getAttribute('id');
            //     $personnels = Langues::where('id', $id)->delete();
            //     return $response->withStatus(200)
            //                     ->withJson($personnels ) ;
            // });
        });

        
    });

});