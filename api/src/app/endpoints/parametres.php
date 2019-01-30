<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use App\Models\PiecesAdministratives;
use App\Models\Competences;
use App\Models\Branches;
use App\Models\DepartementsServices;
use App\Models\AntennesSites;
use App\Models\Systemes;
use App\Models\Fonctions;


$app->group("/api", function() use ($app){
 
    $app->group("/parametres", function() use ($app){

        $app->group("/pieces_administratives", function() use ($app){

            $app->get("/list", function(Request $request,Response $response,$args){              
                $pieces_administratives = PiecesAdministratives::all();
                return $response->withStatus(200)
                    ->withHeader("Content-Type", "application/json")
                    ->withJson($pieces_administratives);
            });
    
            $app->post("/add", function(Request $request, Response $response,$args){
                $data = $request->getParsedBody();
                $my_date=strtotime($data['expiration_date']) ;
                $new_date = date('Y-m-d H:i:s', $my_date);   
                $pieces=PiecesAdministratives::create([
                    'libelle'=>$data['libelle'],
                    'expiration_date'=>$new_date
                ]);

                return $response->withStatus(200)
                ->withJson($pieces);
            });

            $app->put("/update/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $data= $request->getParsedBody();
                $my_date=strtotime($data['expiration_date']) ;
                $new_date = date('Y-m-d H:i:s', $my_date);  
                $pieces=PiecesAdministratives::where('id', $id)
                    ->update([
                        'libelle' => $data['libelle'],
                        'expiration_date'=>$new_date
                    ]);
                return $response->withStatus(200)
                                ->withJson($pieces);
            });
                
            $app->delete("/delete/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $pieces=PiecesAdministratives::where('id', $id)->delete();
                return $response->withStatus(200)
                                ->withJson($pieces);
            });
        });


        //competences endpoint
        $app->group("/competences", function() use ($app){
            $app->get("/list", function($request,$response,$args){
                $competences = Competences::all();
                return $response->withStatus(200)
                    ->withHeader("Content-Type", "application/json")
                    ->withJson($competences);
                
            });
    
            $app->post("/add", function(Request $request, Response $response,$args){
                $data= $request->getParams();
                $competences=Competences::create([
                    'code'=>$data['code'],
                    'libelle'=>$data['libelle'],
                ]);
                return $response->withStatus(200)
                ->withJson($competences);
            });

            $app->put("/update/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $data= $request->getParams();
                $competences=Competences::where('id', $id)
                    ->update([
                        'code'=>$data['code'],
                        'libelle' => $data['libelle'
                    ]]);
                return $response->withStatus(200)
                                 ->withJson($competences);
            });
                
            $app->delete("/delete/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $competences=Competences::where('id', $id)->delete();
                return $response->withStatus(200)
                                ->withJson($competences);
            });
        });


        //Branche endpoints
        $app->group("/branches", function() use ($app){
            $app->get("/list", function($request,$response,$args){
                $branches = Branches::all();
                return $response->withStatus(200)
                ->withHeader("Content-Type", "application/json")
                ->withJson($branches);
            });
    
            $app->post("/add", function(Request $request, Response $response,$args){
                $data= $request->getParsedBody();
                $branches = Branches::create([
                    'code'=>$data['code'],
                    'libelle'=>$data['libelle'],
                ]);
                return $response->withStatus(200)
                ->withJson($branches);
            });

            $app->put("/update/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $data= $request->getParsedBody();
                $branches=Branches::where('id', $id)
                ->update([
                    'code'=>$data['code'],
                    'libelle' => $data['libelle'
                    ]]);
                return $response->withStatus(200)
                                ->withJson($branches);;
            });
                
            $app->delete("/delete/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $branches=Branches::where('id', $id)->delete();
                return $response->withStatus(200)
                                ->withJson($branches);;
            });
        });


        $app->group("/departements_services", function() use ($app){
            $app->get("/list", function($request,$response,$args){
                $DepartementsServices = DepartementsServices::all();
                return $response->withStatus(200)
                    ->withHeader("Content-Type", "application/json")
                    ->withJson($DepartementsServices);
            });
    
            $app->post("/add", function(Request $request, Response $response,$args){
                $data= $request->getParams();
                $departements=DepartementsServices::create([
                    'code'=>$data['code'],
                    'libelle'=>$data['libelle'],
                ]);
                return $response->withStatus(200)
                ->withJson($departements);
            });

            $app->put("/update/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $data= $request->getParams();
                $departements=DepartementsServices::where('id', $id)
                ->update([
                    'code'=>$data['code'],
                    'libelle' => $data['libelle'
                ]]);
                return $response->withStatus(200)
                ->withJson($departements);
            });
                
            $app->delete("/delete/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $departements=DepartementsServices::where('id', $id)->delete();
                return $response->withStatus(200)
                        ->withJson($departements);
            });
        });


        $app->group("/antennes_sites", function() use ($app){
            $app->get("/list", function($request,$response,$args){
                $AntennesSites = AntennesSites::all();
                return $response->withStatus(200)
                    ->withHeader("Content-Type", "application/json")
                    ->withJson($AntennesSites);
            });
    
            $app->post("/add", function(Request $request, Response $response,$args){
                $data= $request->getParams();
                $antennes=AntennesSites::create([
                    'code'=>$data['code'],
                    'libelle'=>$data['libelle'],
                    'adress'=> $data['adress']
                ]);
                return $response->withStatus(200)
                ->withJson($antennes);
            });

            $app->put("/update/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $data= $request->getParams();
                $antennes=AntennesSites::where('id', $id)
                ->update([
                    'libelle' => $data['libelle'],
                    'adress'=> $data['adress']
                ]);
                return $response->withStatus(200)
                ->withJson($antennes);
            });
                
            $app->delete("/delete/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $antennes=AntennesSites::where('id', $id)->delete();
                return $response->withStatus(200)
                ->withJson($antennes);
            });
        });


        $app->group("/models_cv", function() use ($app){
            $app->get("/list", function($request,$response,$args){
     
                $response->withStatus(200)
                ->withHeader("Content-Type", "application/json")
                ->write(json_encode("information sur les parametrer", JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    
            });
    
            $app->post("/add", function(){
                return $response->withStatus(200);
            });
            $app->put("/update/{id}", function(){
                $id= $request->getAttribute('id');
                $data= $request->getParsedBody();
                return $response->withStatus(200);
            });
                
            $app->delete("/delete", function(){
                $id= $request->getAttribute('id');
                return $response->withStatus(200);
            });
        });


        $app->group("/systems", function() use ($app){
            $app->get("/list", function($request,$response,$args){
                $Systemes = Systemes::all();
                return $response->withStatus(200)
                    ->withHeader("Content-Type", "application/json")
                    ->withJson($Systemes);
            });
    
            $app->post("/add", function(Request $request, Response $response,$args){
                $data= $request->getParsedBody();
                $systemes = Systemes::create([
                    'expiration_cin'=>$data['expiration_cin'],
                    'expiration_passport'=>$data['expiration_passport'],
                    'expiration_pieces_administratives'=> $data['expiration_pieces_administratives'],
                    'prise_immobilisation'=>$data['prise_immobilisation'],
                    'expiration_assurances'=> $data['expiration_assurances'],
                    'expiration_visite_technique'=>$data['expiration_visite_technique'],
                    'offre_manifestation_d_interet'=> $data['offre_manifestation_d_interet'],
                    'rapports'=>$data['rapports'],
                    'echeance_paiements'=> $data['echeance_paiements']
                ]);
                return $response->withStatus(200)
                            ->withJson($systemes);
            });

            $app->put("/update/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $data= $request->getParams();
                $systemes=Systemes::where('id', $id)
                ->update([
                    'expiration_cin'=>$data['expiration_cin'],
                    'expiration_passport'=>$data['expiration_passport'],
                    'expiration_pieces_administratives'=> $data['expiration_pieces_administratives'],
                    'prise_immobilisation'=>$data['prise_immobilisation'],
                    'expiration_assurances'=> $data['expiration_assurances'],
                    'expiration_visite_technique'=>$data['expiration_visite_technique'],
                    'offre_manifestation_d_interet'=> $data['offre_manifestation_d_interet'],
                    'rapports'=>$data['rapports'],
                    'echeance_paiements'=> $data['echeance_paiements']
                ]);
                return $response->withStatus(200)
                                ->withJson($systemes) ;
            });
                
            $app->delete("/delete/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $systemes = Systemes::where('id', $id)->delete();
                return $response->withStatus(200)
                                ->withJson( $systemes );
            });
        });

        $app->group("/fonctions", function() use ($app){
            $app->get("/list", function($request,$response,$args){
                $Fonctions = Fonctions::all();
                return $response->withStatus(200)
                    ->withHeader("Content-Type", "application/json")
                    ->withJson($Fonctions);
            });
    
            $app->post("/add", function(Request $request, Response $response,$args){
                $data= $request->getParams();
                $fonctions=Fonctions::create([
                    'code'=>$data['code'],
                    'libelle'=>$data['libelle'],
                ]);
                return $response->withStatus(200)
                ->withJson($fonctions);
            });

             $app->put("/update/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $data= $request->getParams();
                $fonctions=Fonctions::where('id', $id)
                ->update([
                    'code'=>$data['code'],
                    'libelle' => $data['libelle'],
                ]);
                return $response->withStatus(200)
                ->withJson($fonctions);
            });
                
            $app->delete("/delete/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $fonctions=Fonctions::where('id', $id)->delete();
                return $response->withStatus(200)
                ->withJson($fonctions);;
            });
        });
    
        
    });

});