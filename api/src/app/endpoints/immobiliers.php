<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use App\Models\TypeImmobiliers;
use App\Models\Categories;
use App\Models\Immobiliers;
use App\Models\PositionsImmobiliere;
use App\Models\AssurancesImmobiliere;

$app->group("/api", function() use ($app){
 
    $app->group("/immobiliers", function() use ($app){

        $app->group("/type_immobiliers", function() use ($app){

            $app->get("/list", function(Request $request,Response $response,$args){              
                $TypeImmobiliers = TypeImmobiliers::all();
                return $response->withStatus(200)
                    ->withHeader("Content-Type", "application/json")
                    ->withJson($TypeImmobiliers);
            });
    
            $app->post("/add", function(Request $request, Response $response,$args){
                $data = $request->getParams();
                TypeImmobiliers::create([
                    'libelle'=>$data['libelle'],
                    'expiration_date'=>$data['expiration_date']
                ]);
                return $response->withStatus(200)
                ->withJson($data);
            });

            $app->put("/update/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $data= $request->getParams();
                TypeImmobiliers::where('id', $id)
                    ->update(['libelle' => $data['libelle']]);
                return $response->withStatus(200);
            });
                
            $app->delete("/delete/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                TypeImmobiliers::where('id', $id)->delete();
                return $response->withStatus(200);
            });
        });


        //competences endpoint
        $app->group("/categories", function() use ($app){
            $app->get("/list", function($request,$response,$args){
                $Categories = Categories::all();
                return $response->withStatus(200)
                    ->withHeader("Content-Type", "application/json")
                    ->withJson($Categories);
                
            });
    
            $app->post("/add", function(Request $request, Response $response,$args){
                $data= $request->getParams();
                Categories::create([
                    'code'=>$data['code'],
                    'libelle'=>$data['libelle'],
                ]);
                return $response->withStatus(200)
                ->withJson($data);
            });

            $app->put("/update/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $data= $request->getParams();
                Categories::where('id', $id)
                    ->update(['libelle' => $data['libelle']]);
                return $response->withStatus(200);
            });
                
            $app->delete("/delete/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                Categories::where('id', $id)->delete();
                return $response->withStatus(200);
            });
        });


        //Branche endpoints
        $app->group("/immobiliers", function() use ($app){
            $app->get("/list", function($request,$response,$args){
                $Immobiliers = Immobiliers::all();
                return $response->withStatus(200)
                ->withHeader("Content-Type", "application/json")
                ->withJson($Immobiliers);
            });
    
            $app->post("/add", function(Request $request, Response $response,$args){
                $data= $request->getParams();
                Immobiliers::create([
                    'code'=>$data['code'],
                    'libelle'=>$data['libelle'],
                ]);
                return $response->withStatus(200)
                ->withJson($data);
            });

            $app->put("/update/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $data= $request->getParams();
                Immobiliers::where('id', $id)
                ->update(['libelle' => $data['libelle']]);
                return $response->withStatus(200);
            });
                
            $app->delete("/delete/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                Immobiliers::where('id', $id)->delete();
                return $response->withStatus(200);
            });
        });


        $app->group("/positions_immobiliere", function() use ($app){
            $app->get("/list", function($request,$response,$args){
                $PositionsImmobiliere = PositionsImmobiliere::all();
                return $response->withStatus(200)
                    ->withHeader("Content-Type", "application/json")
                    ->withJson($PositionsImmobiliere);
            });
    
            $app->post("/add", function(Request $request, Response $response,$args){
                $data= $request->getParams();
                PositionsImmobiliere::create([
                    'code'=>$data['code'],
                    'libelle'=>$data['libelle'],
                ]);
                return $response->withStatus(200)
                ->withJson($data);
            });

            $app->put("/update/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $data= $request->getParams();
                PositionsImmobiliere::where('id', $id)
                ->update(['libelle' => $data['libelle']]);
                return $response->withStatus(200);
            });
                
            $app->delete("/delete/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                PositionsImmobiliere::where('id', $id)->delete();
                return $response->withStatus(200);
            });
        });


        $app->group("/assurances_immobiliere", function() use ($app){
            $app->get("/list", function($request,$response,$args){
                $AssurancesImmobiliere = AssurancesImmobiliere::all();
                return $response->withStatus(200)
                    ->withHeader("Content-Type", "application/json")
                    ->withJson($AssurancesImmobiliere);
            });
    
            $app->post("/add", function(Request $request, Response $response,$args){
                $data= $request->getParams();
                AssurancesImmobiliere::create([
                    'code'=>$data['code'],
                    'libelle'=>$data['libelle'],
                    'adress'=> $data['adress']
                ]);
                return $response->withStatus(200)
                ->withJson($data);
            });

            $app->put("/update/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $data= $request->getParams();
                AssurancesImmobiliere::where('id', $id)
                ->update([
                    'libelle' => $data['libelle'],
                    'adress'=> $data['adress']
                ]);
                return $response->withStatus(200);
            });
                
            $app->delete("/delete/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                AntennesSites::where('id', $id)->delete();
                return $response->withStatus(200);
            });
        });


       
    
        
    });

});