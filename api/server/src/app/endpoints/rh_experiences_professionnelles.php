<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

use App\Models\Users;
use App\Models\ExperiencesProfessionnelles;

$app->group("/api", function() use ($app){
 
    $app->group("/rh", function() use ($app){

        $app->group("/experiences-professionnelles", function() use ($app){
            $app->get("/list/{id}", function(Request $request,Response $response,$args){              
                $id= $request->getAttribute('id');
                $experiences = ExperiencesProfessionnelles::where('user_id', $id)->get();
                return $response->withStatus(200)
                    ->withJson($experiences);
            });
           
            $app->post("/add", function(Request $request, Response $response,$args){
                $data = $request->getParsedBody();

                $start_date=strtotime($data['start_date']);
                $start_date = date('Y-m-d H:i:s', $start_date); 

                $end_date=strtotime($data['end_date']) ;
                $end_date = date('Y-m-d H:i:s', $end_date); 
               
                $experiences = ExperiencesProfessionnelles::create([
                    'user_id'=>$data['user_id'],
                    'nom_employeur'=>$data['nom_employeur'],
                    'fonctions'=>$data['fonctions'],
                    'pays'=>$data['pays'],
                    'resume'=>$data['resume'],
                    'start_date'=>$start_date,
                    'end_date'=>$end_date,
                ]);
            
                return $response->withStatus(200)
                                ->withJson($experiences);
            });

            $app->put("/update/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $data= $request->getParsedBody();

                $start_date=strtotime($data['start_date']);
                $start_date = date('Y-m-d H:i:s', $start_date);

                $end_date=strtotime($data['end_date']) ;
                $end_date = date('Y-m-d H:i:s', $end_date); 


                $experiences = ExperiencesProfessionnelles::where('id', $id)
                    ->update([
                        'user_id'=>$data['user_id'],
                        'nom_employeur'=>$data['nom_employeur'],
                        'fonctions'=>$data['fonctions'],
                        'pays'=>$data['pays'],
                        'resume'=>$data['resume'],
                        'start_date'=>$start_date,
                        'end_date'=>$end_date,
                    ]);
                return $response->withStatus(200)
                                ->withJson($experiences );
            });
                
            $app->delete("/delete/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $personnels = ExperiencesProfessionnelles::where('id', $id)->delete();
                return $response->withStatus(200)
                                ->withJson($personnels ) ;
            });
        });

        
    });

});