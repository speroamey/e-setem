<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

use App\Models\Users;
use App\Models\OutilsInformatiques;

$app->group("/api", function() use ($app){
 
    $app->group("/rh", function() use ($app){

        $app->group("/outils-informatiques", function() use ($app){
            $app->get("/list/{id}", function(Request $request,Response $response,$args){              
                $id= $request->getAttribute('id');
                $OutilsInformatiques = OutilsInformatiques::where('user_id', $id)->get();
                return $response->withStatus(200)
                    ->withJson($OutilsInformatiques);
            });
           
            $app->post("/add", function(Request $request, Response $response,$args){
                $data = $request->getParsedBody();
               
                $OutilsInformatiques = OutilsInformatiques::create([
                    'user_id'=>$data['user_id'],
                    'nom'=>$data['nom'],
                    'type'=>$data['type'],
                    'niveau'=>$data['niveau'],
                ]);
            
                return $response->withStatus(200)
                                ->withJson($OutilsInformatiques);
            });

            $app->put("/update/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $data= $request->getParsedBody();



                $OutilsInformatiques = OutilsInformatiques::where('id', $id)
                    ->update([
                        'user_id'=>$data['user_id'],
                        'nom'=>$data['nom'],
                        'type'=>$data['type'],
                        'niveau'=>$data['niveau'],
                    ]);
                return $response->withStatus(200)
                                ->withJson($OutilsInformatiques );
            });
                
            // $app->delete("/delete/{id}", function(Request $request, Response $response,$args){
            //     $id= $request->getAttribute('id');
            //     $personnels = OutilsInformatiques::where('id', $id)->delete();
            //     return $response->withStatus(200)
            //                     ->withJson($personnels ) ;
            // });
        });

        
    });

});