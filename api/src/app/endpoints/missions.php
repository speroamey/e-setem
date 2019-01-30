<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use App\Models\Missions;
use App\Models\RessourcesMissions;
use App\Models\OrdreMissions;

$app->group("/api", function() use ($app){
 
    $app->group("/missions", function() use ($app){

        $app->group("/missions", function() use ($app){
            $app->get("/list", function(Request $request,Response $response,$args){              
                $Missions = Missions::all();
                return $response->withStatus(200)
                    ->withHeader("Content-Type", "application/json")
                    ->withJson($Missions);
            });
    
            $app->post("/add", function(Request $request, Response $response,$args){
                $data = $request->getParams();
                Missions::create([
                    'numero_mission'=>$data['numero_mission'],
                    'cadre'=>$data['cadre'],
                    'objet'=>$data['objet'],
                    'id_chef_mission'=>$data['id_chef_mission'],
                    'date_depart'=>$data['date_depart'],
                    'date_arrive_prevu'=>$data['date_arrive_prevu'],

                ]);
                return $response->withStatus(200)
                ->withJson($data);
            });

            $app->put("/update/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $data= $request->getParams();
                Missions::where('id', $id)
                    ->update([
                        'numero_mission'=>$data['numero_mission'],
                        'cadre'=>$data['cadre'],
                        'objet'=>$data['objet'],
                        'id_chef_mission'=>$data['id_chef_mission'],
                        'date_depart'=>$data['date_depart'],
                        'date_arrive_prevu'=>$data['date_arrive_prevu'],
                    ]);
                return $response->withStatus(200);
            });
                
            $app->delete("/delete/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                Missions::where('id', $id)->delete();
                return $response->withStatus(200);
            });
        });



        $app->group("/ressources_missions", function() use ($app){
            $app->get("/list", function(Request $request,Response $response,$args){              
                $RessourcesMissions = RessourcesMissions::all();
                return $response->withStatus(200)
                    ->withHeader("Content-Type", "application/json")
                    ->withJson($RessourcesMissions);
            });
    
            $app->post("/add", function(Request $request, Response $response,$args){
                $data = $request->getParams();
                RessourcesMissions::create([
                    'id_personnels'=>$data['id_personnels'],
                    'id_missions'=>$data['id_missions'],
                    'id_immobiliers'=>$data['id_immobiliers']
                ]);
                return $response->withStatus(200)
                ->withJson($data);
            });

            $app->put("/update/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $data= $request->getParams();
                RessourcesMissions::where('id', $id)
                    ->update([
                        'id_personnels'=>$data['id_personnels'],
                        'id_missions'=>$data['id_missions'],
                        'id_immobiliers'=>$data['id_immobiliers']
                    ]);
                return $response->withStatus(200);
            });
                
            $app->delete("/delete/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                RessourcesMissions::where('id', $id)->delete();
                return $response->withStatus(200);
            });
        });



        $app->group("/ordre_missions", function() use ($app){
            $app->get("/list", function(Request $request,Response $response,$args){              
                $OrdreMissions = OrdreMissions::all();
                return $response->withStatus(200)
                    ->withHeader("Content-Type", "application/json")
                    ->withJson($OrdreMissions);
            });
    
            $app->post("/add", function(Request $request, Response $response,$args){
                $data = $request->getParams();
                OrdreMissions::create([
                    'libelle'=>$data['libelle'],
                    'expiration_date'=>$data['expiration_date']
                ]);
                return $response->withStatus(200)
                ->withJson($data);
            });

            $app->put("/update/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $data= $request->getParams();
                OrdreMissions::where('id', $id)
                    ->update(['libelle' => $data['libelle']]);
                return $response->withStatus(200);
            });
                
            $app->delete("/delete/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                OrdreMissions::where('id', $id)->delete();
                return $response->withStatus(200);
            });
        });

        
    });

});