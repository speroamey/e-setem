<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use App\Models\PersonnesRessources;

$app->group("/api", function() use ($app){
 
    $app->group("/rh", function() use ($app){

        $app->group("/personnes-ressources", function() use ($app){
            $app->get("/list/{id}", function(Request $request,Response $response,$args){              
                $id= $request->getAttribute('id');
                $PersonnesRessources = PersonnesRessources::where('user_id', $id)->get();
                return $response->withStatus(200)
                    ->withJson($PersonnesRessources);
            });
           
            $app->post("/add", function(Request $request, Response $response,$args){
                $data = $request->getParsedBody();
               
                $PersonnesRessources = PersonnesRessources::create([
                    'user_id'=>$data['user_id'],
                    'last_name'=>$data['last_name'],
                    'first_name'=>$data['first_name'],
                    'entreprise'=>$data['entreprise'],
                    'fonctions'=>$data['fonctions'],
                    'contact'=> $data['contact']
                ]);
            
                return $response->withStatus(200)
                                ->withJson($PersonnesRessources);
            });

            $app->put("/update/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $data= $request->getParsedBody();


                $PersonnesRessources = PersonnesRessources::where('id', $id)
                    ->update([
                        'user_id'=>$data['user_id'],
                        'last_name'=>$data['last_name'],
                        'first_name'=>$data['first_name'],
                        'entreprise'=>$data['entreprise'],
                        'fonctions'=>$data['fonctions'],
                        'contact'=> $data['contact']
                    ]);
                return $response->withStatus(200)
                                ->withJson($PersonnesRessources );
            });
                
            $app->delete("/delete/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $personnels = PersonnesRessources::where('id', $id)->delete();
                return $response->withStatus(200)
                                ->withJson($personnels ) ;
            });
        });

        
    });

});