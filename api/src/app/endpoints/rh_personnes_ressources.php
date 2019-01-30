<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

use App\Models\Users;
use App\Models\PersonnesRessources;

$app->group("/api", function() use ($app){
 
    $app->group("/rh", function() use ($app){

        $app->group("/formations", function() use ($app){
            $app->get("/list/{id}", function(Request $request,Response $response,$args){              
                $id= $request->getAttribute('id');
                $formations = Formations::where('user_id', $id)->get();
                return $response->withStatus(200)
                    ->withJson($formations);
            });
           
            $app->post("/add", function(Request $request, Response $response,$args){
                $data = $request->getParsedBody();

                $start_date=strtotime($data['start_date']);
                $start_date = date('Y-m-d H:i:s', $start_date); 

                $end_date=strtotime($data['end_date']) ;
                $end_date = date('Y-m-d H:i:s', $end_date); 
               
                $formations = Formations::create([
                    'user_id'=>$data['user_id'],
                    'ecole'=>$data['ecole'],
                    'diplome'=>$data['diplome'],
                    'domaine'=>$data['domaine'],
                    'description'=>$data['description'],
                    'start_date'=>$start_date,
                    'end_date'=>$end_date,
                ]);
            
                return $response->withStatus(200)
                                ->withJson($formations);
            });

            $app->put("/update/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $data= $request->getParsedBody();

                $start_date=strtotime($data['start_date']);
                $start_date = date('Y-m-d H:i:s', $start_date);

                $end_date=strtotime($data['end_date']) ;
                $end_date = date('Y-m-d H:i:s', $end_date); 


                $formations = Formations::where('id', $id)
                    ->update([
                        'user_id'=>$data['user_id'],
                        'ecole'=>$data['ecole'],
                        'diplome'=>$data['diplome'],
                        'domaine'=>$data['domaine'],
                        'description'=>$data['description'],
                        'start_date'=>$start_date,
                        'end_date'=>$end_date,
                    ]);
                return $response->withStatus(200)
                                ->withJson($formations );
            });
                
            // $app->delete("/delete/{id}", function(Request $request, Response $response,$args){
            //     $id= $request->getAttribute('id');
            //     $personnels = Formations::where('id', $id)->delete();
            //     return $response->withStatus(200)
            //                     ->withJson($personnels ) ;
            // });
        });

        
    });

});